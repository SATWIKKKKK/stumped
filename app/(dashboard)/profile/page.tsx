"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Trophy, Star, TrendingUp, Settings, Bell, Heart } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
            {/* Profile Header */}
            <Card className="overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-cricket-amber/30 via-cricket-green/20 to-cricket-lime/10" />
                <CardContent className="p-6 -mt-12">
                    <div className="flex items-end gap-4">
                        <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarFallback className="bg-primary/20 text-primary text-xl">
                                <User className="h-8 w-8" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h1 className="text-xl font-bold">Cricket Fan</h1>
                            <p className="text-sm text-muted-foreground">Member since March 2026</p>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="default">Fan</Badge>
                                <Badge variant="outline">India</Badge>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/profile/settings"><Settings className="h-3.5 w-3.5 mr-1" /> Edit</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Trophy, label: "Fantasy Rank", value: "#156", color: "text-cricket-amber" },
                    { icon: TrendingUp, label: "Predictions", value: "68%", color: "text-cricket-lime" },
                    { icon: Star, label: "Fantasy Points", value: "1,856", color: "text-cricket-amber" },
                    { icon: Heart, label: "Following", value: "12", color: "text-live" },
                ].map(({ icon: Icon, label, value, color }) => (
                    <Card key={label}>
                        <CardContent className="p-4 text-center">
                            <Icon className={`h-5 w-5 mx-auto mb-2 ${color}`} />
                            <p className="text-2xl font-bold">{value}</p>
                            <p className="text-xs text-muted-foreground">{label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:border-primary/30 transition-colors">
                    <Link href="/profile/alerts">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Manage Alerts</h3>
                                <p className="text-xs text-muted-foreground">Configure notifications for teams and players</p>
                            </div>
                        </CardContent>
                    </Link>
                </Card>
                <Card className="hover:border-primary/30 transition-colors">
                    <Link href="/profile/settings">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Settings className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Account Settings</h3>
                                <p className="text-xs text-muted-foreground">Profile, preferences, and account management</p>
                            </div>
                        </CardContent>
                    </Link>
                </Card>
            </div>
        </div>
    );
}
