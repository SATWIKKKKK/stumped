export const dynamic = "force-dynamic"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cricket } from "@/lib/cached-cricket"
import { LiveDot } from "@/components/common/LiveDot"
import { EmptyState } from "@/components/common/EmptyState"
import type { CricketMatch } from "@/types/cricket"

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Matches</h1>
      <Tabs defaultValue="current" className="w-full">
        <TabsList>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="all">All Matches</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="mt-4">
          <Suspense fallback={<MatchListSkeleton />}>
            <MatchList />
          </Suspense>
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <Suspense fallback={<MatchListSkeleton />}>
            <MatchList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

async function MatchList() {
  let matches: CricketMatch[] = []
  try {
    const data = await Cricket.getLiveMatches()
    matches = data?.data ?? []
  } catch {
    // Fall through to empty state
  }

  if (!matches.length) {
    return (
      <EmptyState
        title="No matches available"
        description="Check back soon for live cricket action."
        icon="cricket"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}

function MatchCard({ match }: { match: CricketMatch }) {
  const isLive = match.matchStarted && !match.matchEnded

  return (
    <Link href={"/matches/" + match.id}>
      <Card className="hover:bg-accent/50 transition-all duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground truncate">
              {match.name}
            </CardTitle>
            {isLive && (
              <div className="flex items-center gap-1.5 shrink-0">
                <LiveDot />
                <Badge variant="live" className="text-[10px]">LIVE</Badge>
              </div>
            )}
            {match.matchEnded && (
              <Badge variant="secondary" className="text-[10px] shrink-0">DONE</Badge>
            )}
            {!match.matchStarted && (
              <Badge variant="outline" className="text-[10px] shrink-0">UPCOMING</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {match.score?.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm font-medium truncate max-w-[55%]">{s.inning}</span>
              <span className="text-lg font-bold tabular-nums">
                {s.r}/{s.w}
                <span className="text-xs text-muted-foreground ml-1">({s.o} ov)</span>
              </span>
            </div>
          ))}
          {(!match.score || match.score.length === 0) && (
            <p className="text-sm text-muted-foreground">
              {match.matchStarted ? "In progress" : "Yet to start"}
            </p>
          )}
          <p className="text-xs text-muted-foreground pt-1 truncate">{match.status}</p>
          <p className="text-xs text-muted-foreground truncate">{match.venue}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function MatchListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
