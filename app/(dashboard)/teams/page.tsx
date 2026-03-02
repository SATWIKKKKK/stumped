export const dynamic = "force-dynamic"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Cricket } from "@/lib/cached-cricket"
import { EmptyState } from "@/components/common/EmptyState"
import type { CricketMatch } from "@/types/cricket"

async function TeamsFromMatches() {
  const res = await Cricket.getLiveMatches()
  const matches: CricketMatch[] = res?.data ?? []

  const teamMap = new Map<string, { name: string; shortname: string; img: string }>()
  for (const match of matches) {
    if (match.teamInfo) {
      for (const t of match.teamInfo) {
        if (!teamMap.has(t.shortname)) {
          teamMap.set(t.shortname, t)
        }
      }
    }
  }

  const teams = Array.from(teamMap.values())

  if (teams.length === 0) {
    return <EmptyState icon="cricket" title="No teams available" description="Team data is populated from live and recent matches." />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {teams.map((team) => (
        <Card key={team.shortname} className="hover:border-foreground/20 transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {team.img ? (
                <img src={team.img} alt={team.name} className="h-12 w-12 rounded-xl object-contain shrink-0" />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-foreground/10 flex items-center justify-center text-sm font-bold shrink-0">
                  {team.shortname}
                </div>
              )}
              <div>
                <h3 className="font-semibold group-hover:underline">{team.name}</h3>
                <p className="text-sm text-muted-foreground">{team.shortname}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TeamsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}><CardContent className="p-6"><div className="flex items-center gap-4"><Skeleton className="h-12 w-12 rounded-xl" /><div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-12" /></div></div></CardContent></Card>
      ))}
    </div>
  )
}

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
        <p className="text-muted-foreground">Teams from current and recent matches</p>
      </div>
      <Suspense fallback={<TeamsSkeleton />}>
        <TeamsFromMatches />
      </Suspense>
    </div>
  )
}