export const dynamic = "force-dynamic"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Cricket } from "@/lib/cached-cricket"
import { EmptyState } from "@/components/common/EmptyState"
import type { RankingEntry } from "@/types/cricket"

const FORMATS = ["test", "odi", "t20"] as const
const TYPES = ["batsmen", "bowlers", "allrounders"] as const

async function RankingsList({
  format,
  type,
}: {
  format: (typeof FORMATS)[number]
  type: (typeof TYPES)[number]
}) {
  const res = await Cricket.getRankings(type, format)
  const entries: RankingEntry[] = res?.data ?? []

  if (entries.length === 0) {
    return <EmptyState icon="trophy" title="No rankings data" description="Rankings data is currently unavailable." />
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base capitalize">{format.toUpperCase()} {type}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {entries.slice(0, 20).map((entry) => (
            <div key={entry.rank} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors">
              <span className={`text-lg font-bold w-8 text-center tabular-nums ${Number(entry.rank) <= 3 ? "text-foreground" : "text-muted-foreground"}`}>
                {entry.rank}
              </span>
              <div className="h-9 w-9 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold">
                {entry.name?.charAt(0) ?? "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.country}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tabular-nums">{entry.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RankingSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3"><Skeleton className="h-5 w-32" /></CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-1"><Skeleton className="h-4 w-28" /><Skeleton className="h-3 w-16" /></div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string; type?: string }>
}) {
  const sp = await searchParams
  const format = FORMATS.includes(sp.format as (typeof FORMATS)[number]) ? (sp.format as (typeof FORMATS)[number]) : "test"
  const type = TYPES.includes(sp.type as (typeof TYPES)[number]) ? (sp.type as (typeof TYPES)[number]) : "batsmen"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ICC Rankings</h1>
        <p className="text-muted-foreground">Official ICC cricket rankings across all formats</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1 rounded-lg border p-1">
          {FORMATS.map((f) => (
            <Link
              key={f}
              href={`/rankings?format=${f}&type=${type}`}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${f === format ? "bg-foreground text-background" : "hover:bg-accent"}`}
            >
              {f.toUpperCase()}
            </Link>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg border p-1">
          {TYPES.map((t) => (
            <Link
              key={t}
              href={`/rankings?format=${format}&type=${t}`}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${t === type ? "bg-foreground text-background" : "hover:bg-accent"}`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      <Suspense key={`${format}-${type}`} fallback={<RankingSkeleton />}>
        <RankingsList format={format} type={type} />
      </Suspense>
    </div>
  )
}