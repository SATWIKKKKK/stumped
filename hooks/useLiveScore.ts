"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import type { CricketMatch } from "@/types/cricket"

interface LiveScoreState {
  matches: CricketMatch[]
  isConnected: boolean
  error: string | null
}

export function useLiveScore() {
  const [state, setState] = useState<LiveScoreState>({
    matches: [],
    isConnected: false,
    error: null,
  })
  const eventSourceRef = useRef<EventSource | null>(null)
  const retryCountRef = useRef(0)

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }

    const es = new EventSource("/api/live")
    eventSourceRef.current = es

    es.onopen = () => {
      setState((prev) => ({ ...prev, isConnected: true, error: null }))
      retryCountRef.current = 0
    }

    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data)
        if (parsed.type === "matches") {
          setState((prev) => ({
            ...prev,
            matches: parsed.data,
            isConnected: true,
          }))
        }
      } catch {
        // Ignore parse errors
      }
    }

    es.onerror = () => {
      es.close()
      setState((prev) => ({
        ...prev,
        isConnected: false,
        error: "Connection lost. Reconnecting...",
      }))

      // Exponential backoff retry
      const delay = Math.min(1000 * 2 ** retryCountRef.current, 30_000)
      retryCountRef.current++
      setTimeout(connect, delay)
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      eventSourceRef.current?.close()
    }
  }, [connect])

  return state
}
