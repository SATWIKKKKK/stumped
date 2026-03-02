import { NextRequest } from "next/server"
import { Cricket } from "@/lib/cached-cricket"

export const runtime = "edge"

// SSE endpoint for live match data
// Clients connect here for real-time score updates
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()
  let cancelled = false

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        if (cancelled) return
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Send initial data immediately
      try {
        const res = await Cricket.getLiveMatches()
        send({ type: "matches", data: res?.data ?? [] })
      } catch {
        send({ type: "error", message: "Failed to fetch live matches" })
      }

      // Poll every 30 seconds for updates
      const interval = setInterval(async () => {
        if (cancelled) {
          clearInterval(interval)
          return
        }
        try {
          const res = await Cricket.getLiveMatches()
          send({ type: "matches", data: res?.data ?? [] })
        } catch {
          send({ type: "error", message: "Failed to fetch live matches" })
        }
      }, 30_000)

      // Clean up on close
      req.signal.addEventListener("abort", () => {
        cancelled = true
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
