"use client";

import { useState, useEffect } from "react";
import { Search, Bell, User, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
    Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function TopNav() {
    const [commandOpen, setCommandOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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

    return (
        <>
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 sm:px-6">
                {/* Search */}
                <Button
                    variant="outline"
                    className="relative w-full max-w-sm justify-start text-muted-foreground gap-2"
                    onClick={() => setCommandOpen(true)}
                >
                    <Search className="h-4 w-4" />
                    <span className="text-sm hidden sm:inline">Search players, teams, matches...</span>
                    <span className="text-sm sm:hidden">Search...</span>
                    <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <Command className="h-3 w-3" />K
                    </kbd>
                </Button>

                <div className="flex-1" />

                {/* Theme Toggle — always visible, top-right */}
                <ThemeToggle />

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Bell className="h-4 w-4" />
                </Button>

                {/* User Avatar */}
                <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
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
                        <div className="text-center py-6">
                            <p className="text-sm text-muted-foreground">
                                {searchQuery.length > 1
                                    ? "Search is connected to live data. Results will appear here."
                                    : "Start typing to search..."}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Search across players, teams, and matches
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
