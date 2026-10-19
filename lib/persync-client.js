"use client";

import {
  getStoredSessionById,
  getStoredSessions,
  removeStoredSessionById,
  saveStoredSession,
} from "./storage";

const safeJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const parseError = async (response) => {
  const payload = await safeJson(response);
  const message =
    payload?.details?.supportingText ||
    payload?.details?.headline ||
    payload?.message ||
    "Terjadi kendala saat memproses permintaan.";

  const error = new Error(message);
  error.status = response.status;
  error.payload = payload;
  return error;
};

export const fetchQuota = async () => {
  try {
    const response = await fetch("/api/generate", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return { used: 0, limit: 3, remaining: 3, canGenerate: true };
    }

    const data = await safeJson(response);
    return data?.quota || { used: 0, limit: 3, remaining: 3, canGenerate: true };
  } catch {
    return { used: 0, limit: 3, remaining: 3, canGenerate: true };
  }
};

export const fetchHistory = async () => {
  const sessions = getStoredSessions();
  return {
    success: true,
    data: sessions,
  };
};

export const fetchConversation = async (id) => {
  const session = getStoredSessionById(id);
  if (!session) {
    const error = new Error("Sesi analisis tidak ditemukan.");
    error.status = 404;
    throw error;
  }

  return {
    success: true,
    data: session,
  };
};

export const deleteConversation = async (id) => {
  removeStoredSessionById(id);
  return {
    success: true,
    data: { id },
  };
};

export const createConversation = async (input) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const data = await safeJson(response);
  if (data?.session) {
    saveStoredSession(data.session);
  }

  return data;
};
