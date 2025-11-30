// src/app/page.tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { Send } from 'lucide-react';
import DarkModeToggle from "./components/DarkModeToggle";
import { useState } from 'react';

// --- Responsive Chat Component ---
export default function LlamaEmuChat() {

    // 1. MODIFIED DESTRUCTURING (Only take stable properties/functions)
    const { messages, isLoading, sendMessage } = useChat();

    // 2. LOCAL STATE: Manage the input value manually to avoid SDK type errors
    const [localInput, setLocalInput] = useState('');

    // 3. LOCAL SUBMISSION HANDLER: Wraps the hook's sender function
    const handleLocalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (localInput.trim()) {
            sendMessage({ content: localInput });
            setLocalInput('');
        }
    };

    return (
        // The entire component uses localInput for value and trim checks
        <div className="flex flex-col h-screen p-4 sm:p-6 bg-gray-50 dark:bg-[var(--color-darkbg)]">

            {/* Header */}
            <header className="flex items-center justify-between pb-4 text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                <h1 className="flex-1 text-center flex flex-col">
                    <span className="text-2xl font-extrabold text-blue-600 dark:text-[var(--color-darkaccent)]">LLamaEmu</span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">Frontend mock template for LLM chat services</span>
                </h1>
                <div className="absolute right-4 sm:right-6">
                    <DarkModeToggle />
                </div>
            </header>

            {/* Messages Container (Main Content Area) */}
            <main className="flex-1 overflow-y-auto pt-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        Start a new conversation!
                    </div>
                ) : (
                    messages.map(message => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`p-3 rounded-lg max-w-[85%] sm:max-w-[70%] text-sm 
                ${message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-200'}`
                            }>
                                {/* Access text content from the message parts array */}
                                {message.parts?.[0]?.text || ''}
                            </div>
                        </div>
                    ))
                )}
                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg bg-gray-200 text-gray-700 text-sm dark:bg-gray-700 dark:text-gray-300">
                            ...
                        </div>
                    </div>
                )}
            </main>

            {/* Input Form (Fixed at Bottom) */}
                <input
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={localInput}
                    onChange={(e) => setLocalInput(e.target.value)}
                    placeholder={isLoading ? "Thinking..." : "Send a message..."}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                    disabled={isLoading || localInput.trim().length === 0}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
