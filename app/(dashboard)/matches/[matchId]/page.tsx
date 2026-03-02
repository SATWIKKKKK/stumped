export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Cricket } from "@/lib/cached-cricket"
import { EmptyState } from "@/components/common/EmptyState"
import type { CricketMatch } from "@/types/cricket"

export default async function MatchDetailPage(props: {
  params: Promise<{ matchId: string }>
}) {
  const { matchId } = await props.params
  return (
    <div className="space-y-6">
      <Suspense fallback={<MatchDetailSkeleton />}>
        <MatchDetail matchId={matchId} />
      </Suspense>
    </div>
  )
}

async function MatchDetail({ matchId }: { matchId: string }) {
  let match: CricketMatch | null = null
  try {
    const data = await Cricket.getMatchInfo(matchId)
    match = data?.data ?? null
  } catch {
    // empty
  }
  if (!match) {
    return <EmptyState title="Match not found" description="This match could not be loaded." icon="cricket" />
  }
  const isLive = match.matchStarted && !match.matchEnded
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg sm:text-xl">{match.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{match.venue}</p>
            </div>
            {isLive && <Badge variant="live">LIVE</Badge>}
            {match.matchEnded && <Badge variant="secondary">COMPLETED</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {match.score?.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="font-medium">{s.inning}</span>
              <span className="text-2xl font-bold tabular-nums">{s.r}/{s.w} <span className="text-sm text-muted-foreground ml-2">({s.o} ov)</span></span>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">{match.status}</p>
        </CardContent>
      </Card>
      <Suspense fallback={<ScorecardSkeleton />}>
        <ScorecardSection matchId={matchId} />
      </Suspense>
    </div>
  )
}

async function ScorecardSection({ matchId }: { matchId: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let scorecard: any = null
  try {
    const data = await Cricket.getScorecard(matchId)
    scorecard = data?.data
  } catch {
    // empty
  }
  if (!scorecard?.scorecard?.length) {
    return <Card><CardContent className="py-8"><p className="text-center text-muted-foreground">Scorecard not available yet.</p></CardContent></Card>
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <div className="space-y-6">{scorecard.scorecard.map((inn: any, idx: number) => (
    <Card key={idx}>
      <CardHeader>
        <CardTitle className="text-base">{inn.inning}</CardTitle>
        {inn.totals && <p className="text-sm text-muted-foreground">{inn.totals.R}/{inn.totals.W} ({inn.totals.O} ov) RR: {inn.totals.RR}</p>}
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto rounded-lg border mb-4">
          <table className="min-w-125 w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="text-left p-2 font-medium">Batter</th>
              <th className="text-left p-2 font-medium">Dismissal</th>
              <th className="text-right p-2 font-medium">R</th>
              <th className="text-right p-2 font-medium">B</th>
              <th className="text-right p-2 font-medium">4s</th>
              <th className="text-right p-2 font-medium">6s</th>
              <th className="text-right p-2 font-medium">SR</th>
            </tr></thead>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <tbody>{inn.batting?.map((b: any, i: number) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2 font-medium">{b.batsman}</td>
                <td className="p-2 text-muted-foreground text-xs truncate max-w-50">{b.dismissal}</td>
                <td className="p-2 text-right font-bold">{b.r}</td>
                <td className="p-2 text-right">{b.b}</td>
                <td className="p-2 text-right">{b["4s"]}</td>
                <td className="p-2 text-right">{b["6s"]}</td>
                <td className="p-2 text-right">{b.sr}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="w-full overflow-x-auto rounded-lg border">
          <table className="min-w-100 w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="text-left p-2 font-medium">Bowler</th>
              <th className="text-right p-2 font-medium">O</th>
              <th className="text-right p-2 font-medium">M</th>
              <th className="text-right p-2 font-medium">R</th>
              <th className="text-right p-2 font-medium">W</th>
              <th className="text-right p-2 font-medium">ECO</th>
            </tr></thead>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <tbody>{inn.bowling?.map((bow: any, i: number) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2 font-medium">{bow.bowler}</td>
                <td className="p-2 text-right">{bow.o}</td>
                <td className="p-2 text-right">{bow.m}</td>
                <td className="p-2 text-right">{bow.r}</td>
                <td className="p-2 text-right font-bold">{bow.w}</td>
                <td className="p-2 text-right">{bow.eco}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  ))}</div>
}

function MatchDetailSkeleton() {
  return <div className="space-y-6"><Card><CardHeader><Skeleton className="h-6 w-2/3" /><Skeleton className="h-4 w-1/2 mt-2" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></CardContent></Card></div>
}

function ScorecardSkeleton() {
  return <Card><CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader><CardContent className="space-y-2">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</CardContent></Card>
}