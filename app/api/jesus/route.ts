import { NextResponse } from "next/server";
import prompt from "@/data/jesusPrompt";

interface RequestBody {
  userInput: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { userInput }: RequestBody = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: prompt,
          },
          { role: "user", content: userInput },
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API error:", response.status, errorData);
      return NextResponse.json(
        { error: `OpenAI API returned ${response.status}` },
        { status: response.status }
      );
    }

    const data: OpenAIResponse = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected API response format:", data);
      return NextResponse.json(
        { error: "Unexpected API response format" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 }
    );
  }
}
