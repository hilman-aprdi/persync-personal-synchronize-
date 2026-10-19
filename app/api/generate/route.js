import { NextResponse } from "next/server";
import crypto from "crypto";
import { analyzeProductIntelligence } from "@/lib/ai/analysis-service.js";
import { generateBusinessGuidance } from "@/lib/ai/generation-service.js";
import {
  QUOTA_COOKIE_NAME,
  createQuotaCookieValue,
  parseQuotaCookie,
} from "@/lib/quota.js";

// Izinkan Serverless Function berjalan hingga 60 detik di Vercel untuk inferensi AI
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const requiredStringFields = [
  "currentSituation",
  "mainGoal",
  "capitalRange",
  "timeAvailability",
  "preferredWorkStyle",
  "salesConfidence",
  "targetIncome",
  "marketFamiliarity",
];

const validateInput = (payload) => {
  const data = payload || {};
  const errors = [];

  for (const field of requiredStringFields) {
    if (!data[field] || typeof data[field] !== "string" || data[field].trim().length < 2) {
      errors.push(`${field} is required`);
    }
  }

  if (!Array.isArray(data.skillsInterests) || data.skillsInterests.length === 0) {
    errors.push("skillsInterests must be an array with at least 1 item");
  }

  if (errors.length > 0) {
    const error = new Error("Invalid request body");
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  return {
    currentSituation: data.currentSituation.trim(),
    mainGoal: data.mainGoal.trim(),
    skillsInterests: data.skillsInterests.map((item) => String(item).trim()).filter(Boolean),
    capitalRange: data.capitalRange.trim(),
    timeAvailability: data.timeAvailability.trim(),
    preferredWorkStyle: data.preferredWorkStyle.trim(),
    salesConfidence: data.salesConfidence.trim(),
    targetIncome: data.targetIncome.trim(),
    marketFamiliarity: data.marketFamiliarity.trim(),
    additionalContext: String(data.additionalContext || "").trim(),
  };
};

export async function GET(request) {
  const rawCookie = request.cookies.get(QUOTA_COOKIE_NAME)?.value;
  const quota = parseQuotaCookie(rawCookie);

  return NextResponse.json({
    success: true,
    quota,
  });
}

export async function POST(request) {
  try {
    const rawCookie = request.cookies.get(QUOTA_COOKIE_NAME)?.value;
    const quotaState = parseQuotaCookie(rawCookie);

    if (!quotaState.canGenerate) {
      return NextResponse.json(
        {
          success: false,
          message: "Batas 3 analisis gratis hari ini telah tercapai.",
          details: {
            code: "DAILY_LIMIT_REACHED",
            headline: "Batas 3 analisis gratis hari ini telah tercapai.",
            supportingText: "Anda dapat melakukan analisis bisnis baru lagi besok.",
            quota: quotaState,
          },
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const input = validateInput(body);

    // Jalankan 2-step pipeline inferensi Gemini AI
    const analysis = await analyzeProductIntelligence(input);
    const result = await generateBusinessGuidance(input, analysis);

    const sessionId = crypto.randomUUID();
    const session = {
      id: sessionId,
      ...input,
      result,
      generatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const cookieData = createQuotaCookieValue(quotaState.used);

    const response = NextResponse.json(
      {
        success: true,
        session,
        result: session.result,
        quota: {
          limit: 3,
          used: cookieData.newCount,
          remaining: cookieData.remaining,
          canGenerate: cookieData.remaining > 0,
        },
      },
      { status: 201 },
    );

    // Pasang signed cookie kuota harian (berlaku 24 jam)
    response.cookies.set({
      name: QUOTA_COOKIE_NAME,
      value: cookieData.value,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("API /api/generate failed", error);
    const statusCode = error.statusCode || 500;
    const isExpectedError = statusCode < 500 || statusCode === 503;
    const message = isExpectedError
      ? error.message
      : "Terjadi kendala saat memproses analisis bisnis.";

    return NextResponse.json(
      {
        success: false,
        message,
        details: error.details || null,
      },
      { status: statusCode },
    );
  }
}
