/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserProfile, Scheme, Message, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeEligibility(profile: UserProfile, schemes: Scheme[], language: Language = "en"): Promise<string> {
  const prompt = `
    You are an expert Eligibility Engine. Analyze the following user profile against the provided schemes.
    IMPORTANT: Respond in the language requested: ${language}.
    
    User Profile:
    ${JSON.stringify(profile, null, 2)}
    
    Schemes:
    ${JSON.stringify(schemes, null, 2)}
    
    Task:
    1. Identify which schemes the user is likely eligible for.
    2. Provide a brief explanation for each recommendation.
    3. If they are ineligible for a scheme, explain why and suggest what might change.
    4. Format the response in clear Markdown.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Unable to generate recommendations.";
  } catch (error) {
    console.error("Eligibility reasoning error:", error);
    return "Error analyzing eligibility. Please try again later.";
  }
}

export async function chatWithAssistant(history: Message[], userInput: string, language: Language = "en"): Promise<string> {
  const langNames: Record<Language, string> = {
    en: "English",
    hi: "Hindi",
    te: "Telugu",
    ta: "Tamil",
    bn: "Bengali"
  };

  const systemInstruction = `
    You are StudentProvidAI, a helpful multilingual counselor for scholarships and education schemes.
    Current interaction language: ${langNames[language]}. 
    IMPORTANT: You MUST respond primarily in ${langNames[language]} unless the user specifically asks to switch.
    Your goal is to help students understand scholarships, academic grants, eligibility, and application procedures.
    You support multiple languages, including regional ones (Hindi, Telugu, Tamil, Bengali, etc.).
    Keep your tone encouraging, professional, and clear.
    If you don't know something about a specific scholarship, suggest the user check the library in the app.
  `;

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: { systemInstruction },
      history: history.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: userInput });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting. Please try again.";
  }
}

export async function verifyDocument(imageData: string, schemeName: string, language: Language = "en"): Promise<string> {
  const prompt = `
    Analyze this document image for a scheme application: ${schemeName}.
    IMPORTANT: Respond in ${language}.
    1. Identify the type of document (Aadhaar, PAN, Income Certificate, etc.).
    2. Extract key information (Name, ID number, Expiry, etc.).
    3. Verify if this document typically fulfills the requirements for ${schemeName}.
    4. Flag any inconsistencies or blurred areas.
    Format your response in Markdown.
  `;

  try {
    const imagePart = {
      inlineData: {
        mimeType: "image/jpeg",
        data: imageData.split(",")[1] || imageData,
      },
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, { text: prompt }] },
    });
    return response.text || "Document analysis failed.";
  } catch (error) {
    console.error("OCR error:", error);
    return "Error scanning document. Please ensure the image is clear.";
  }
}
