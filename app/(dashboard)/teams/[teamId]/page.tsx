import Link from "next/link"
import { EmptyState } from "@/components/common/EmptyState"

export default async function TeamDetailPage(props: {
  params: Promise<{ teamId: string }>
}) {
  const _params = await props.params

  return (
    <div className="space-y-6">
      <Link href="/teams" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Teams
      </Link>
      <EmptyState icon="cricket" title="Team details coming soon" description="Detailed team pages with squad and match history will be available when the full API integration is complete." />
    </div>
  )
}