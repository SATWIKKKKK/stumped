"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Sparkles, Loader2, Zap } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const suggestedPrompts = [
    "How does Virat Kohli perform in pressure chases?",
    "Compare Bumrah vs Starc in Tests over the last 2 years",
    "Who is the best T20I batsman currently?",
    "Predict the outcome of the BGT 3rd Test at MCG",
    "What makes Joe Root so effective in Test cricket?",
    "Analyze Rashid Khan's impact in T20 cricket",
];

const mockResponses: Record<string, string> = {
    default: "Based on the available cricket data, I can provide analysis on player performance, match predictions, head-to-head comparisons, and strategic insights. Here are some key observations from the current cricket season:\n\n**Border-Gavaskar Trophy 2025-26:**\nThe series has been riveting, with India winning in Adelaide and the 3rd Test at MCG poised for a thrilling finish. Travis Head's 152 was a masterclass, but Bumrah's 4/68 kept India competitive. The match is finely balanced with India at 198/4, trailing by 114.\n\n**Key Players in Form:**\n- Shubman Gill has been outstanding with 78* in a crucial partnership\n- Babar Azam continues his excellent ODI form with 72* in the Champions Trophy Semi-Final\n- Bumrah remains the #1 ranked Test bowler with an incredible economy rate of 2.77\n\nFeel free to ask specific questions about any player, match, or statistical comparison!",
    kohli: "**Virat Kohli in Pressure Chases (ODIs):**\n\nKohli is widely regarded as one of the greatest chase masters in ODI history. Here's the data breakdown:\n\n- **Average while chasing:** 65.8 (vs 51.2 batting first)\n- **Centuries while chasing:** 26 out of 50 total ODI centuries\n- **Win rate when Kohli scores 50+:** 84%\n- **Runs in successful chases:** 7,200+\n\nIn high-pressure chase situations (requiring 250+ with RRR above 5.5), Kohli averages 72.4 with a strike rate of 96.3. His ability to pace an innings and accelerate when needed is unmatched.\n\n**Key Insight:** Kohli's pressure index in chases is 94.2 (out of 100), the highest ever recorded for a batsman with 100+ ODI innings.",
    bumrah: "**Bumrah vs Starc in Tests (Last 2 Years):**\n\n| Metric | Bumrah | Starc |\n|--------|--------|-------|\n| Wickets | 78 | 62 |\n| Average | 18.4 | 24.8 |\n| Economy | 2.65 | 3.12 |\n| 5-wicket hauls | 6 | 3 |\n| Strike Rate | 41.6 | 47.8 |\n\n**Analysis:** Bumrah has been statistically superior across every metric. His economy rate of 2.65 in Tests is historically exceptional - among the best ever for fast bowlers. Starc's left-arm angle gives him a different advantage, particularly with the new ball, but Bumrah's versatility across all phases makes him the more complete bowler in the format.\n\n**Pressure Situations:** Bumrah's average in the 4th innings improves to 16.2, while Starc's drops slightly to 27.1, further highlighting Bumrah's ability to deliver when it matters most.",
    t20: "**Best T20I Batsmen (Current Rankings & Analysis):**\n\n1. **Suryakumar Yadav** (Rating: 895)\n   - Average: 46.8 | SR: 171.2\n   - The #1 ranked T20I batsman. His 360-degree stroke play and ability to score in unconventional areas makes him virtually impossible to contain.\n\n2. **Babar Azam** (Rating: 862)\n   - Average: 41.5 | SR: 128.8\n   - More classical approach but incredibly consistent. His anchor role is invaluable in T20 cricket.\n\n3. **Jos Buttler** (Rating: 835)\n   - Average: 33.5 | SR: 144.2\n   - Explosive power-hitter who can single-handedly win matches in the powerplay.\n\n**AI Verdict:** Suryakumar Yadav is currently the most impactful T20I batsman due to his exceptional strike rate without sacrificing consistency. His Impact Score of 92.7 is the highest in the format.",
};

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (prompt?: string) => {
        const text = prompt || input;
        if (!text.trim()) return;

        const userMessage: Message = { role: "user", content: text, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate AI response with contextual mock data
        await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

        let response = mockResponses.default;
        const lower = text.toLowerCase();
        if (lower.includes("kohli") && (lower.includes("chase") || lower.includes("pressure"))) {
            response = mockResponses.kohli;
        } else if (lower.includes("bumrah") && lower.includes("starc")) {
            response = mockResponses.bumrah;
        } else if (lower.includes("t20") && lower.includes("best")) {
            response = mockResponses.t20;
        }

        const assistantMessage: Message = { role: "assistant", content: response, timestamp: new Date() };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
    };

    return (
        <div className="p-6 h-[calc(100vh-3.5rem)] flex flex-col">
            <div className="mb-4">
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Bot className="h-6 w-6 text-cricket-amber" /> Cricket AI Assistant
                </h1>
                <p className="text-muted-foreground">Ask anything about cricket - stats, analysis, predictions, and more</p>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cricket-amber/20 to-cricket-lime/10 flex items-center justify-center mb-4">
                                <Sparkles className="h-8 w-8 text-cricket-amber" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">STUMPED AI</h2>
                            <p className="text-sm text-muted-foreground mb-6 max-w-md">
                                Your cricket intelligence engine. Ask about player stats, match analysis, head-to-head comparisons, predictions, and more.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                                {suggestedPrompts.map((prompt, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs text-left justify-start h-auto py-2.5 px-3"
                                        onClick={() => handleSubmit(prompt)}
                                    >
                                        <Zap className="h-3 w-3 mr-1.5 shrink-0 text-cricket-amber" />
                                        <span className="truncate">{prompt}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                                    {msg.role === "assistant" && (
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cricket-amber/20 to-cricket-lime/10 flex items-center justify-center shrink-0">
                                            <Bot className="h-4 w-4 text-cricket-amber" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] rounded-xl p-4 ${msg.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                        }`}>
                                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                            {msg.content.split("\n").map((line, i) => {
                                                if (line.startsWith("**") && line.endsWith("**")) {
                                                    return <p key={i} className="font-bold mt-2 first:mt-0">{line.replace(/\*\*/g, "")}</p>;
                                                }
                                                if (line.startsWith("- ")) {
                                                    return <p key={i} className="ml-2">{line}</p>;
                                                }
                                                if (line.startsWith("|")) {
                                                    return <p key={i} className="font-mono text-xs">{line}</p>;
                                                }
                                                return <p key={i}>{line}</p>;
                                            })}
                                        </div>
                                        <p className="text-[10px] opacity-60 mt-2">
                                            {msg.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cricket-amber/20 to-cricket-lime/10 flex items-center justify-center shrink-0">
                                        <Bot className="h-4 w-4 text-cricket-amber" />
                                    </div>
                                    <div className="bg-muted rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Analyzing cricket data...
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="border-t p-4">
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about cricket stats, match analysis, player comparisons..."
                            disabled={isLoading}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={isLoading || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                    <p className="text-[10px] text-muted-foreground text-center mt-2">
                        Powered by STUMPED AI  |  Connect your OpenAI API key for enhanced responses
                    </p>
                </div>
            </Card>
        </div>
    );
}
