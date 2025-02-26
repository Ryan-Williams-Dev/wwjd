"use client";

import { useState } from "react";

interface JesusChatProps {
  predicament: string;
  inputLabel: string;
  buttonPhrase: string;
}

export default function JesusChat({
  predicament,
  inputLabel,
  buttonPhrase,
}: JesusChatProps) {
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
    <div className="flex flex-col justify-between rounded-3xl p-4 bg-cardBgLight border-4 border-cardBorder space-y-2 shadow-md max-w-3xl sm:mx-auto">
      {!response && (
        <>
          <h2 className="font-medium">{inputLabel}</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            placeholder={predicament}
            className="bg-transparent border rounded-xl p-2 border-amber-200  focus:outline-none focus:ring-2 focus:ring-cardBorder focus:border-transparent focus:bg-background"
          />
          <button
            onClick={getJesusResponse}
            disabled={loading}
            className="w-full border-4 border-white p-2 rounded-3xl bg-cardBgDark shadow-inner shadow-white hover:shadow-none active:shadow-inner active:shadow-gray-300 select-none font-medium text-md"
          >
            {loading ? "Fetching wisdom..." : buttonPhrase}
          </button>
        </>
      )}

      {response && (
        <div className="rounded-xl text-black space-y-2">
          <h2 className="font-medium">You Asked:</h2>
          {input.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="w-full h-1 border-b border-cardBorder" />
          <h2 className="font-medium">Message from the heavens:</h2>
          {response.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <button
            onClick={() => {
              setInput("");
              setResponse(null);
            }}
            className="w-full border-4 border-white p-2 rounded-3xl bg-cardBgDark shadow-inner shadow-white hover:shadow-none active:shadow-inner active:shadow-gray-300 select-none font-medium text-md"
          >
            {"Ask and ye shall receive (again)."}
          </button>
        </div>
      )}
    </div>
  );
}
