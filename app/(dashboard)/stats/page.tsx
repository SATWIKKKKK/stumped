import { EmptyState } from "@/components/common/EmptyState"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stats Explorer</h1>
        <p className="text-muted-foreground">Advanced statistics with custom filters and sorting</p>
      </div>
      <EmptyState icon="cricket" title="Stats Explorer coming soon" description="Advanced filtering and sorting across player statistics will be available with the full data integration." />
    </div>
  )
}