export const dynamic = "force-dynamic"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cricket } from "@/lib/cached-cricket"
import { EmptyState } from "@/components/common/EmptyState"
import type { CricketPlayer, PlayerStatsByType } from "@/types/cricket"

async function PlayerDetail({ playerId }: { playerId: string }) {
  const res = await Cricket.getPlayer(playerId)
  const player: CricketPlayer | null = res?.data ?? null

  if (!player) {
    return <EmptyState icon="cricket" title="Player not found" description="This player could not be loaded from CricketData." />
  }

  const formats = player.stats?.filter((s: PlayerStatsByType) => s.fn) ?? []

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {player.playerImg ? (
              <img src={player.playerImg} alt={player.name} className="h-24 w-24 rounded-2xl object-cover shrink-0" />
            ) : (
              <div className="h-24 w-24 rounded-2xl bg-foreground/10 flex items-center justify-center text-3xl font-bold shrink-0">
                {player.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold">{player.name}</h1>
              <p className="text-lg text-muted-foreground">{player.country}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {player.role && <Badge variant="default">{player.role}</Badge>}
                {player.battingStyle && <Badge variant="outline">{player.battingStyle}</Badge>}
                {player.bowlingStyle && <Badge variant="outline">{player.bowlingStyle}</Badge>}
              </div>
              {player.dateOfBirth && (
                <p className="text-sm text-muted-foreground mt-3">
                  Born: {new Date(player.dateOfBirth).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              )}
              {player.placeOfBirth && (
                <p className="text-sm text-muted-foreground">{player.placeOfBirth}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {formats.length > 0 ? (
        <Tabs defaultValue={formats[0].fn} className="space-y-4">
          <TabsList>
            {formats.map((f: PlayerStatsByType) => (
              <TabsTrigger key={f.fn} value={f.fn} className="uppercase">{f.fn}</TabsTrigger>
            ))}
          </TabsList>
          {formats.map((f: PlayerStatsByType) => (
            <TabsContent key={f.fn} value={f.fn}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Batting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {[
                        ["Matches", f.stat.m],
                        ["Innings", f.stat.inn],
                        ["Runs", f.stat.runs],
                        ["Average", f.stat.avg],
                        ["Strike Rate", f.stat.sr],
                        ["Highest", f.stat.hs],
                        ["100s", f.stat["100s"]],
                        ["50s", f.stat["50s"]],
                        ["4s", f.stat["4s"]],
                        ["6s", f.stat["6s"]],
                        ["Catches", f.stat.ct],
                      ].filter(([, v]) => v !== undefined).map(([label, value]) => (
                        <div key={label as string} className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="text-sm font-bold tabular-nums">{value ?? "-"}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Bowling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {[
                        ["Wickets", f.stat.wkts],
                        ["Economy", f.stat.econ],
                        ["Best Innings", f.stat.bbi],
                        ["Best Match", f.stat.bbm],
                        ["5w Hauls", f.stat["5w"]],
                        ["10w Hauls", f.stat["10w"]],
                        ["Stumpings", f.stat.st],
                      ].filter(([, v]) => v !== undefined).map(([label, value]) => (
                        <div key={label as string} className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="text-sm font-bold tabular-nums">{value ?? "-"}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Detailed statistics not available for this player</p>
        </Card>
      )}
    </div>
  )
}

function PlayerSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <Skeleton className="h-24 w-24 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-24" />
              <div className="flex gap-2"><Skeleton className="h-6 w-20" /><Skeleton className="h-6 w-28" /></div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card><CardContent className="p-6"><Skeleton className="h-48 w-full" /></CardContent></Card>
        <Card><CardContent className="p-6"><Skeleton className="h-48 w-full" /></CardContent></Card>
      </div>
    </div>
  )
}

export default async function PlayerDetailPage(props: {
  params: Promise<{ playerId: string }>
}) {
  const { playerId } = await props.params

  return (
    <div className="space-y-6">
      <Link href="/players" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Players
      </Link>
      <Suspense fallback={<PlayerSkeleton />}>
        <PlayerDetail playerId={playerId} />
      </Suspense>
    </div>
  )
}