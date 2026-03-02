import { EmptyState } from "@/components/common/EmptyState"

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Cricket discussions, hot takes, and analysis</p>
      </div>
      <EmptyState icon="users" title="Community coming soon" description="Share your cricket thoughts, discuss matches, and connect with other fans. Coming with auth integration." />
    </div>
  )
}