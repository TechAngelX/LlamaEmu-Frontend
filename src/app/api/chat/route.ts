// src/app/api/chat/route.ts
import { streamText, convertToModelMessages } from 'ai';
// Import the necessary provider now that it's installed
import { createOpenAI } from '@ai-sdk/openai';

export const maxDuration = 60;

// CUSTOM API DEFINITION: 
const customTrainedModel = createOpenAI({
    apiKey: process.env.LLAMA_API_KEY,
    // Base URL must be the exact URL of your custom API server (UCL or other)
    baseURL: process.env.LLAMA_API_URL || "http://your-blahlbha-api:8000/v1",
});

// Handle the incoming chat request
export async function POST(req: Request) {
    const { messages } = await req.json();

    try {
        const result = streamText({
            // The model name 'blahlbha-trained-model' is used by your custom client
            model: customTrainedModel.chat("blahlbha-trained-model"),
            messages: convertToModelMessages(messages),
        });

        // Stream the response back to the client
        return result.toUIMessageStreamResponse();

    } catch (error) {
        console.error("LLM API Error:", error);
        // Return a generic 500 error to the client
        return new Response(JSON.stringify({ error: "Failed to connect to LLM backend (blahlbha model)." }), { status: 500 });
    }
}
