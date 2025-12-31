import { GoogleGenAI, Type } from "@google/genai";
import { CardCategory, CardData } from "../types";
import { CATEGORY_COLORS } from "../constants";

// Helper to generate a UUID-like string
const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateKaraokeCards = async (): Promise<CardData[]> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Returning empty array.");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Genera 10 retos o situaciones divertidas para un juego de cartas de karaoke. Sé creativo, gracioso y variado. Incluye categorías como Reto, Dueto, Actuación o Clásico. Para cada reto, dame también 3 sugerencias de canciones que encajen bien.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: "La instrucción del reto de karaoke" },
                  category: { 
                    type: Type.STRING, 
                    enum: ["Reto", "Dueto", "Actuación", "Clásico"],
                    description: "La categoría del reto"
                  },
                  suggestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 sugerencias de canciones (Título y/o Artista) para ayudar al jugador."
                  }
                },
                required: ["text", "category", "suggestions"]
              }
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const parsedData = JSON.parse(jsonText);
    
    // Transform the AI response into our internal CardData structure
    const newCards: CardData[] = parsedData.cards.map((item: any) => {
        // Map string category to enum safely
        let cat = CardCategory.CLASSIC;
        if (item.category === 'Reto') cat = CardCategory.CHALLENGE;
        if (item.category === 'Dueto') cat = CardCategory.DUET;
        if (item.category === 'Actuación') cat = CardCategory.ACTING;

        return {
            id: generateId(),
            text: item.text,
            category: cat,
            color: CATEGORY_COLORS[cat] || CATEGORY_COLORS[CardCategory.CLASSIC],
            suggestions: item.suggestions || []
        };
    });

    return newCards;

  } catch (error) {
    console.error("Error generating cards with Gemini:", error);
    throw error;
  }
};