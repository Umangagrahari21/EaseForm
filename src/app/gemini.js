// src/app/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// use a valid model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Base askGemini function
export async function askGemini(prompt, context = "") {
  try {
    const fullPrompt = context
      ? `You are EaseForm's AI assistant. Use this context:\n\n${context}\n\nUser: ${prompt}`
      : prompt;

    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  } catch (error) {
    console.error("[Gemini Error in askGemini]:", error);
    throw error;
  }
}

// Extra helper: fix grammar
export async function rewriteText(text) {
  return askGemini(`Fix grammar and spelling in this text, keep meaning same: "${text}"`);
}

// Extra helper: continue story
export async function continueStory(text) {
  return askGemini(`Continue this story in a natural way: "${text}"`);
}
