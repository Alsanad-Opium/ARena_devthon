import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Create a chat model instance
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export interface ChatHistory {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function getChatResponse(
  prompt: string,
  context: string,
  history: ChatHistory[]
) {
  try {
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.parts[0].text }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const contextPrompt = `You are an educational AI assistant helping users understand a 3D model of ${context}. 
    Provide detailed, accurate, and engaging responses about ${context} anatomy, function, and related concepts.
    Format your responses using markdown:
    - Use **bold** for important terms
    - Use *italics* for emphasis
    - Use bullet points and numbered lists where appropriate
    - Use headings (###) to organize information
    - Use emojis to make the content engaging
    Keep responses concise but informative. Current user question: ${prompt}`;

    const result = await chat.sendMessage(contextPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
}