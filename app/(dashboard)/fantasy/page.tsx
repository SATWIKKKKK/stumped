import { EmptyState } from "@/components/common/EmptyState"

export default function FantasyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fantasy Cricket</h1>
        <p className="text-muted-foreground">Build your dream team and compete in contests</p>
      </div>
      <EmptyState icon="users" title="Fantasy Cricket coming soon" description="Create your dream XI, compete in contests, and climb the leaderboard. Coming in the next update." />
    </div>
  )
}