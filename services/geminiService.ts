
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with the exact process.env.API_KEY string.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async reviewApplication(data: any) {
    const prompt = `Review this developer registration application and provide a JSON response with 'riskScore' (0-100), 'recommendation' (APPROVE, REJECT, MANUAL_REVIEW), and 'comments'.
    Application Data: ${JSON.stringify(data)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            recommendation: { type: Type.STRING },
            comments: { type: Type.STRING }
          },
          required: ["riskScore", "recommendation", "comments"]
        }
      }
    });

    // Access the response.text property directly as it returns the string output.
    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from Gemini.");
    }
    return JSON.parse(text);
  },

  async getDevAssistantResponse(query: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a technical support assistant for the DevHub Developer Center. Answer this developer query: ${query}`,
    });
    // Access the response.text property directly.
    return response.text || "I'm sorry, I encountered an error while processing your request.";
  }
};
