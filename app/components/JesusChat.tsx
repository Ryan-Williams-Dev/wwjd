"use client";

import { useState } from "react";

export default function JesusChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getJesusResponse = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/jesus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch {
      setResponse("An error occurred. Maybe pray about it?");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">What Would Jesus Do?</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your predicament..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={getJesusResponse}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Praying..." : "Get Divine Advice"}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="italic">&quot;{response}&quot;</p>
        </div>
      )}
    </div>
  );
}
