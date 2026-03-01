"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Newspaper, Clock, TrendingUp, ExternalLink } from "lucide-react";

const newsItems = [
    {
        id: 1,
        title: "Travis Head's 152 Puts Australia in Command at MCG",
        summary: "Travis Head scored a brilliant 152 off 148 balls to give Australia a commanding total of 312 in the 3rd Test at Melbourne. His aggressive intent against the Indian pace attack was the highlight of Day 1.",
        category: "Match Report",
        time: "2 hours ago",
        isBreaking: true,
    },
    {
        id: 2,
        title: "Bumrah Rises to Career-High ICC Test Bowling Rankings",
        summary: "Jasprit Bumrah's 4/68 in the first innings has propelled him to a career-high 908 rating points in the ICC Test bowling rankings, the highest by any Indian fast bowler in history.",
        category: "Rankings",
        time: "4 hours ago",
        isBreaking: false,
    },
    {
        id: 3,
        title: "Champions Trophy Semi-Final: Root Century Sets Up England Innings",
        summary: "Joe Root scored his 51st ODI century as England posted 287/8 against Pakistan in the Champions Trophy Semi-Final at Dubai. The veteran batsman's 118 anchored the innings after early wickets fell.",
        category: "Match Report",
        time: "5 hours ago",
        isBreaking: false,
    },
    {
        id: 4,
        title: "ICC Announces New Playing Conditions for Test Cricket",
        summary: "The ICC has announced revised playing conditions for Test cricket, including a new 'impact player' review system and changes to follow-on rules. The changes will take effect from the 2026-27 season.",
        category: "ICC News",
        time: "8 hours ago",
        isBreaking: false,
    },
    {
        id: 5,
        title: "Suryakumar Yadav Named ICC T20I Player of the Year",
        summary: "India's Suryakumar Yadav has been named the ICC T20I Player of the Year for the third consecutive time, following his extraordinary 2025 season where he scored 1,200 runs at a strike rate of 171.",
        category: "Awards",
        time: "12 hours ago",
        isBreaking: false,
    },
    {
        id: 6,
        title: "IPL 2026 Auction: Record Spending as Teams Rebuild",
        summary: "The IPL 2026 mega auction saw record spending of over Rs. 1,200 crores as all 10 teams looked to build fresh squads. Several uncapped Indian players fetched premium contracts.",
        category: "IPL",
        time: "1 day ago",
        isBreaking: false,
    },
    {
        id: 7,
        title: "World Test Championship Points Table: India Lead After Adelaide Win",
        summary: "India have strengthened their position at the top of the World Test Championship standings following their 7-wicket victory in the 2nd Test at Adelaide against Australia.",
        category: "WTC",
        time: "2 days ago",
        isBreaking: false,
    },
];

export default function NewsPage() {
    return (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Newspaper className="h-6 w-6 text-cricket-amber" /> Cricket News
                </h1>
                <p className="text-muted-foreground">Latest cricket updates powered by AI curation</p>
            </div>

            <div className="space-y-4">
                {newsItems.map((news, idx) => (
                    <Card key={news.id} className={`hover:border-primary/30 transition-colors cursor-pointer ${idx === 0 ? "border-cricket-amber/30" : ""}`}>
                        {idx === 0 && <div className="h-1 bg-gradient-to-r from-cricket-amber to-cricket-lime" />}
                        <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant={news.isBreaking ? "live" : "format"} className="text-[10px]">
                                            {news.isBreaking ? "BREAKING" : news.category}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {news.time}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-base leading-snug hover:text-primary transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{news.summary}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
