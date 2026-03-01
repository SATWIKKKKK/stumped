"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Moon, Sun, Bell, User, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { searchAll } from "@/lib/data";
import {
    Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function TopNav() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [commandOpen, setCommandOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen(true);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const results = searchQuery.length > 1 ? searchAll(searchQuery) : { players: [], teams: [], matches: [] };

    const handleSelect = useCallback((type: string, id: string) => {
        setCommandOpen(false);
        setSearchQuery("");
        if (type === "player") router.push(`/players/${id}`);
        else if (type === "team") router.push(`/teams/${id}`);
        else if (type === "match") router.push(`/matches/${id}`);
    }, [router]);

    return (
        <>
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
                {/* Search */}
                <Button
                    variant="outline"
                    className="relative w-full max-w-sm justify-start text-muted-foreground gap-2"
                    onClick={() => setCommandOpen(true)}
                >
                    <Search className="h-4 w-4" />
                    <span className="text-sm">Search players, teams, matches...</span>
                    <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <Command className="h-3 w-3" />K
                    </kbd>
                </Button>

                <div className="flex-1" />

                {/* Live Scores Mini Bar */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg glass">
                    <Badge variant="live" className="text-[10px]">LIVE</Badge>
                    <span className="text-xs font-medium">IND 198/4</span>
                    <span className="text-[10px] text-muted-foreground">vs AUS | MCG</span>
                </div>

                {/* Theme Toggle */}
                {mounted && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                )}

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-live text-[10px] text-white flex items-center justify-center font-bold">
                        3
                    </span>
                </Button>

                {/* User Avatar */}
                <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
            </header>

            {/* Command Palette / Search Dialog */}
            <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
                <DialogContent className="sm:max-w-[550px] p-0 gap-0">
                    <DialogTitle className="sr-only">Search</DialogTitle>
                    <div className="flex items-center border-b px-3">
                        <Search className="h-4 w-4 shrink-0 opacity-50" />
                        <Input
                            placeholder="Search players, teams, matches..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-0 focus-visible:ring-0 shadow-none"
                            autoFocus
                        />
                    </div>
                    <div className="max-h-[400px] overflow-y-auto p-2">
                        {searchQuery.length > 1 ? (
                            <>
                                {results.players.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-xs font-semibold text-muted-foreground px-2 py-1">Players</p>
                                        {results.players.map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => handleSelect("player", p.id)}
                                                className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent text-sm transition-colors text-left"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                    {p.shortName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{p.name}</p>
                                                    <p className="text-xs text-muted-foreground">{p.country} - {p.role.replace("_", " ")}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {results.teams.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-xs font-semibold text-muted-foreground px-2 py-1">Teams</p>
                                        {results.teams.map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => handleSelect("team", t.id)}
                                                className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent text-sm transition-colors text-left"
                                            >
                                                <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: t.color + "30", color: t.color }}>
                                                    {t.shortName}
                                                </div>
                                                <p className="font-medium">{t.name}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {results.matches.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground px-2 py-1">Matches</p>
                                        {results.matches.map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => handleSelect("match", m.id)}
                                                className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent text-sm transition-colors text-left"
                                            >
                                                <Badge variant={m.status === "LIVE" ? "live" : "secondary"} className="text-[10px]">
                                                    {m.status}
                                                </Badge>
                                                <div>
                                                    <p className="font-medium">{m.team1.shortName} vs {m.team2.shortName}</p>
                                                    <p className="text-xs text-muted-foreground">{m.seriesName}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {results.players.length === 0 && results.teams.length === 0 && results.matches.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-6">No results found.</p>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-muted-foreground">Start typing to search...</p>
                                <p className="text-xs text-muted-foreground mt-1">Search across players, teams, and matches</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
