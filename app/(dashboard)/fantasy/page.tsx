"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Star, Trophy, Users, Plus, Check } from "lucide-react";
import { fantasyPlayers, matches, getLiveMatches } from "@/lib/data";

export default function FantasyPage() {
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
    const [captain, setCaptain] = useState<string | null>(null);
    const liveMatches = getLiveMatches();

    const togglePlayer = (id: string) => {
        setSelectedPlayers(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : prev.length < 11 ? [...prev, id] : prev
        );
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Zap className="h-6 w-6 text-cricket-amber" /> Fantasy Cricket
                </h1>
                <p className="text-muted-foreground">Build your dream team and compete in contests</p>
            </div>

            <Tabs defaultValue="team-builder" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="team-builder">Team Builder</TabsTrigger>
                    <TabsTrigger value="contests">Contests</TabsTrigger>
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>

                <TabsContent value="team-builder" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Player Selection */}
                        <div className="lg:col-span-2 space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center justify-between text-base">
                                        <span>Select Players ({selectedPlayers.length}/11)</span>
                                        <Progress value={(selectedPlayers.length / 11) * 100} className="w-32" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {fantasyPlayers.map((player) => {
                                            const isSelected = selectedPlayers.includes(player.id);
                                            const isCaptain = captain === player.id;
                                            return (
                                                <div
                                                    key={player.id}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                                                        }`}
                                                    onClick={() => togglePlayer(player.id)}
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                                                        {player.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">{player.name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline" className="text-[9px]">{player.role.replace("_", " ")}</Badge>
                                                            <span className="text-[10px] text-muted-foreground">{player.credits} Cr</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold">{player.points} pts</p>
                                                        <p className="text-[10px] text-muted-foreground">{player.selectedBy}% sel</p>
                                                    </div>
                                                    <div className="shrink-0">
                                                        {isSelected ? (
                                                            <Check className="h-4 w-4 text-primary" />
                                                        ) : (
                                                            <Plus className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Team Summary */}
                        <div className="space-y-4">
                            <Card className="bg-gradient-to-b from-cricket-amber/5 to-transparent border-cricket-amber/20">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Star className="h-4 w-4 text-cricket-amber" /> Your Team
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {selectedPlayers.length === 0 ? (
                                            <p className="text-sm text-muted-foreground text-center py-6">Select players to build your team</p>
                                        ) : (
                                            selectedPlayers.map((id) => {
                                                const p = fantasyPlayers.find(fp => fp.id === id);
                                                if (!p) return null;
                                                return (
                                                    <div key={id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                                                        <p className="text-sm font-medium flex-1 truncate">{p.name}</p>
                                                        <Button
                                                            size="sm"
                                                            variant={captain === id ? "default" : "ghost"}
                                                            className="text-[10px] h-6 px-2"
                                                            onClick={(e) => { e.stopPropagation(); setCaptain(id); }}
                                                        >
                                                            {captain === id ? "C" : "Set C"}
                                                        </Button>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                    {selectedPlayers.length === 11 && (
                                        <Button className="w-full mt-4">
                                            <Trophy className="h-4 w-4 mr-1" /> Submit Team
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>

                            {/* AI Recommendation */}
                            <Card className="bg-gradient-to-r from-cricket-amber/5 to-cricket-green/5 border-cricket-amber/20">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Zap className="h-3.5 w-3.5 text-cricket-amber" /> AI Captain Pick
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">
                                        <span className="font-bold text-cricket-amber">Jasprit Bumrah</span> is the recommended captain for the BGT 3rd Test. His 4/68 in the 1st innings shows peak form, and the MCG pitch conditions favor pace bowling.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="contests">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { name: "Mega Contest", entry: 49, prize: "10,00,000", spots: "10L", filled: 78 },
                            { name: "Head to Head", entry: 99, prize: "180", spots: "2", filled: 50 },
                            { name: "Small League", entry: 25, prize: "5,000", spots: "500", filled: 65 },
                            { name: "Practice Match", entry: 0, prize: "0", spots: "Unlimited", filled: 45 },
                        ].map((contest, idx) => (
                            <Card key={idx} className="hover:border-primary/30 transition-colors">
                                <CardContent className="p-5">
                                    <h3 className="font-semibold">{contest.name}</h3>
                                    <p className="text-2xl font-bold text-cricket-amber mt-1">Rs. {contest.prize}</p>
                                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                                        <span>Entry: Rs. {contest.entry}</span>
                                        <span>{contest.spots} spots</span>
                                    </div>
                                    <Progress value={contest.filled} className="mt-2 h-1.5" />
                                    <p className="text-[10px] text-muted-foreground mt-1">{contest.filled}% filled</p>
                                    <Button size="sm" className="w-full mt-3">Join Contest</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="leaderboard">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Weekly Leaderboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[
                                    { rank: 1, name: "CricketKing99", points: 2456, prize: "50,000" },
                                    { rank: 2, name: "FantasyMaster", points: 2389, prize: "25,000" },
                                    { rank: 3, name: "StumpedPro", points: 2345, prize: "10,000" },
                                    { rank: 4, name: "SixHitter", points: 2298, prize: "5,000" },
                                    { rank: 5, name: "BowlerKing", points: 2267, prize: "2,500" },
                                    { rank: "...", name: "You", points: 1856, prize: "-" },
                                ].map((entry, idx) => (
                                    <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg ${typeof entry.rank === "string" ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"}`}>
                                        <span className={`text-lg font-bold w-8 text-center ${Number(entry.rank) <= 3 ? "text-cricket-amber" : "text-muted-foreground"}`}>
                                            {entry.rank}
                                        </span>
                                        <span className="flex-1 font-medium text-sm">{entry.name}</span>
                                        <span className="text-sm font-bold tabular-nums">{entry.points} pts</span>
                                        <Badge variant="outline" className="text-[10px]">Rs. {entry.prize}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
