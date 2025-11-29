
import { GoogleGenAI, Type } from "@google/genai";
import { Idea, VibeCheckResult, Collaborator } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

export const generateIdeas = async (topic: string, niche: string): Promise<Idea[]> => {
  try {
    const prompt = `Generate 4 creative social media post ideas for a student. 
    Topic: ${topic}. 
    Niche/Audience: ${niche}.
    Return a list of JSON objects with title, description, and difficulty (Easy/Medium/Hard).`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Idea[];
    }
    return [];
  } catch (error) {
    console.error("Error generating ideas:", error);
    return [];
  }
};

export const performVibeCheck = async (content: string, platform: string): Promise<VibeCheckResult[]> => {
  try {
    const prompt = `Act as a Gen Z social media expert. Analyze this draft content for ${platform} and generate 3 distinct persona variations:
    1. "The Trendsetter" (High virality, trendy slang, hooks)
    2. "The Relatable Bestie" (Authentic, vulnerable, chill)
    3. "The Professional" (Polished, clear value, informative)

    Draft: "${content}"
    
    For each persona, return a JSON object with:
    1. persona (The name of the persona)
    2. optimizedCaption (Rewrite the draft to perfectly match this persona and platform)
    3. viralityScore (0-100 integer)
    4. sentiment (String)
    5. tone (String)
    6. constructiveFeedback (One sentence on why this works)
    7. suggestedHashtags (Array of strings)
    8. visualPrompt (A creative AI image generation prompt matching this specific vibe)`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              persona: { type: Type.STRING },
              optimizedCaption: { type: Type.STRING },
              viralityScore: { type: Type.INTEGER },
              sentiment: { type: Type.STRING },
              tone: { type: Type.STRING },
              constructiveFeedback: { type: Type.STRING },
              suggestedHashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              visualPrompt: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as VibeCheckResult[];
    }
    return [];
  } catch (error) {
    console.error("Error checking vibe:", error);
    return [];
  }
};

export const findCollaborators = async (niche: string): Promise<Collaborator[]> => {
  try {
    const prompt = `Generate 4 fictional social media creator profiles for a collaboration match in the "${niche}" niche.
    
    Mix:
    - 2 "Micro" creators (Free to collaborate, smaller following)
    - 2 "Macro" creators (Paid tier, larger following)
    
    For each collaborator, generate:
    1. name & handle
    2. niche
    3. followerCount (e.g. "12.5k" or "250k")
    4. engagementRate (e.g. "8.2%")
    5. matchScore (integer 80-99)
    6. reason (Why they match)
    7. collabIdea (Video idea)
    8. tier (Enum: "Free", "Paid", "Premium")
    9. price (Integer: 0 for Free, 50-500 for Paid/Premium)
    
    Return as a JSON array.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              handle: { type: Type.STRING },
              niche: { type: Type.STRING },
              followerCount: { type: Type.STRING },
              engagementRate: { type: Type.STRING },
              matchScore: { type: Type.INTEGER },
              reason: { type: Type.STRING },
              collabIdea: { type: Type.STRING },
              tier: { type: Type.STRING, enum: ["Free", "Paid", "Premium"] },
              price: { type: Type.NUMBER }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Collaborator[];
    }
    return [];
  } catch (error) {
    console.error("Error finding collaborators:", error);
    return [];
  }
};
