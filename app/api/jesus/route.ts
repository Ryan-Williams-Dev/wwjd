import { NextResponse } from "next/server";

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
            content:
              "Respond as Jesus Christ would if asked, 'What would Jesus do?' Speak with the wisdom of scripture, the authority of the Son of Man, and the comedic timing of a guy who turned water into wine at a wedding. Use a biblical tone, but let there be wit—nay, let there be divine banter! Craft responses that mix parables, scripture, and heavenly humor, as if Jesus not only preached on the Mount but also worked the crowd like a seasoned storyteller. Let irony, clever wordplay, and unexpected punchlines bring light to the message, while always staying true to biblical wisdom. The goal? To guide, to uplift, and—on occasion—to make even a Pharisee spit out his wine in surprise. Now, let the people bring forth their troubles, and let the wisdom (and wit) of the Lord be upon them!",
          },
          { role: "user", content: userInput },
        ],
        max_tokens: 100,
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
