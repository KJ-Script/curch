"use client";

import { useState } from "react";
import { Search, MessageSquare, ChevronLeft } from "lucide-react";

interface HistoryItem {
  id: string;
  type: "search" | "chat";
  query: string;
  date: string;
  results?: number;
}

export default function LeftSideBar() {
  const [activeTab, setActiveTab] = useState<"History" | "Saved">("History");
  
  const historyItems: HistoryItem[] = [
    {
      id: "1",
      type: "search",
      query: "Machine learning...",
      date: "Apr 15",
      results: 5
    },
    {
      id: "2",
      type: "chat",
      query: "How do neural...",
      date: "Apr 14"
    },
    {
      id: "3",
      type: "search",
      query: "Python vs JavaScript",
      date: "Apr 13",
      results: 8
    },
    {
      id: "4",
      type: "chat",
      query: "Explain quantum...",
      date: "Apr 12"
    },
    {
      id: "5",
      type: "search",
      query: "Best programming...",
      date: "Apr 11",
      results: 6
    }
  ];

  return (
    <div className="w-64 bg-neutral-800 h-screen text-neutral-300 flex flex-col border-r border-neutral-700/50">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-neutral-700/50">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-neutral-700 rounded-full">
            <ChevronLeft className="w-4 h-4 text-neutral-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-cyan-900 flex items-center justify-center text-white text-sm">
              C
            </div>
            <span className="text-white text-sm font-medium">Curch</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-1 px-3 pt-3 pb-2">
        <button
          onClick={() => setActiveTab("History")}
          className={`px-4 py-1.5 rounded-md text-sm ${
            activeTab === "History"
              ? "bg-cyan-900 text-white"
              : "text-neutral-400 hover:bg-neutral-700"
          }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("Saved")}
          className={`px-4 py-1.5 rounded-md text-sm ${
            activeTab === "Saved"
              ? "bg-cyan-900 text-white"
              : "text-neutral-400 hover:bg-neutral-700"
          }`}
        >
          Saved
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2 mb-3 hover:bg-neutral-700/50 p-2 rounded-lg cursor-pointer group"
          >
            {item.type === "search" ? (
              <Search className="w-4 h-4 text-neutral-400 mt-1" />
            ) : (
              <MessageSquare className="w-4 h-4 text-neutral-400 mt-1" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-neutral-200 text-sm mb-0.5 truncate">{item.query}</p>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>{item.date}</span>
                {item.results && (
                  <>
                    <span>•</span>
                    <span>{item.results} results</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clear History Button */}
      <div className="px-3 py-2 border-t border-neutral-700/50">
        <button className="w-full text-sm text-neutral-400 hover:text-neutral-200 text-center py-1">
          Clear history
        </button>
      </div>
    </div>
  );
}
