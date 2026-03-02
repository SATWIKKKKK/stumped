import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Profile
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Profile</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Display Name</Label>
                <Input defaultValue="Cricket Fan" />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input defaultValue="" type="email" placeholder="your@email.com" />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              {["Wicket alerts", "Milestone notifications", "Match start reminders", "Daily digest email"].map((item) => (
                <label key={item} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">{item}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-foreground" />
                </label>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-4">Favorite Formats</h3>
            <div className="flex gap-2">
              {["Test", "ODI", "T20I"].map((f) => (
                <Button key={f} variant="outline" size="sm">{f}</Button>
              ))}
            </div>
          </div>
          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}