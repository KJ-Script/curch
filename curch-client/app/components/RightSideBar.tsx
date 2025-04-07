"use client";

import { ChevronRight, Star, Clock } from "lucide-react";

export default function RightSideBar() {
  return (
    <div className="w-80 bg-neutral-800 h-screen text-neutral-300 flex flex-col border-l border-neutral-700/50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700/50">
        <span className="text-white font-medium">Quick Results</span>
        <button className="p-1 hover:bg-neutral-700 rounded-full">
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {/* Popular Searches */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-sm font-medium text-white mb-3">
            <Star className="w-4 h-4" />
            Popular Searches
          </h3>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200">
              <Clock className="w-4 h-4" />
              Machine learning basics
            </button>
            <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200">
              <Clock className="w-4 h-4" />
              JavaScript frameworks
            </button>
            <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200">
              <Clock className="w-4 h-4" />
              Web development trends
            </button>
          </div>
        </div>

        {/* Recommended */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Recommended</h3>
          <div className="flex flex-col gap-2">
            <button className="text-sm text-neutral-400 hover:text-neutral-200 text-left">
              Introduction to AI Research
            </button>
            <button className="text-sm text-neutral-400 hover:text-neutral-200 text-left">
              Latest in Neural Networks
            </button>
            <button className="text-sm text-neutral-400 hover:text-neutral-200 text-left">
              Understanding Deep Learning
            </button>
          </div>
        </div>

        {/* Pro Section */}
        <div className="mt-auto pt-8">
          <div className="bg-neutral-900 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-cyan-900 flex items-center justify-center text-white text-sm">
                C
              </div>
              <span className="text-white font-medium">Curch Pro</span>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Get personalized results, save searches, and access premium content
            </p>
            <button className="w-full bg-cyan-500 text-white rounded-md py-2 text-sm font-medium hover:bg-cyan-600">
              Sign in
            </button>
            <button className="w-full text-neutral-400 hover:text-neutral-200 py-2 text-sm mt-2">
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
