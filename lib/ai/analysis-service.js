import { generateStructuredContent } from "./gemini-client.js";
import { buildAnalysisPrompt } from "./prompt-builder/analysis-prompt.js";
import { normalizeAnalysis } from "./prompt-builder/normalizers.js";

export const analyzeProductIntelligence = async (input) => {
  const payload = await generateStructuredContent(
    buildAnalysisPrompt(input),
    "Gemini analysis response is not valid JSON",
  );

  return normalizeAnalysis(payload);
};
