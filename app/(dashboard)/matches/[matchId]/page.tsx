"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    MapPin, Clock, ArrowLeft, TrendingUp, BarChart3, MessageSquare,
    Zap, Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMatchById, getCommentaryForMatch, predictions } from "@/lib/data";

export default function MatchDetailPage({ params }: { params: Promise<{ matchId: string }> }) {
    const { matchId } = use(params);
    const match = getMatchById(matchId);
    if (!match) return notFound();

    const commentaryData = getCommentaryForMatch(matchId);
    const prediction = predictions[matchId];

    return (
        <div className="p-6 space-y-6">
            {/* Back + Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/matches"><ArrowLeft className="h-4 w-4" /></Link>
                </Button>
                <div>
                    <h1 className="text-xl font-bold">{match.team1.shortName} vs {match.team2.shortName}</h1>
                    <p className="text-sm text-muted-foreground">{match.seriesName} - {match.matchNumber}</p>
                </div>
                <Badge variant={match.status === "LIVE" ? "live" : "secondary"} className="ml-auto">
                    {match.status}
                </Badge>
            </div>

            {/* Score Header */}
            <Card className="overflow-hidden">
                {match.status === "LIVE" && (
                    <div className="h-1 bg-gradient-to-r from-live via-cricket-amber to-cricket-lime" />
                )}
                <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {match.innings.map((inn, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-lg text-primary">
                                    {inn.battingTeam.slice(0, 3).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold">{inn.battingTeam}</p>
                                    <p className="text-3xl font-bold tabular-nums">
                                        {inn.runs}<span className="text-lg text-muted-foreground">/{inn.wickets}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        ({inn.overs}.{inn.balls} ov) RR: {inn.runRate}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {match.venue}, {match.city}</span>
                        {match.toss && (
                            <span>Toss: {match.toss.winner} elected to {match.toss.decision}</span>
                        )}
                    </div>
                    {match.result && (
                        <p className="text-sm font-semibold text-win mt-3">{match.result}</p>
                    )}
                </CardContent>
            </Card>

            {/* Tabs: Scorecard | Commentary | Analysis */}
            <Tabs defaultValue="scorecard" className="space-y-4">
                <TabsList className="grid w-full max-w-lg grid-cols-3">
                    <TabsTrigger value="scorecard" className="gap-1"><BarChart3 className="h-3.5 w-3.5" /> Scorecard</TabsTrigger>
                    <TabsTrigger value="commentary" className="gap-1"><MessageSquare className="h-3.5 w-3.5" /> Commentary</TabsTrigger>
                    <TabsTrigger value="analysis" className="gap-1"><TrendingUp className="h-3.5 w-3.5" /> Analysis</TabsTrigger>
                </TabsList>

                {/* SCORECARD */}
                <TabsContent value="scorecard" className="space-y-6">
                    {match.innings.map((inn, innIdx) => (
                        <Card key={innIdx}>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center justify-between">
                                    <span>{inn.battingTeam} - {inn.runs}/{inn.wickets} ({inn.overs}.{inn.balls} ov)</span>
                                    <Badge variant={inn.status === "IN_PROGRESS" ? "live" : "secondary"}>
                                        {inn.status === "IN_PROGRESS" ? "Batting" : inn.status.replace("_", " ")}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Batting */}
                                {inn.batsmen.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Batting</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b text-xs text-muted-foreground">
                                                        <th className="text-left py-2 pr-4">Batter</th>
                                                        <th className="text-right px-2">R</th>
                                                        <th className="text-right px-2">B</th>
                                                        <th className="text-right px-2">4s</th>
                                                        <th className="text-right px-2">6s</th>
                                                        <th className="text-right px-2">SR</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inn.batsmen.map((bat) => (
                                                        <tr key={bat.playerId} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                                                            <td className="py-2.5 pr-4">
                                                                <div className="flex items-center gap-2">
                                                                    {bat.isOnStrike && <div className="h-1.5 w-1.5 rounded-full bg-cricket-amber" />}
                                                                    <Link href={`/players/${bat.playerId}`} className="font-medium hover:text-primary transition-colors">
                                                                        {bat.name}
                                                                    </Link>
                                                                    {bat.isNotOut && <Badge variant="format" className="text-[9px] px-1 py-0">NOT OUT</Badge>}
                                                                </div>
                                                                <p className="text-xs text-muted-foreground">{bat.dismissal || ""}</p>
                                                            </td>
                                                            <td className="text-right px-2 font-bold tabular-nums">{bat.runs}</td>
                                                            <td className="text-right px-2 tabular-nums text-muted-foreground">{bat.balls}</td>
                                                            <td className="text-right px-2 tabular-nums">{bat.fours}</td>
                                                            <td className="text-right px-2 tabular-nums">{bat.sixes}</td>
                                                            <td className="text-right px-2 tabular-nums">{bat.strikeRate.toFixed(1)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Bowling */}
                                {inn.bowlers.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Bowling</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b text-xs text-muted-foreground">
                                                        <th className="text-left py-2 pr-4">Bowler</th>
                                                        <th className="text-right px-2">O</th>
                                                        <th className="text-right px-2">M</th>
                                                        <th className="text-right px-2">R</th>
                                                        <th className="text-right px-2">W</th>
                                                        <th className="text-right px-2">Econ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {inn.bowlers.map((bowl) => (
                                                        <tr key={bowl.playerId} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                                                            <td className="py-2.5 pr-4">
                                                                <Link href={`/players/${bowl.playerId}`} className="font-medium hover:text-primary transition-colors">
                                                                    {bowl.name}
                                                                </Link>
                                                            </td>
                                                            <td className="text-right px-2 tabular-nums">{bowl.overs}</td>
                                                            <td className="text-right px-2 tabular-nums text-muted-foreground">{bowl.maidens}</td>
                                                            <td className="text-right px-2 tabular-nums">{bowl.runs}</td>
                                                            <td className="text-right px-2 font-bold tabular-nums">{bowl.wickets}</td>
                                                            <td className="text-right px-2 tabular-nums">{bowl.economy.toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Fall of Wickets */}
                                {inn.fallOfWickets.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Fall of Wickets</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {inn.fallOfWickets.map((fow) => (
                                                <div key={fow.wicketNumber} className="px-3 py-1.5 rounded-lg bg-muted text-xs">
                                                    <span className="font-bold">{fow.runs}/{fow.wicketNumber}</span>
                                                    <span className="text-muted-foreground ml-1">({fow.overs} ov) {fow.playerName}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Over Summary */}
                                {inn.overHistory.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Recent Overs</h3>
                                        <div className="space-y-2">
                                            {inn.overHistory.map((over) => (
                                                <div key={over.overNumber} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                                                    <span className="text-xs font-bold text-muted-foreground w-12">Ov {over.overNumber}</span>
                                                    <span className="text-xs text-muted-foreground w-24 truncate">{over.bowler}</span>
                                                    <div className="flex gap-1.5 flex-1">
                                                        {over.deliveries.map((d, di) => (
                                                            <div
                                                                key={di}
                                                                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${d === "W" ? "bg-live/20 text-live" :
                                                                        d === "4" ? "bg-cricket-amber/20 text-cricket-amber" :
                                                                            d === "6" ? "bg-cricket-lime/20 text-cricket-lime" :
                                                                                d === "0" ? "bg-muted text-muted-foreground" :
                                                                                    "bg-foreground/10 text-foreground"
                                                                    }`}
                                                            >
                                                                {d}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-bold">{over.runs} runs</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* COMMENTARY */}
                <TabsContent value="commentary">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Ball-by-Ball Commentary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {commentaryData.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-8">Commentary not available for this match</p>
                            ) : (
                                <ScrollArea className="h-[600px]">
                                    <div className="space-y-1">
                                        {commentaryData.map((ball, idx) => (
                                            <div key={idx} className={`p-3 rounded-lg transition-colors ${ball.isWicket ? "bg-live/10 border border-live/20" : "hover:bg-muted/50"}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${ball.isWicket ? "bg-live/20 text-live" :
                                                            ball.runs === 4 ? "bg-cricket-amber/20 text-cricket-amber" :
                                                                ball.runs === 6 ? "bg-cricket-lime/20 text-cricket-lime" :
                                                                    "bg-muted text-muted-foreground"
                                                        }`}>
                                                        {ball.isWicket ? "W" : ball.runs}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-muted-foreground">
                                                            {ball.overNumber}.{ball.ballNumber} - {ball.bowler} to {ball.batsman}
                                                        </p>
                                                        <p className="text-sm mt-0.5">{ball.commentary}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ANALYSIS */}
                <TabsContent value="analysis" className="space-y-4">
                    {prediction ? (
                        <>
                            {/* Win Probability */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Target className="h-4 w-4 text-cricket-amber" /> Win Probability
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="font-medium">{match.team1.name}</span>
                                                <span className="font-bold text-primary">{prediction.team1Probability}%</span>
                                            </div>
                                            <Progress value={prediction.team1Probability} className="h-3" />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="font-medium">{match.team2.name}</span>
                                                <span className="font-bold">{prediction.team2Probability}%</span>
                                            </div>
                                            <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary/40">
                                                <div
                                                    className="h-full bg-secondary-foreground/40 transition-all duration-500"
                                                    style={{ width: `${prediction.team2Probability}%` }}
                                                />
                                            </div>
                                        </div>
                                        {prediction.drawProbability > 0 && (
                                            <div>
                                                <div className="flex items-center justify-between text-sm mb-1">
                                                    <span className="font-medium">Draw</span>
                                                    <span className="font-bold text-muted-foreground">{prediction.drawProbability}%</span>
                                                </div>
                                                <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full bg-muted-foreground/30 transition-all duration-500"
                                                        style={{ width: `${prediction.drawProbability}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {prediction.predictedScore && (
                                        <p className="text-sm text-muted-foreground mt-4 p-3 rounded-lg bg-muted/50">
                                            <Zap className="h-3.5 w-3.5 text-cricket-amber inline mr-1" />
                                            {prediction.predictedScore}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Key Factors */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Key Factors</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {prediction.keyFactors.map((factor, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className="h-6 w-6 rounded-full bg-cricket-amber/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-[10px] font-bold text-cricket-amber">{idx + 1}</span>
                                                </div>
                                                <p className="text-sm">{factor}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Match Momentum */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Match Momentum</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-end gap-1 h-32">
                                        {prediction.momentum.map((value, idx) => (
                                            <div
                                                key={idx}
                                                className="flex-1 rounded-t transition-all duration-300"
                                                style={{
                                                    height: `${value}%`,
                                                    background: value > 50
                                                        ? `linear-gradient(to top, rgba(217, 119, 6, 0.3), rgba(217, 119, 6, ${value / 100}))`
                                                        : `linear-gradient(to top, rgba(132, 204, 22, 0.3), rgba(132, 204, 22, ${(100 - value) / 100}))`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                        <span>{match.team1.shortName}</span>
                                        <span>{match.team2.shortName}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <Card className="p-12 text-center">
                            <p className="text-muted-foreground">Analysis not available for this match</p>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
