import crypto from "crypto";

const DAILY_LIMIT = 3;
export const QUOTA_COOKIE_NAME = "persync_daily_quota";

const getSecret = () => {
  const secret = process.env.QUOTA_SECRET || process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("QUOTA_SECRET or JWT_SECRET must be configured");
  }

  return secret;
};

const getTodayString = () => {
  // Gunakan waktu lokal Indonesia (WIB - UTC+7) agar reset kuota sesuai pergantian hari pengguna
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date()); // Mengembalikan format YYYY-MM-DD
};

const base64UrlEncode = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const base64UrlDecode = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64").toString("utf8");
};

const sign = (data) =>
  crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");

export const parseQuotaCookie = (rawCookie) => {
  const today = getTodayString();
  const defaultState = {
    used: 0,
    limit: DAILY_LIMIT,
    remaining: DAILY_LIMIT,
    canGenerate: true,
  };

  if (!rawCookie || typeof rawCookie !== "string") {
    return defaultState;
  }

  const parts = rawCookie.split(".");
  if (parts.length !== 2) {
    return defaultState;
  }

  const [encodedPayload, signature] = parts;
  const expectedSignature = sign(encodedPayload);

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return defaultState;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.date !== today) {
      return defaultState;
    }

    const count = Number(payload.count) || 0;
    return {
      used: count,
      limit: DAILY_LIMIT,
      remaining: Math.max(0, DAILY_LIMIT - count),
      canGenerate: count < DAILY_LIMIT,
    };
  } catch {
    return defaultState;
  }
};

export const createQuotaCookieValue = (currentUsedCount) => {
  const today = getTodayString();
  const newCount = currentUsedCount + 1;
  const payload = JSON.stringify({
    date: today,
    count: newCount,
  });

  const encodedPayload = base64UrlEncode(payload);
  const signature = sign(encodedPayload);

  return {
    value: `${encodedPayload}.${signature}`,
    newCount,
    remaining: Math.max(0, DAILY_LIMIT - newCount),
  };
};
