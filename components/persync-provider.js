"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  createConversation,
  deleteConversation,
  fetchConversation,
  fetchHistory,
  fetchQuota,
} from "../lib/persync-client";

const PersyncContext = createContext(null);
const PENDING_DELETE_MS = 3000;
const sortSessions = (items) =>
  [...items].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

export function PersyncProvider({ children }) {
  const pendingDeletesRef = useRef(new Map());
  const [history, setHistory] = useState([]);
  const [quota, setQuota] = useState({ used: 0, remaining: 3, limit: 3, canGenerate: true });
  const [isBooting, setIsBooting] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteToast, setDeleteToast] = useState(null);

  const refreshQuota = useCallback(async () => {
    const quotaData = await fetchQuota();
    setQuota(quotaData);
    return quotaData;
  }, []);

  const refreshHistory = useCallback(async () => {
    const response = await fetchHistory();
    const items = response?.data || [];
    setHistory(sortSessions(items));
    return items;
  }, []);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        const [quotaData, historyResponse] = await Promise.allSettled([
          fetchQuota(),
          fetchHistory(),
        ]);

        if (!active) {
          return;
        }

        if (quotaData.status === "fulfilled") {
          setQuota(quotaData.value);
        }

        if (historyResponse.status === "fulfilled") {
          setHistory(sortSessions(historyResponse.value?.data || []));
        }
      } finally {
        if (active) {
          setIsBooting(false);
        }
      }
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  useEffect(
    () => () => {
      pendingDeletesRef.current.forEach(({ timeoutId }) => window.clearTimeout(timeoutId));
      pendingDeletesRef.current.clear();
    },
    [],
  );

  const createSession = useCallback(
    async (input) => {
      const response = await createConversation(input);
      if (response?.session) {
        setHistory((current) => sortSessions([response.session, ...current.filter((item) => item.id !== response.session.id)]));
      }
      if (response?.quota) {
        setQuota(response.quota);
      }
      return response;
    },
    [],
  );

  const getSession = useCallback(
    async (id) => {
      const cachedSession = history.find((item) => item.id === id);
      if (cachedSession) {
        return cachedSession;
      }

      const response = await fetchConversation(id);
      return response?.data || null;
    },
    [history],
  );

  const closeDeleteToast = useCallback(() => {
    setDeleteToast(null);
  }, []);

  const undoDeleteSession = useCallback((sessionId) => {
    const pending = pendingDeletesRef.current.get(sessionId);
    if (!pending) {
      setDeleteToast(null);
      return;
    }

    window.clearTimeout(pending.timeoutId);
    pendingDeletesRef.current.delete(sessionId);
    setHistory((current) => sortSessions([...current, pending.session]));
    setDeleteToast(null);
  }, []);

  const finalizeDeleteSession = useCallback(async (sessionId) => {
    const pending = pendingDeletesRef.current.get(sessionId);
    if (!pending) {
      return;
    }

    pendingDeletesRef.current.delete(sessionId);

    try {
      await deleteConversation(sessionId);
      setDeleteToast((current) =>
        current?.sessionId === sessionId ? null : current,
      );
    } catch (error) {
      setHistory((current) => sortSessions([...current, pending.session]));
      setDeleteToast({
        id: `delete-error-${Date.now()}`,
        sessionId,
        message: "Gagal menghapus session",
        supportingText: error.message,
        canUndo: false,
      });

      window.setTimeout(() => {
        setDeleteToast((current) =>
          current?.id?.startsWith("delete-error-") ? null : current,
        );
      }, PENDING_DELETE_MS);
    }
  }, []);

  const deleteSession = useCallback(
    async (sessionId) => {
      const session = history.find((item) => item.id === sessionId);
      if (!session || pendingDeletesRef.current.has(sessionId)) {
        return;
      }

      setHistory((current) => current.filter((item) => item.id !== sessionId));
      setDeleteToast({
        id: `delete-${sessionId}-${Date.now()}`,
        sessionId,
        message: "Session dihapus",
        supportingText: "Undo tersedia beberapa detik.",
        canUndo: true,
      });

      const timeoutId = window.setTimeout(() => {
        finalizeDeleteSession(sessionId);
      }, PENDING_DELETE_MS);

      pendingDeletesRef.current.set(sessionId, {
        session,
        timeoutId,
      });
    },
    [finalizeDeleteSession, history],
  );

  const value = useMemo(
    () => ({
      quota,
      history,
      isBooting,
      isSidebarOpen,
      deleteToast,
      setIsSidebarOpen,
      refreshQuota,
      refreshHistory,
      createSession,
      getSession,
      deleteSession,
      undoDeleteSession,
      closeDeleteToast,
    }),
    [
      quota,
      history,
      isBooting,
      isSidebarOpen,
      deleteToast,
      refreshQuota,
      refreshHistory,
      createSession,
      getSession,
      deleteSession,
      undoDeleteSession,
      closeDeleteToast,
    ],
  );

  return <PersyncContext.Provider value={value}>{children}</PersyncContext.Provider>;
}

export const usePersync = () => {
  const context = useContext(PersyncContext);
  if (!context) {
    throw new Error("usePersync must be used within PersyncProvider");
  }
  return context;
};
