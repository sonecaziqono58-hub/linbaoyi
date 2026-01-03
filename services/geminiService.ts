
import { GoogleGenAI, Type } from "@google/genai";
import { PoemData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePoem = async (prompt: string): Promise<PoemData> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请根据以下意境或关键词创作一首优美的、富有文学气息的现代短诗。关键词：${prompt}。要求：包含标题、作者（虚构一个好听的名字）和3-5行诗句。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          author: { type: Type.STRING },
          content: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "author", "content"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateArtImage = async (poem: PoemData): Promise<string> => {
  const visualPrompt = `A minimal, artistic, zen-style painting based on the poem titled "${poem.title}". The mood is ${poem.content.join(' ')}. Muted colors, watercolor style, large negative space, high aesthetic quality, cinematic lighting.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: visualPrompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4"
      }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  if (!imageUrl) throw new Error("Image generation failed");
  return imageUrl;
};
