"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
    Radio, Calendar, Trophy, TrendingUp, ChevronRight, Zap, Bot,
    ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { getLiveMatches, getUpcomingMatches, getCompletedMatches, rankings, players, playerStats } from "@/lib/data";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
    const liveMatches = getLiveMatches();
    const upcomingMatches = getUpcomingMatches();
    const completedMatches = getCompletedMatches();

    const topBatsmen = rankings
        .filter(r => r.category === "batting" && r.format === "TEST")
        .slice(0, 5);

    const topBowlers = rankings
        .filter(r => r.category === "bowling" && r.format === "TEST")
        .slice(0, 5);

    return (
        <div className="p-6 space-y-8">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cricket-amber/20 via-cricket-green/10 to-background border border-cricket-amber/20 p-8">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome to <span className="text-gradient">STUMPED</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-xl">
                            Your cricket intelligence hub. Live scores, AI-powered insights, advanced analytics, and everything cricket.
                        </p>
                        <div className="flex gap-3 mt-5">
                            <Button asChild>
                                <Link href="/matches">
                                    <Radio className="h-4 w-4 mr-1" /> Live Matches
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/ai-assistant">
                                    <Bot className="h-4 w-4 mr-1" /> Ask AI
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cricket-amber/10 to-transparent rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-t from-cricket-lime/10 to-transparent rounded-full translate-y-1/2" />
                </div>
            </motion.div>

            {/* Live Matches */}
            {liveMatches.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-live live-pulse" />
                            <h2 className="text-xl font-bold">Live Matches</h2>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/matches">View All <ChevronRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </div>
                    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {liveMatches.map((match) => {
                            const currentInnings = match.innings[match.innings.length - 1];
                            return (
                                <motion.div key={match.id} variants={item}>
                                    <Link href={`/matches/${match.id}`}>
                                        <Card className="hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden">
                                            <div className="h-1 bg-gradient-to-r from-cricket-amber to-cricket-lime" />
                                            <CardHeader className="pb-3">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-sm font-medium text-muted-foreground">{match.seriesName}</CardTitle>
                                                    <Badge variant="live">LIVE</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{match.matchNumber} - {match.venue}</p>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                {match.innings.map((inn, idx) => (
                                                    <div key={idx} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-sm text-primary">
                                                                {match[idx === 0 ? "team1" : "team2"]?.shortName || inn.battingTeam.slice(0, 3).toUpperCase()}
                                                            </div>
                                                            <span className="font-medium">{inn.battingTeam}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold tabular-nums">
                                                                {inn.runs}/{inn.wickets}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                ({inn.overs}.{inn.balls} ov) RR: {inn.runRate}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {currentInnings && (
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
                                                        <Zap className="h-3 w-3 text-cricket-amber" />
                                                        {currentInnings.batsmen.filter(b => b.isNotOut).map(b => (
                                                            <span key={b.playerId}>{b.name}: {b.runs}({b.balls})</span>
                                                        )).reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, <span key={`sep-${i}`}> &bull; </span>, curr], [] as React.ReactNode[])}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>
            )}

            {/* Stats Overview Grid */}
            <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div variants={item}>
                    <Card className="hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Matches</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{liveMatches.length}</p>
                            <p className="text-xs text-cricket-lime flex items-center gap-1 mt-1">
                                <ArrowUpRight className="h-3 w-3" /> 2 starting today
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={item}>
                    <Card className="hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Top Scorer (Series)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">152</p>
                            <p className="text-xs text-muted-foreground">Travis Head - BGT 3rd Test</p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={item}>
                    <Card className="hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Best Bowling</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">4/68</p>
                            <p className="text-xs text-muted-foreground">Jasprit Bumrah - BGT 3rd Test</p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={item}>
                    <Card className="hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{upcomingMatches.length}</p>
                            <p className="text-xs text-muted-foreground">matches this week</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Rankings */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-cricket-amber" /> ICC Test Rankings
                            </CardTitle>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/rankings">View All <ChevronRight className="h-4 w-4 ml-1" /></Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Batting</h3>
                                <div className="space-y-3">
                                    {topBatsmen.map((r) => (
                                        <div key={r.rank} className="flex items-center gap-3">
                                            <span className="text-sm font-bold w-6 text-center text-muted-foreground">#{r.rank}</span>
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                {r.player?.shortName.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{r.player?.name}</p>
                                                <p className="text-xs text-muted-foreground">{r.player?.country}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{r.rating}</p>
                                                <p className={`text-[10px] flex items-center gap-0.5 ${r.rank <= r.previousRank ? "text-win" : "text-loss"}`}>
                                                    {r.rank < r.previousRank ? <ArrowUpRight className="h-2.5 w-2.5" /> : r.rank > r.previousRank ? <ArrowDownRight className="h-2.5 w-2.5" /> : null}
                                                    {r.rank !== r.previousRank ? Math.abs(r.rank - r.previousRank) : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Bowling</h3>
                                <div className="space-y-3">
                                    {topBowlers.map((r) => (
                                        <div key={r.rank} className="flex items-center gap-3">
                                            <span className="text-sm font-bold w-6 text-center text-muted-foreground">#{r.rank}</span>
                                            <div className="h-8 w-8 rounded-full bg-cricket-green/20 flex items-center justify-center text-xs font-bold text-cricket-lime">
                                                {r.player?.shortName.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{r.player?.name}</p>
                                                <p className="text-xs text-muted-foreground">{r.player?.country}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{r.rating}</p>
                                                <p className={`text-[10px] flex items-center gap-0.5 ${r.rank <= r.previousRank ? "text-win" : "text-loss"}`}>
                                                    {r.rank < r.previousRank ? <ArrowUpRight className="h-2.5 w-2.5" /> : r.rank > r.previousRank ? <ArrowDownRight className="h-2.5 w-2.5" /> : null}
                                                    {r.rank !== r.previousRank ? Math.abs(r.rank - r.previousRank) : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming + Recent */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Calendar className="h-4 w-4 text-cricket-amber" /> Upcoming
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingMatches.slice(0, 3).map((match) => (
                                <Link key={match.id} href={`/matches/${match.id}`} className="block">
                                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                                        <div>
                                            <p className="text-sm font-medium">
                                                {match.team1.shortName} vs {match.team2.shortName}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{match.matchNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="format" className="text-[10px]">{match.format}</Badge>
                                            <p className="text-[10px] text-muted-foreground mt-1">
                                                {new Date(match.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <TrendingUp className="h-4 w-4 text-cricket-amber" /> Recent Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {completedMatches.slice(0, 3).map((match) => (
                                <Link key={match.id} href={`/matches/${match.id}`} className="block">
                                    <div className="p-2 rounded-lg hover:bg-accent transition-colors">
                                        <p className="text-sm font-medium">
                                            {match.team1.shortName} vs {match.team2.shortName}
                                        </p>
                                        <p className="text-xs text-win mt-0.5">{match.result}</p>
                                        <p className="text-[10px] text-muted-foreground">{match.matchNumber}</p>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* AI Brief Card */}
            <Card className="bg-gradient-to-r from-cricket-amber/5 to-cricket-green/5 border-cricket-amber/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-cricket-amber" /> AI Daily Brief
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <p className="text-sm leading-relaxed">
                            <strong>Border-Gavaskar Trophy, 3rd Test - Day 3 Update:</strong> Australia posted 312 all out in their first innings, powered by Travis Head&apos;s magnificent 152 off 148 balls. However, Jasprit Bumrah&apos;s 4/68 kept India in the contest. India ended Day 2 at 198/4 with Shubman Gill (78*) and Rishabh Pant (28*) at the crease, trailing by 114 runs.
                        </p>
                        <p className="text-sm leading-relaxed">
                            <strong>Key Insight:</strong> The Gill-Pant partnership is crucial. If they can add 100+ runs, India will be in a commanding position. Historically, India have chased down totals at MCG with a success rate of 67% when they&apos;ve had 6+ wickets in hand past the 200-run mark.
                        </p>
                        <Separator />
                        <p className="text-sm leading-relaxed">
                            <strong>Champions Trophy SF1:</strong> Joe Root anchored England&apos;s innings with a sublime 118 as they posted 287/8. Pakistan&apos;s chase is underway with Babar Azam looking solid on 72*. Required rate: 6.09 RPO.
                        </p>
                    </div>
                    <Button className="mt-4" variant="outline" size="sm" asChild>
                        <Link href="/ai-assistant">Chat with AI Assistant <ChevronRight className="h-4 w-4 ml-1" /></Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
