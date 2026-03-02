import { EmptyState } from "@/components/common/EmptyState"

export default function PredictionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Predictions</h1>
        <p className="text-muted-foreground">AI-powered match predictions and community voting</p>
      </div>
      <EmptyState icon="cricket" title="Predictions coming soon" description="AI-powered match predictions powered by machine learning models are under development." />
    </div>
  )
}