"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestedPrompts = [
  "How does Virat Kohli perform in pressure chases?",
  "Compare Bumrah vs Starc in Tests",
  "Who is the best T20I batsman currently?",
  "Analyze the current Test bowling rankings",
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (prompt?: string) => {
    const text = prompt || input
    if (!text.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    setIsLoading(true)

    // Placeholder: connect your AI provider here
    await new Promise((r) => setTimeout(r, 1000))
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "AI responses require an API key. Connect your OpenAI or Anthropic key in the environment variables to enable cricket intelligence.",
      },
    ])
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Cricket AI Assistant</h1>
        <p className="text-muted-foreground text-sm">Ask anything about cricket — stats, analysis, predictions</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-foreground/10 flex items-center justify-center mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">STUMPED AI</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Your cricket intelligence engine. Connect an AI API key to unlock player analysis, match predictions, and more.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                {suggestedPrompts.map((prompt, idx) => (
                  <Button key={idx} variant="outline" size="sm" className="text-xs text-left justify-start h-auto py-2.5 px-3" onClick={() => handleSubmit(prompt)}>
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="h-8 w-8 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0 text-xs font-bold">AI</div>
                  )}
                  <div className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.role === "user" ? "bg-foreground text-background" : "bg-card border"}`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="h-8 w-8 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0 text-xs font-bold">U</div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0 text-xs font-bold">AI</div>
                  <div className="bg-card border rounded-xl p-3 text-sm text-muted-foreground">Thinking...</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about cricket..." disabled={isLoading} className="flex-1" />
            <Button type="submit" disabled={isLoading || !input.trim()}>Send</Button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Connect your AI API key in environment variables for full responses
          </p>
        </div>
      </Card>
    </div>
  )
}