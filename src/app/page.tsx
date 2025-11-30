// src/app/page.tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { Send } from 'lucide-react';
import DarkModeToggle from "./components/DarkModeToggle"; // Assuming component path

// --- Responsive Chat Component ---
export default function LlamaEmuChat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const currentInput = input ?? '';

    return (
        // The entire viewport container, matching the dark background and full height
        <div className="flex h-screen bg-[var(--color-darkbg)] text-gray-200">

            {/* === 1. SIDEBAR (Fixed Width, Dark Background) === */}
            <aside className="hidden md:flex flex-col w-64 bg-black p-4 border-r border-gray-800">

                {/* Logo/New Chat Button (Placeholder) */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-semibold text-white">LLamaEmu</span>
                    <button className="p-1 rounded hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                    </button>
                </div>

                {/* Chat List (Placeholder Content) */}
                <div className="flex-1 overflow-y-auto text-sm space-y-1">
                    <div className="text-gray-400 font-medium mb-2">Your chats</div>
                    <div className="truncate p-2 rounded hover:bg-gray-800 cursor-pointer">Mac torch installation fix</div>
                    <div className="truncate p-2 rounded hover:bg-gray-800 cursor-pointer bg-gray-800">Get back to marine</div>
                    <div className="truncate p-2 rounded hover:bg-gray-800 cursor-pointer">London flooding concerns p...</div>
                </div>

                {/* Bottom Footer/Upgrade */}
                <div className="border-t border-gray-800 pt-4 mt-4 space-y-2">
                    <div className="flex items-center justify-between p-2 rounded hover:bg-gray-800">
                        <span className="text-sm">Upgrade</span>
                        <span className="text-xs text-yellow-500">New</span>
                    </div>
                    <div className="flex items-center p-2 rounded hover:bg-gray-800">
                        <span className="text-xs text-gray-400">TechAngelX</span>
                        <div className="ml-auto">
                            <DarkModeToggle />
                        </div>
                    </div>
                </div>
            </aside>

            {/* === 2. MAIN CHAT WINDOW === */}
            <main className="flex flex-col flex-1 relative">

                {/* Header (Reused existing LLamaEmu title structure) */}
                <header className="flex items-center justify-center pt-4 pb-2 border-b border-gray-800 md:hidden">
                    <h1 className="flex-1 text-center flex flex-col">
                        <span className="text-lg font-extrabold text-blue-600 dark:text-[var(--color-darkaccent)]">LLamaEmu</span>
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">Frontend mock template for LLM chat services</span>
                    </h1>
                    <div className="absolute top-4 right-4 md:hidden">
                        <DarkModeToggle />
                    </div>
                </header>

                {/* Central Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto p-4 pt-12 md:p-8">

                    {/* Central Text / Landing Area */}
                    {messages.length === 0 ? (
                        <div className="text-center w-full max-w-xl">
                            <h2 className="text-3xl font-bold mb-10 text-white">
                                What are you working on?
                            </h2>
                            <div className="text-center text-red-400 border border-red-600 p-3 rounded-lg w-full">
                                You've hit the Free plan limit for GPT-5.
                                Responses will use another model until your limit resets after 11:06 PM.
                            </div>
                        </div>
                    ) : (
                        // Display Message History
                        <div className="w-full max-w-3xl space-y-6">
                            {messages.map(message => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`p-3 rounded-xl max-w-[90%] text-base 
                                ${message.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-100'}`
                                    }>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer Spacer */}
                    <div className="h-40" />
                </div>

                {/* Input Form (Fixed at Bottom, styled for the dark theme) */}
                <form
                    onSubmit={handleSubmit}
                    className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex justify-center bg-[var(--color-darkbg)] border-t border-gray-800"
                >
                    <div className="w-full max-w-3xl flex gap-3">
                        <input
                            className="flex-1 p-4 border border-gray-600 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={currentInput}
                            onChange={handleInputChange}
                            placeholder={isLoading ? "Thinking..." : "Ask anything"}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition"
                            disabled={isLoading || currentInput.trim().length === 0}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
