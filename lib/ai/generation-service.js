import { generateStructuredContent } from "./gemini-client.js";
import { buildGuidancePrompt } from "./prompt-builder/guidance-prompt.js";
import { normalizeGuidance } from "./prompt-builder/normalizers.js";

export const generateBusinessGuidance = async (input, analysis) => {
  const guidancePayload = await generateStructuredContent(
    buildGuidancePrompt(input, analysis),
    "Gemini guidance response is not valid JSON",
  );

  return normalizeGuidance(guidancePayload);
};
