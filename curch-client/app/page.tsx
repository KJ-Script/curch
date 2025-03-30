"use client";

import { Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center pt-32 px-4">
      <h1 className="text-4xl font-medium text-cyan-400 mb-2">Curch</h1>
      <p className="text-neutral-400 text-sm mb-8">Discover knowledge with AI</p>
      
      <div className="w-full max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask anything..."
            className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg py-3 px-4 pr-12 border border-neutral-700 focus:outline-none focus:border-neutral-600 text-sm"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-800 rounded-md transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-cyan-500" />
          </button>
        </div>
      </div>
    </main>
  );
}
