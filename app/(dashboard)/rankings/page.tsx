"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { getRankingsByFormatAndCategory } from "@/lib/data";
import Link from "next/link";

export default function RankingsPage() {
    const [format, setFormat] = useState("TEST");

    const battingRankings = getRankingsByFormatAndCategory(format, "batting");
    const bowlingRankings = getRankingsByFormatAndCategory(format, "bowling");
    const teamRankings = getRankingsByFormatAndCategory(format, "team");

    const RankingChange = ({ current, previous }: { current: number; previous: number }) => {
        if (current < previous) return <span className="text-win flex items-center gap-0.5 text-xs"><ArrowUpRight className="h-3 w-3" />{previous - current}</span>;
        if (current > previous) return <span className="text-loss flex items-center gap-0.5 text-xs"><ArrowDownRight className="h-3 w-3" />{current - previous}</span>;
        return <span className="text-muted-foreground text-xs"><Minus className="h-3 w-3" /></span>;
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-cricket-amber" /> ICC Rankings
                </h1>
                <p className="text-muted-foreground">Official ICC cricket rankings across all formats</p>
            </div>

            <Tabs value={format} onValueChange={setFormat}>
                <TabsList className="grid w-full max-w-xs grid-cols-3">
                    <TabsTrigger value="TEST">Test</TabsTrigger>
                    <TabsTrigger value="ODI">ODI</TabsTrigger>
                    <TabsTrigger value="T20I">T20I</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Batting Rankings */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base text-cricket-amber">Batting Rankings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {battingRankings.map((r) => (
                                <Link key={r.rank} href={r.player ? `/players/${r.player.id}` : "#"}>
                                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors">
                                        <span className={`text-lg font-bold w-8 text-center ${r.rank <= 3 ? "text-cricket-amber" : "text-muted-foreground"}`}>
                                            {r.rank}
                                        </span>
                                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                            {r.player?.shortName?.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{r.player?.name}</p>
                                            <p className="text-xs text-muted-foreground">{r.player?.country}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{r.rating}</p>
                                            <RankingChange current={r.rank} previous={r.previousRank} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {battingRankings.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No data available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Bowling Rankings */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base text-cricket-lime">Bowling Rankings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {bowlingRankings.map((r) => (
                                <Link key={r.rank} href={r.player ? `/players/${r.player.id}` : "#"}>
                                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors">
                                        <span className={`text-lg font-bold w-8 text-center ${r.rank <= 3 ? "text-cricket-lime" : "text-muted-foreground"}`}>
                                            {r.rank}
                                        </span>
                                        <div className="h-9 w-9 rounded-full bg-cricket-green/20 flex items-center justify-center text-xs font-bold text-cricket-lime">
                                            {r.player?.shortName?.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{r.player?.name}</p>
                                            <p className="text-xs text-muted-foreground">{r.player?.country}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{r.rating}</p>
                                            <RankingChange current={r.rank} previous={r.previousRank} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {bowlingRankings.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No data available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Team Rankings */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Team Rankings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {teamRankings.map((r) => (
                                <Link key={r.rank} href={r.team ? `/teams/${r.team.id}` : "#"}>
                                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors">
                                        <span className={`text-lg font-bold w-8 text-center ${r.rank <= 3 ? "text-cricket-amber" : "text-muted-foreground"}`}>
                                            {r.rank}
                                        </span>
                                        <div
                                            className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ backgroundColor: (r.team?.color || "#333") + "20", color: r.team?.color }}
                                        >
                                            {r.team?.shortName}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{r.team?.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{r.rating}</p>
                                            <RankingChange current={r.rank} previous={r.previousRank} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {teamRankings.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No data available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
