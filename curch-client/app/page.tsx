"use client";

import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ""; // Keep the last incomplete line in the buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const content = line.slice(6);
            console.log("Received chunk:", content); // Debug log
            setResponse(prev => prev + content);
          }
        }
      }

      // Process any remaining data in the buffer
      if (buffer.startsWith('data: ')) {
        const content = buffer.slice(6);
        console.log("Received final chunk:", content); // Debug log
        setResponse(prev => prev + content);
      }

    } catch (error) {
      console.error("Error:", error);
      setResponse(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center pt-8 px-4">
      <h1 className="text-4xl font-medium text-cyan-400 mb-2">Curch</h1>
      <p className="text-neutral-400 text-sm mb-8">Discover knowledge with AI</p>
      
      <div className="w-full max-w-2xl flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg py-3 px-4 pr-12 border border-neutral-700 focus:outline-none focus:border-neutral-600 text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-800 rounded-md transition-colors disabled:opacity-50"
            aria-label="Search"
            disabled={isLoading}
          >
            <Search className="w-5 h-5 text-cyan-500" />
          </button>
        </form>

        {response && (
          <div 
            ref={responseRef}
            className="bg-neutral-900 rounded-lg p-4 border border-neutral-700 max-h-[400px] overflow-y-auto"
          >
            <p className="text-neutral-200 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </main>
  );
}
