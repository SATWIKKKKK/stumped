"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, MessageCircle, Share2, Send, TrendingUp, Award } from "lucide-react";
import { communityPosts } from "@/lib/data";

export default function CommunityPage() {
    const [newPost, setNewPost] = useState("");
    const [posts, setPosts] = useState(communityPosts);

    const handlePost = () => {
        if (!newPost.trim()) return;
        const post = {
            id: `cp-new-${Date.now()}`,
            userId: "me",
            userName: "You",
            content: newPost,
            likes: 0,
            comments: 0,
            createdAt: new Date().toISOString(),
        };
        setPosts([post, ...posts]);
        setNewPost("");
    };

    return (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-cricket-amber" /> Community
                </h1>
                <p className="text-muted-foreground">Cricket discussions, hot takes, and analysis</p>
            </div>

            {/* New Post */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">Y</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <Input
                                placeholder="Share your cricket thoughts..."
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handlePost()}
                            />
                            <div className="flex justify-end mt-2">
                                <Button size="sm" onClick={handlePost} disabled={!newPost.trim()}>
                                    <Send className="h-3.5 w-3.5 mr-1" /> Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="hover:border-primary/20 transition-colors">
                        <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {post.userName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">{post.userName}</span>
                                        {post.isVerified && (
                                            <Badge variant="outline" className="text-[9px] gap-0.5">
                                                <Award className="h-2.5 w-2.5" /> Verified
                                            </Badge>
                                        )}
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                    <p className="text-sm mt-2 leading-relaxed">{post.content}</p>
                                    {post.matchId && (
                                        <Badge variant="format" className="mt-2 text-[10px]">
                                            Match Related
                                        </Badge>
                                    )}
                                    <div className="flex items-center gap-6 mt-3">
                                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-live transition-colors">
                                            <Heart className="h-3.5 w-3.5" /> {post.likes}
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                            <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                            <Share2 className="h-3.5 w-3.5" /> Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
