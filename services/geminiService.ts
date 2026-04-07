// AI service calls are proxied through the Vite dev server at /api/gemini to
// keep the GEMINI_API_KEY out of the client bundle. For production static
// hosting, deploy an equivalent edge/serverless function at /api/gemini that
// appends the key server-side.

import { sanitizeText } from '../utils/sanitize';

const MODEL = 'gemini-2.5-flash';
const PROXY_BASE = '/api/gemini/v1beta/models';

const languageMap: { [key: string]: string } = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  ht: 'Haitian Creole',
};

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(`${PROXY_BASE}/${MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) throw new Error(`Gemini proxy error: ${res.status}`);
  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return sanitizeText(text);
}

export const generateGigDescription = async (
  keywords: string,
  language: string
): Promise<string> => {
  try {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `Generate a compelling and professional gig description for a service provider in Haiti. The description should be welcoming, highlight quality, and be written in ${targetLanguage}. Use the following keywords to guide the description: "${keywords}". The description should be one short paragraph.`;
    return await callGemini(prompt);
  } catch (error) {
    console.error('Error generating gig description:', error);
    return "Sorry, I couldn't generate a description at this time. Please try again later.";
  }
};

export const getDisputeResolutionSuggestion = async (
  disputeDetails: string,
  language: string
): Promise<string> => {
  try {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `Act as a neutral, friendly mediator for a dispute between a customer and a service worker on a gig platform in Haiti. The goal is to suggest a fair and peaceful resolution. The dispute is as follows: "${disputeDetails}". Provide a calm, step-by-step suggestion for how they can resolve this, written in ${targetLanguage}. Start by acknowledging both parties' perspectives.`;
    return await callGemini(prompt);
  } catch (error) {
    console.error('Error getting dispute resolution suggestion:', error);
    return 'I am unable to provide a suggestion right now. Please consider contacting platform support directly.';
  }
};
