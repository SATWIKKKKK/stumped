"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Trophy, TrendingUp } from "lucide-react";
import { getTeamById, getPlayersByTeamId, matches } from "@/lib/data";

export default function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
    const { teamId } = use(params);
    const team = getTeamById(teamId);
    if (!team) return notFound();

    const squad = getPlayersByTeamId(teamId);
    const teamMatches = matches.filter(
        m => m.team1.id === teamId || m.team2.id === teamId
    );

    return (
        <div className="p-6 space-y-6">
            <Button variant="ghost" size="sm" asChild>
                <Link href="/teams"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Teams</Link>
            </Button>

            <Card className="overflow-hidden">
                <div className="h-2" style={{ background: `linear-gradient(90deg, ${team.color}, ${team.color}88)` }} />
                <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                        <div
                            className="h-20 w-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
                            style={{ backgroundColor: team.color + "20", color: team.color }}
                        >
                            {team.shortName}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{team.name}</h1>
                            <div className="flex items-center gap-3 mt-2">
                                {team.ranking && <Badge variant="default">ICC Rank #{team.ranking}</Badge>}
                                <Badge variant="outline">{squad.length} Players</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Squad */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-cricket-amber" /> Squad
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {squad.map((player) => (
                                <Link key={player.id} href={`/players/${player.id}`}>
                                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                            {player.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{player.name}</p>
                                            <p className="text-xs text-muted-foreground">{player.battingStyle}</p>
                                        </div>
                                        <Badge variant="outline" className="text-[10px]">
                                            {player.role.replace("_", " ")}
                                        </Badge>
                                    </div>
                                </Link>
                            ))}
                            {squad.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No squad data available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Matches */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-cricket-amber" /> Recent Matches
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {teamMatches.slice(0, 5).map((match) => (
                                <Link key={match.id} href={`/matches/${match.id}`}>
                                    <div className="p-3 rounded-lg hover:bg-accent transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {match.team1.shortName} vs {match.team2.shortName}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{match.matchNumber}</p>
                                            </div>
                                            <Badge variant={match.status === "LIVE" ? "live" : match.status === "COMPLETED" ? "secondary" : "format"}>
                                                {match.status}
                                            </Badge>
                                        </div>
                                        {match.result && (
                                            <p className="text-xs text-win mt-1">{match.result}</p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                            {teamMatches.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No match data available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
