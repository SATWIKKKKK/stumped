"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Zap, Trophy, Users } from "lucide-react";
import { getLiveMatches, predictions } from "@/lib/data";
import Link from "next/link";

export default function PredictionsPage() {
    const liveMatches = getLiveMatches();

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-cricket-amber" /> Predictions
                </h1>
                <p className="text-muted-foreground">AI-powered match predictions and community voting</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {liveMatches.map((match) => {
                    const pred = predictions[match.id];
                    if (!pred) return null;
                    return (
                        <Card key={match.id} className="overflow-hidden">
                            <div className="h-1 bg-gradient-to-r from-cricket-amber to-cricket-lime" />
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">
                                        {match.team1.shortName} vs {match.team2.shortName}
                                    </CardTitle>
                                    <Badge variant="live">LIVE</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{match.seriesName} - {match.matchNumber}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Win Probability */}
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{match.team1.name}</span>
                                            <span className="font-bold text-primary">{pred.team1Probability}%</span>
                                        </div>
                                        <Progress value={pred.team1Probability} className="h-2.5" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{match.team2.name}</span>
                                            <span className="font-bold">{pred.team2Probability}%</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-secondary/40 overflow-hidden">
                                            <div className="h-full bg-secondary-foreground/40 rounded-full" style={{ width: `${pred.team2Probability}%` }} />
                                        </div>
                                    </div>
                                    {pred.drawProbability > 0 && (
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Draw</span>
                                                <span className="font-bold text-muted-foreground">{pred.drawProbability}%</span>
                                            </div>
                                            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                                                <div className="h-full bg-muted-foreground/30 rounded-full" style={{ width: `${pred.drawProbability}%` }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground p-2 rounded-lg bg-muted/50">
                                    <Zap className="h-3 w-3 text-cricket-amber inline mr-1" />
                                    {pred.predictedScore}
                                </p>

                                {/* Community Vote */}
                                <div className="border-t pt-3">
                                    <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                                        <Users className="h-3 w-3" /> Community Prediction
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1 text-xs">{match.team1.shortName} - 52%</Button>
                                        {pred.drawProbability > 0 && <Button variant="outline" size="sm" className="text-xs">Draw</Button>}
                                        <Button variant="outline" size="sm" className="flex-1 text-xs">{match.team2.shortName} - 48%</Button>
                                    </div>
                                </div>

                                <Button variant="ghost" size="sm" className="w-full" asChild>
                                    <Link href={`/matches/${match.id}`}>View Full Analysis</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Prediction Leaderboard */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Trophy className="h-4 w-4 text-cricket-amber" /> Prediction Leaderboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[
                            { rank: 1, name: "PredictionGuru", accuracy: 78, total: 45 },
                            { rank: 2, name: "CricketOracle", accuracy: 75, total: 52 },
                            { rank: 3, name: "StatsNerd", accuracy: 73, total: 60 },
                            { rank: 4, name: "MatchPredictor", accuracy: 71, total: 38 },
                            { rank: 5, name: "CricketMind", accuracy: 69, total: 41 },
                        ].map((user) => (
                            <div key={user.rank} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                                <span className={`text-lg font-bold w-8 text-center ${user.rank <= 3 ? "text-cricket-amber" : "text-muted-foreground"}`}>
                                    #{user.rank}
                                </span>
                                <span className="flex-1 font-medium text-sm">{user.name}</span>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-cricket-lime">{user.accuracy}%</span>
                                    <span className="text-xs text-muted-foreground ml-2">({user.total} predictions)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
