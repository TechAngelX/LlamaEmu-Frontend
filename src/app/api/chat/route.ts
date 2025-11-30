// src/app/api/chat/route.ts
import { streamText, convertToModelMessages } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Set max duration for Vercel Hobby/Pro plans (optional)
export const maxDuration = 30;

// IMPORTANT: This creates an OpenAI client. 
// For your LlamaEmu, you will eventually replace this with a custom 
// fetcher to your UCL server or another service like Groq.
const openai = createOpenAI({
    apiKey: process.env.LLAMA_API_KEY,
    baseURL: 'https://api.openai.com/v1', // REPLACE with your model endpoint URL
});

// Handle the incoming chat request
export async function POST(req: Request) {
    const { messages } = await req.json();

    try {
        const result = streamText({
            model: openai.chat('gpt-3.5-turbo'), // Placeholder model
            messages: convertToModelMessages(messages),
        });

        // Stream the response back to the client
        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.error("LLM API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to connect to LLM backend." }), { status: 500 });
    }
}
