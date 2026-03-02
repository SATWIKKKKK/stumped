"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Radio, Users, Trophy, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/matches", icon: Radio, label: "Matches" },
  { href: "/players", icon: Users, label: "Players" },
  { href: "/", icon: Home, label: "Home" },
  { href: "/fantasy", icon: Trophy, label: "Fantasy" },
  { href: "/ai-assistant", icon: Bot, label: "AI" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 flex lg:hidden bg-background border-t border-border">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
