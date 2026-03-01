"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Users } from "lucide-react";
import { players } from "@/lib/data";

const roleColors: Record<string, string> = {
    BATSMAN: "bg-cricket-amber/15 text-cricket-amber",
    BOWLER: "bg-cricket-lime/15 text-cricket-lime",
    ALL_ROUNDER: "bg-blue-500/15 text-blue-400",
    WICKET_KEEPER: "bg-purple-500/15 text-purple-400",
};

export default function PlayersPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("ALL");

    const filtered = players.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.country.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "ALL" || p.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="h-6 w-6 text-cricket-amber" /> Players
                </h1>
                <p className="text-muted-foreground">Browse and search international cricket players</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[240px] max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex gap-1.5">
                    {["ALL", "BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"].map((role) => (
                        <Button
                            key={role}
                            variant={roleFilter === role ? "default" : "outline"}
                            size="sm"
                            onClick={() => setRoleFilter(role)}
                            className="text-xs"
                        >
                            {role === "ALL" ? "All" : role.replace("_", " ")}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Player Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                {filtered.map((player) => (
                    <Link key={player.id} href={`/players/${player.id}`}>
                        <Card className="hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group overflow-hidden h-full">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-lg font-bold text-primary group-hover:scale-105 transition-transform shrink-0">
                                        {player.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{player.name}</h3>
                                        <p className="text-sm text-muted-foreground">{player.country}</p>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            <Badge className={`text-[10px] ${roleColors[player.role] || ""}`}>
                                                {player.role.replace("_", " ")}
                                            </Badge>
                                        </div>
                                        <div className="mt-2 space-y-0.5">
                                            <p className="text-xs text-muted-foreground">{player.battingStyle}</p>
                                            <p className="text-xs text-muted-foreground">{player.bowlingStyle}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </motion.div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No players found matching your criteria</p>
                </div>
            )}
        </div>
    );
}
