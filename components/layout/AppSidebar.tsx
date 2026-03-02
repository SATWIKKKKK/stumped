"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, Trophy, Users, Flag, BarChart3, MessageSquare,
    Bell, Settings, ChevronLeft, ChevronRight, Radio, Bot,
    Newspaper, TrendingUp, Swords,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const mainNav = [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Live Matches", href: "/matches", icon: Radio },
    { title: "Players", href: "/players", icon: Users },
    { title: "Teams", href: "/teams", icon: Flag },
    { title: "Rankings", href: "/rankings", icon: Trophy },
    { title: "Stats Explorer", href: "/stats", icon: BarChart3 },
];

const engageNav = [
    { title: "AI Assistant", href: "/ai-assistant", icon: Bot },
    { title: "Predictions", href: "/predictions", icon: TrendingUp },
    { title: "Community", href: "/community", icon: MessageSquare },
    { title: "News", href: "/news", icon: Newspaper },
];

const userNav = [
    { title: "Alerts", href: "/profile", icon: Bell },
    { title: "Settings", href: "/profile/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const NavLink = ({ item }: { item: (typeof mainNav)[0] }) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        const link = (
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-foreground/10 text-foreground border border-foreground/20",
                    !isActive && "text-muted-foreground",
                    collapsed && "justify-center px-2"
                )}
            >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive && "text-foreground")} />
                {!collapsed && <span className="flex-1">{item.title}</span>}
            </Link>
        );

        if (collapsed) {
            return (
                <Tooltip>
                    <TooltipTrigger asChild>{link}</TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{item.title}</p>
                    </TooltipContent>
                </Tooltip>
            );
        }
        return link;
    };

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    "hidden lg:flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 h-screen sticky top-0",
                    collapsed ? "w-[60px]" : "w-[260px]"
                )}
            >
                {/* Logo */}
                <div className={cn("flex items-center h-14 px-4 border-b border-sidebar-border", collapsed && "justify-center px-2")}>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                            <Swords className="h-4 w-4 text-background" />
                        </div>
                        {!collapsed && (
                            <div>
                                <h1 className="text-lg font-bold tracking-tight">STUMPED</h1>
                                <p className="text-[10px] text-muted-foreground -mt-1">Cricket Intelligence</p>
                            </div>
                        )}
                    </Link>
                </div>

                <ScrollArea className="flex-1 px-3 py-4">
                    {/* Main Navigation */}
                    {!collapsed && (
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                            Cricket
                        </p>
                    )}
                    <nav className="space-y-1">
                        {mainNav.map((item) => (
                            <NavLink key={item.href} item={item} />
                        ))}
                    </nav>

                    <Separator className="my-4" />

                    {/* Engage */}
                    {!collapsed && (
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                            Engage
                        </p>
                    )}
                    <nav className="space-y-1">
                        {engageNav.map((item) => (
                            <NavLink key={item.href} item={item} />
                        ))}
                    </nav>

                    <Separator className="my-4" />

                    {/* User */}
                    {!collapsed && (
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                            Account
                        </p>
                    )}
                    <nav className="space-y-1">
                        {userNav.map((item) => (
                            <NavLink key={item.href} item={item} />
                        ))}
                    </nav>
                </ScrollArea>

                {/* Collapse Toggle */}
                <div className="border-t border-sidebar-border p-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-full justify-center"
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>
            </aside>
        </TooltipProvider>
    );
}
