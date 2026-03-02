import { EmptyState } from "@/components/common/EmptyState"

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cricket News</h1>
        <p className="text-muted-foreground">Latest cricket updates powered by AI curation</p>
      </div>
      <EmptyState icon="cricket" title="News feed coming soon" description="AI-curated cricket news from multiple sources will be available with the RSS integration." />
    </div>
  )
}