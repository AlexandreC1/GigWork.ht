
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const languageMap: { [key: string]: string } = {
    en: 'English',
    fr: 'French',
    es: 'Spanish',
    ht: 'Haitian Creole'
};

export const generateGigDescription = async (keywords: string, language: string): Promise<string> => {
    if (!API_KEY) return "API Key not configured. Please set the API_KEY environment variable.";
    try {
        const targetLanguage = languageMap[language] || 'English';
        const prompt = `Generate a compelling and professional gig description for a service provider in Haiti. The description should be welcoming, highlight quality, and be written in ${targetLanguage}. Use the following keywords to guide the description: "${keywords}". The description should be one short paragraph.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating gig description:", error);
        return "Sorry, I couldn't generate a description at this time. Please try again later.";
    }
};

export const getDisputeResolutionSuggestion = async (disputeDetails: string, language: string): Promise<string> => {
    if (!API_KEY) return "API Key not configured. Please set the API_KEY environment variable.";
    try {
        const targetLanguage = languageMap[language] || 'English';
        const prompt = `Act as a neutral, friendly mediator for a dispute between a customer and a service worker on a gig platform in Haiti. The goal is to suggest a fair and peaceful resolution. The dispute is as follows: "${disputeDetails}". Provide a calm, step-by-step suggestion for how they can resolve this, written in ${targetLanguage}. Start by acknowledging both parties' perspectives.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error getting dispute resolution suggestion:", error);
        return "I am unable to provide a suggestion right now. Please consider contacting platform support directly.";
    }
};
