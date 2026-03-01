"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Radio, Calendar, Trophy, Clock, MapPin } from "lucide-react";
import { getLiveMatches, getUpcomingMatches, getCompletedMatches, matches } from "@/lib/data";

function MatchCard({ match }: { match: typeof matches[0] }) {
    const lastInnings = match.innings[match.innings.length - 1];

    return (
        <Link href={`/matches/${match.id}`}>
            <Card className="hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group overflow-hidden">
                {match.status === "LIVE" && (
                    <div className="h-1 bg-gradient-to-r from-live via-cricket-amber to-cricket-lime" />
                )}
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{match.seriesName}</p>
                        <Badge variant={match.status === "LIVE" ? "live" : match.status === "COMPLETED" ? "secondary" : "format"}>
                            {match.status}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {match.venue}, {match.city}
                    </p>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary group-hover:scale-105 transition-transform">
                                {match.team1.shortName}
                            </div>
                            <div>
                                <p className="font-semibold">{match.team1.name}</p>
                                {match.innings.length > 0 && (
                                    <p className="text-lg font-bold tabular-nums">
                                        {match.innings[0].runs}/{match.innings[0].wickets}
                                        <span className="text-xs text-muted-foreground ml-1">
                                            ({match.innings[0].overs}.{match.innings[0].balls} ov)
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="text-center px-4">
                            <Badge variant="format" className="text-[10px]">{match.format}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{match.matchNumber}</p>
                        </div>
                        <div className="text-right flex items-center gap-3 flex-row-reverse">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary/80 to-secondary/40 flex items-center justify-center font-bold text-foreground group-hover:scale-105 transition-transform">
                                {match.team2.shortName}
                            </div>
                            <div>
                                <p className="font-semibold">{match.team2.name}</p>
                                {match.innings.length > 1 && (
                                    <p className="text-lg font-bold tabular-nums">
                                        {match.innings[1].runs}/{match.innings[1].wickets}
                                        <span className="text-xs text-muted-foreground ml-1">
                                            ({match.innings[1].overs}.{match.innings[1].balls} ov)
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    {match.result && (
                        <p className="text-sm text-win font-medium text-center">{match.result}</p>
                    )}
                    {match.status === "UPCOMING" && (
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(match.startDate).toLocaleString("en-US", {
                                weekday: "short", month: "short", day: "numeric",
                                hour: "2-digit", minute: "2-digit",
                            })}
                        </div>
                    )}
                    {match.toss && (
                        <p className="text-xs text-muted-foreground text-center">
                            Toss: {match.toss.winner} elected to {match.toss.decision}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}

export default function MatchesPage() {
    const liveMatches = getLiveMatches();
    const upcomingMatches = getUpcomingMatches();
    const completedMatches = getCompletedMatches();

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Matches</h1>
                <p className="text-muted-foreground">Live scores, upcoming fixtures, and recent results</p>
            </div>

            <Tabs defaultValue="live" className="space-y-4">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="live" className="gap-1.5">
                        <Radio className="h-3.5 w-3.5" /> Live ({liveMatches.length})
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> Upcoming ({upcomingMatches.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="gap-1.5">
                        <Trophy className="h-3.5 w-3.5" /> Recent ({completedMatches.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="live" className="space-y-4">
                    {liveMatches.length === 0 ? (
                        <Card className="p-12 text-center">
                            <p className="text-muted-foreground">No live matches at the moment</p>
                        </Card>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                        >
                            {liveMatches.map((match) => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </motion.div>
                    )}
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                    >
                        {upcomingMatches.map((match) => (
                            <MatchCard key={match.id} match={match} />
                        ))}
                    </motion.div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                    >
                        {completedMatches.map((match) => (
                            <MatchCard key={match.id} match={match} />
                        ))}
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
