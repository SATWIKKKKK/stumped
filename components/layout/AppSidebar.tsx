"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, Trophy, Users, Flag, BarChart3, Zap, MessageSquare,
    Star, Bell, Settings, ChevronLeft, ChevronRight, Radio, Bot,
    Newspaper, TrendingUp, Swords,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const mainNav = [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Live Matches", href: "/matches", icon: Radio, badge: "2 LIVE" },
    { title: "Players", href: "/players", icon: Users },
    { title: "Teams", href: "/teams", icon: Flag },
    { title: "Rankings", href: "/rankings", icon: Trophy },
    { title: "Stats Explorer", href: "/stats", icon: BarChart3 },
];

const engageNav = [
    { title: "AI Assistant", href: "/ai-assistant", icon: Bot },
    { title: "Predictions", href: "/predictions", icon: TrendingUp },
    { title: "Fantasy", href: "/fantasy", icon: Zap },
    { title: "Community", href: "/community", icon: MessageSquare },
    { title: "News", href: "/news", icon: Newspaper },
];

const userNav = [
    { title: "Alerts", href: "/profile/alerts", icon: Bell },
    { title: "Settings", href: "/profile/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const NavLink = ({ item }: { item: typeof mainNav[0] & { badge?: string } }) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        const link = (
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-primary/10 text-primary border border-primary/20",
                    !isActive && "text-muted-foreground",
                    collapsed && "justify-center px-2"
                )}
            >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                {!collapsed && (
                    <>
                        <span className="flex-1">{item.title}</span>
                        {"badge" in item && item.badge && (
                            <Badge variant="live" className="text-[10px] px-1.5 py-0">
                                {item.badge}
                            </Badge>
                        )}
                    </>
                )}
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
                    "flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 h-screen sticky top-0",
                    collapsed ? "w-[60px]" : "w-[260px]"
                )}
            >
                {/* Logo */}
                <div className={cn("flex items-center h-14 px-4 border-b border-sidebar-border", collapsed && "justify-center px-2")}>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cricket-amber to-cricket-gold flex items-center justify-center">
                            <Swords className="h-4 w-4 text-black" />
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

                    {/* Quick Series Card */}
                    {!collapsed && (
                        <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-cricket-amber/10 to-cricket-green/10 border border-cricket-amber/20">
                            <div className="flex items-center gap-2 mb-1">
                                <Star className="h-3.5 w-3.5 text-cricket-amber" />
                                <span className="text-xs font-semibold text-cricket-amber">Featured Series</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Border-Gavaskar Trophy 2025-26</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">IND vs AUS - 3rd Test LIVE</p>
                        </div>
                    )}
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
