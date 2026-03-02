export const dynamic = "force-dynamic"

import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Radio, Calendar, Trophy, ChevronRight, Bot,
} from "lucide-react";
import { Cricket } from "@/lib/cached-cricket";
import { LiveDot } from "@/components/common/LiveDot";
import { EmptyState } from "@/components/common/EmptyState";
import type { CricketMatch } from "@/types/cricket";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-8">
                <div className="relative z-10">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                        Welcome to STUMPED
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base">
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
            </div>

            {/* Live Matches */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <LiveDot />
                        <h2 className="text-lg sm:text-xl font-bold">Live Matches</h2>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/matches">View All <ChevronRight className="h-4 w-4 ml-1" /></Link>
                    </Button>
                </div>
                <Suspense fallback={<MatchGridSkeleton />}>
                    <LiveMatchesSection />
                </Suspense>
            </section>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickLinkCard title="Rankings" icon={Trophy} href="/rankings" description="ICC Rankings" />
                <QuickLinkCard title="Upcoming" icon={Calendar} href="/matches" description="Scheduled matches" />
                <QuickLinkCard title="AI Assistant" icon={Bot} href="/ai-assistant" description="Ask anything" />
                <QuickLinkCard title="Live Scores" icon={Radio} href="/matches" description="Ball by ball" />
            </div>
        </div>
    );
}

async function LiveMatchesSection() {
    let matches: CricketMatch[] = [];
    try {
        const data = await Cricket.getLiveMatches();
        matches = data?.data ?? [];
    } catch {
        // Silently handle — show empty state
    }

    if (!matches.length) {
        return <EmptyState title="No live matches" description="Check back soon for live cricket action." icon="cricket" />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {matches.slice(0, 6).map((match) => (
                <Link key={match.id} href={`/matches/${match.id}`}>
                    <Card className="hover:bg-accent/50 transition-all duration-200 cursor-pointer h-full">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-muted-foreground truncate">
                                    {match.name}
                                </CardTitle>
                                {match.matchStarted && !match.matchEnded && (
                                    <Badge variant="destructive" className="text-[10px] shrink-0">
                                        LIVE
                                    </Badge>
                                )}
                                {match.matchEnded && (
                                    <Badge variant="secondary" className="text-[10px] shrink-0">
                                        COMPLETED
                                    </Badge>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{match.venue}</p>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {match.score?.map((s, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <span className="text-sm font-medium truncate max-w-[60%]">{s.inning}</span>
                                    <span className="text-lg font-bold tabular-nums">
                                        {s.r}/{s.w} <span className="text-xs text-muted-foreground">({s.o} ov)</span>
                                    </span>
                                </div>
                            ))}
                            {(!match.score || match.score.length === 0) && (
                                <p className="text-sm text-muted-foreground">Yet to start</p>
                            )}
                            <p className="text-xs text-muted-foreground pt-1">{match.status}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

function QuickLinkCard({ title, icon: Icon, href, description }: {
    title: string; icon: React.ElementType; href: string; description: string;
}) {
    return (
        <Link href={href}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </Link>
    );
}

function MatchGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="pb-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-3 w-1/3" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
