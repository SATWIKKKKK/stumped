"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Award, TrendingUp, Target, Star, Zap } from "lucide-react";
import { getPlayerById, getPlayerStatsByPlayerId } from "@/lib/data";

export default function PlayerDetailPage({ params }: { params: Promise<{ playerId: string }> }) {
    const { playerId } = use(params);
    const player = getPlayerById(playerId);
    if (!player) return notFound();

    const stats = getPlayerStatsByPlayerId(playerId);
    const formats = [...new Set(stats.map(s => s.format))];

    return (
        <div className="p-6 space-y-6">
            {/* Back */}
            <Button variant="ghost" size="sm" asChild>
                <Link href="/players"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Players</Link>
            </Button>

            {/* Player Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-cricket-amber via-cricket-gold to-cricket-lime" />
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-3xl font-bold text-primary shrink-0">
                                {player.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold">{player.name}</h1>
                                <p className="text-lg text-muted-foreground">{player.country}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <Badge variant="default">{player.role.replace("_", " ")}</Badge>
                                    <Badge variant="outline">{player.battingStyle}</Badge>
                                    <Badge variant="outline">{player.bowlingStyle}</Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Born: {new Date(player.dateOfBirth).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                    </span>
                                </div>
                            </div>
                            {/* Quick Stats for main format */}
                            {stats.length > 0 && (
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-3 rounded-xl bg-muted/50">
                                        <p className="text-2xl font-bold text-primary">{stats[0].matches}</p>
                                        <p className="text-xs text-muted-foreground">Matches</p>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-muted/50">
                                        <p className="text-2xl font-bold">{stats[0].runs}</p>
                                        <p className="text-xs text-muted-foreground">Runs</p>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-muted/50">
                                        <p className="text-2xl font-bold">{stats[0].wickets}</p>
                                        <p className="text-xs text-muted-foreground">Wickets</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Stats by Format */}
            {stats.length > 0 ? (
                <Tabs defaultValue={formats[0]} className="space-y-4">
                    <TabsList>
                        {formats.map((fmt) => (
                            <TabsTrigger key={fmt} value={fmt}>{fmt}</TabsTrigger>
                        ))}
                    </TabsList>

                    {formats.map((fmt) => {
                        const s = stats.find(st => st.format === fmt)!;
                        return (
                            <TabsContent key={fmt} value={fmt} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Batting Card */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-center gap-2 text-base">
                                                <Star className="h-4 w-4 text-cricket-amber" /> Batting Statistics
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: "Matches", value: s.matches },
                                                    { label: "Innings", value: s.innings },
                                                    { label: "Runs", value: s.runs.toLocaleString() },
                                                    { label: "Average", value: s.average.toFixed(2) },
                                                    { label: "Strike Rate", value: s.strikeRate.toFixed(2) },
                                                    { label: "Highest", value: s.highestScore },
                                                    { label: "100s", value: s.hundreds },
                                                    { label: "50s", value: s.fifties },
                                                    { label: "Balls Faced", value: s.ballsFaced.toLocaleString() },
                                                    { label: "Catches", value: s.catches },
                                                ].map(({ label, value }) => (
                                                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-border/50">
                                                        <span className="text-sm text-muted-foreground">{label}</span>
                                                        <span className="text-sm font-bold tabular-nums">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Bowling Card */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-center gap-2 text-base">
                                                <Target className="h-4 w-4 text-cricket-lime" /> Bowling Statistics
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: "Wickets", value: s.wickets },
                                                    { label: "Bowling Average", value: s.bowlingAverage > 0 ? s.bowlingAverage.toFixed(2) : "-" },
                                                    { label: "Economy", value: s.economyRate > 0 ? s.economyRate.toFixed(2) : "-" },
                                                    { label: "Best Bowling", value: s.bestBowling },
                                                    { label: "Balls Bowled", value: s.ballsBowled.toLocaleString() },
                                                    { label: "Runs Conceded", value: s.runsConceded.toLocaleString() },
                                                    { label: "Stumpings", value: s.stumpings },
                                                ].map(({ label, value }) => (
                                                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-border/50">
                                                        <span className="text-sm text-muted-foreground">{label}</span>
                                                        <span className="text-sm font-bold tabular-nums">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Performance Highlights */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <Zap className="h-4 w-4 text-cricket-amber" /> Key Highlights
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { label: "Batting Impact", value: s.runs > 5000 ? "Elite" : s.runs > 2000 ? "High" : "Developing", color: s.runs > 5000 ? "text-cricket-amber" : "text-muted-foreground" },
                                                { label: "Consistency", value: s.average > 50 ? "Exceptional" : s.average > 35 ? "Good" : "Moderate", color: s.average > 50 ? "text-cricket-lime" : "text-muted-foreground" },
                                                { label: "Century Rate", value: s.innings > 0 ? `${((s.hundreds / s.innings) * 100).toFixed(1)}%` : "0%", color: "text-foreground" },
                                                { label: "Bowling Threat", value: s.wickets > 100 ? "Lethal" : s.wickets > 30 ? "Handy" : "Part-time", color: s.wickets > 100 ? "text-live" : "text-muted-foreground" },
                                            ].map(({ label, value, color }) => (
                                                <div key={label} className="text-center p-4 rounded-xl bg-muted/50">
                                                    <p className={`text-lg font-bold ${color}`}>{value}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        );
                    })}
                </Tabs>
            ) : (
                <Card className="p-12 text-center">
                    <p className="text-muted-foreground">Detailed statistics not available for this player</p>
                </Card>
            )}

            {/* AI Insight */}
            <Card className="bg-gradient-to-r from-cricket-amber/5 to-cricket-green/5 border-cricket-amber/20">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-cricket-amber" /> AI Player Insight
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm leading-relaxed">
                        {player.role === "BATSMAN" || player.role === "WICKET_KEEPER"
                            ? `${player.name} is one of the premier batsmen in world cricket. Known for ${player.battingStyle === "Right-hand bat" ? "elegant right-handed stroke play" : "explosive left-handed batting"}, ${player.shortName} has been a consistent performer across formats. Their ability to anchor innings while maintaining scoring rate makes them invaluable in high-pressure situations.`
                            : player.role === "BOWLER"
                                ? `${player.name} is a world-class bowler who has consistently troubled the best batsmen. Their ${player.bowlingStyle} has been a potent weapon, particularly in conditions that offer movement. The ability to bowl crucial overs in pressure situations sets them apart.`
                                : `${player.name} is a genuine all-rounder who contributes significantly with both bat and ball. This dual capability provides tremendous balance to any team composition, making them one of the most valuable players in international cricket.`
                        }
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
