"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Search, Filter } from "lucide-react";
import { playerStats, players } from "@/lib/data";
import Link from "next/link";

export default function StatsPage() {
    const [format, setFormat] = useState("ODI");
    const [minRuns, setMinRuns] = useState("");
    const [sortBy, setSortBy] = useState<"runs" | "average" | "strikeRate" | "wickets">("runs");

    const filtered = playerStats
        .filter((ps) => ps.format === format)
        .filter((ps) => !minRuns || ps.runs >= Number(minRuns))
        .sort((a, b) => b[sortBy] - a[sortBy]);

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-cricket-amber" /> Stats Explorer
                </h1>
                <p className="text-muted-foreground">Advanced statistics with custom filters and sorting</p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-end gap-4">
                        <div>
                            <Label className="text-xs mb-1.5 block">Format</Label>
                            <div className="flex gap-1">
                                {["TEST", "ODI", "T20I"].map((f) => (
                                    <Button key={f} size="sm" variant={format === f ? "default" : "outline"} onClick={() => setFormat(f)}>
                                        {f}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs mb-1.5 block">Min Runs</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 1000"
                                value={minRuns}
                                onChange={(e) => setMinRuns(e.target.value)}
                                className="w-32"
                            />
                        </div>
                        <div>
                            <Label className="text-xs mb-1.5 block">Sort By</Label>
                            <div className="flex gap-1">
                                {([["runs", "Runs"], ["average", "Avg"], ["strikeRate", "SR"], ["wickets", "Wkts"]] as const).map(([key, label]) => (
                                    <Button key={key} size="sm" variant={sortBy === key ? "default" : "outline"} onClick={() => setSortBy(key)}>
                                        {label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results Table */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">{format} Statistics ({filtered.length} players)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-xs text-muted-foreground">
                                    <th className="text-left py-2.5 pr-4">Player</th>
                                    <th className="text-right px-2">Mat</th>
                                    <th className="text-right px-2">Inn</th>
                                    <th className="text-right px-2 cursor-pointer hover:text-primary" onClick={() => setSortBy("runs")}>
                                        Runs {sortBy === "runs" && "▼"}
                                    </th>
                                    <th className="text-right px-2 cursor-pointer hover:text-primary" onClick={() => setSortBy("average")}>
                                        Avg {sortBy === "average" && "▼"}
                                    </th>
                                    <th className="text-right px-2 cursor-pointer hover:text-primary" onClick={() => setSortBy("strikeRate")}>
                                        SR {sortBy === "strikeRate" && "▼"}
                                    </th>
                                    <th className="text-right px-2">HS</th>
                                    <th className="text-right px-2">100s</th>
                                    <th className="text-right px-2">50s</th>
                                    <th className="text-right px-2 cursor-pointer hover:text-primary" onClick={() => setSortBy("wickets")}>
                                        Wkts {sortBy === "wickets" && "▼"}
                                    </th>
                                    <th className="text-right px-2">BBI</th>
                                    <th className="text-right px-2">Econ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((ps, idx) => {
                                    const player = players.find(p => p.id === ps.playerId);
                                    return (
                                        <tr key={`${ps.playerId}-${ps.format}`} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                                            <td className="py-2.5 pr-4">
                                                <Link href={`/players/${ps.playerId}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                                                    <span className="text-xs text-muted-foreground w-5">{idx + 1}</span>
                                                    <span className="font-medium">{player?.name || "Unknown"}</span>
                                                    <Badge variant="outline" className="text-[9px]">{player?.country}</Badge>
                                                </Link>
                                            </td>
                                            <td className="text-right px-2 tabular-nums">{ps.matches}</td>
                                            <td className="text-right px-2 tabular-nums text-muted-foreground">{ps.innings}</td>
                                            <td className="text-right px-2 tabular-nums font-bold">{ps.runs.toLocaleString()}</td>
                                            <td className="text-right px-2 tabular-nums">{ps.average.toFixed(2)}</td>
                                            <td className="text-right px-2 tabular-nums">{ps.strikeRate.toFixed(2)}</td>
                                            <td className="text-right px-2 tabular-nums">{ps.highestScore}</td>
                                            <td className="text-right px-2 tabular-nums font-bold">{ps.hundreds}</td>
                                            <td className="text-right px-2 tabular-nums">{ps.fifties}</td>
                                            <td className="text-right px-2 tabular-nums font-bold">{ps.wickets}</td>
                                            <td className="text-right px-2 tabular-nums">{ps.bestBowling}</td>
                                            <td className="text-right px-2 tabular-nums">{ps.economyRate > 0 ? ps.economyRate.toFixed(2) : "-"}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">No players match the current filters</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
