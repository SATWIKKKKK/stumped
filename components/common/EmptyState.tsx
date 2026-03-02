import { CircleOff, Search, Trophy, Radio, Users } from "lucide-react"

const icons = {
  cricket: Radio,
  search: Search,
  trophy: Trophy,
  users: Users,
  default: CircleOff,
} as const

interface EmptyStateProps {
  title: string
  description?: string
  icon?: keyof typeof icons
}

export function EmptyState({ title, description, icon = "default" }: EmptyStateProps) {
  const Icon = icons[icon]
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center px-4">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
        )}
      </div>
    </div>
  )
}
