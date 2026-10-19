const SESSIONS_STORAGE_KEY = "persync_sessions_history";

export const getStoredSessions = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load sessions from localStorage", error);
    return [];
  }
};

export const saveStoredSession = (session) => {
  if (typeof window === "undefined" || !session?.id) {
    return;
  }

  try {
    const current = getStoredSessions();
    const updated = [session, ...current.filter((item) => item.id !== session.id)];
    window.localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save session to localStorage", error);
  }
};

export const getStoredSessionById = (id) => {
  if (typeof window === "undefined" || !id) {
    return null;
  }

  const sessions = getStoredSessions();
  return sessions.find((item) => item.id === id) || null;
};

export const removeStoredSessionById = (id) => {
  if (typeof window === "undefined" || !id) {
    return;
  }

  try {
    const current = getStoredSessions();
    const filtered = current.filter((item) => item.id !== id);
    window.localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete session from localStorage", error);
  }
};
