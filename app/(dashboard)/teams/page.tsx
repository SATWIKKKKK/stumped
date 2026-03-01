"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Users, ChevronRight } from "lucide-react";
import { teams, getPlayersByTeamId } from "@/lib/data";

export default function TeamsPage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Flag className="h-6 w-6 text-cricket-amber" /> Teams
                </h1>
                <p className="text-muted-foreground">International cricket teams</p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {teams.map((team) => {
                    const squad = getPlayersByTeamId(team.id);
                    return (
                        <Link key={team.id} href={`/teams/${team.id}`}>
                            <Card className="hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group overflow-hidden h-full">
                                <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${team.color}, ${team.color}88)` }} />
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="h-16 w-16 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 group-hover:scale-105 transition-transform"
                                            style={{ backgroundColor: team.color + "20", color: team.color }}
                                        >
                                            {team.shortName}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{team.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                {team.ranking && (
                                                    <Badge variant="outline" className="text-[10px]">
                                                        ICC Rank #{team.ranking}
                                                    </Badge>
                                                )}
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Users className="h-3 w-3" /> {squad.length} players
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
}
