export const dynamic = "force-dynamic"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Cricket } from "@/lib/cached-cricket"
import { EmptyState } from "@/components/common/EmptyState"
import type { CricketPlayer } from "@/types/cricket"

async function PlayerResults({ query }: { query: string }) {
  const res = await Cricket.searchPlayers(query)
  const players: CricketPlayer[] = res?.data ?? []

  if (players.length === 0) {
    return <EmptyState icon="search" title="No players found" description={`No results for "${query}". Try a different name.`} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {players.map((player) => (
        <Link key={player.id} href={`/players/${player.id}`}>
          <Card className="hover:border-foreground/20 transition-all cursor-pointer group h-full">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {player.playerImg ? (
                  <img src={player.playerImg} alt={player.name} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-foreground/10 flex items-center justify-center text-lg font-bold shrink-0">
                    {player.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate group-hover:underline">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.country}</p>
                  {player.role && (
                    <Badge variant="outline" className="text-[10px] mt-1">
                      {player.role}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <Skeleton className="h-14 w-14 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Players</h1>
        <p className="text-muted-foreground">Search international cricket players</p>
      </div>

      <form className="max-w-md">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            name="q"
            type="text"
            defaultValue={q ?? ""}
            placeholder="Search by player name..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
      </form>

      {q ? (
        <Suspense fallback={<ResultsSkeleton />}>
          <PlayerResults query={q} />
        </Suspense>
      ) : (
        <EmptyState icon="search" title="Search for players" description="Enter a player name above to search the CricketData database." />
      )}
    </div>
  )
}