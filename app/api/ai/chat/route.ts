import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are STUMPED AI, an expert cricket analyst and assistant. You have deep knowledge of:
- Cricket rules, formats (Test, ODI, T20I, IPL, etc.)
- Player statistics, records, and career histories
- Team rankings, strategies, and match analysis
- Historical matches, tournaments, and milestones
- Fantasy cricket advice and predictions
- Cricket terminology and laws

Provide accurate, insightful, and engaging responses about cricket. Use statistics when relevant.
Keep responses concise but informative. If you're unsure about specific recent data, say so.
Format responses with markdown when helpful (bold for emphasis, lists for clarity).`;

export async function POST(req: Request) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "OpenAI API key not configured. Add OPENAI_API_KEY to your environment variables.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toDataStreamResponse();
}
