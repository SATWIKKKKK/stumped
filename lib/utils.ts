import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function formatTime(date: Date | string): string {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatOvers(balls: number): string {
    const overs = Math.floor(balls / 6);
    const rem = balls % 6;
    return `${overs}.${rem}`;
}

export function calculateRunRate(runs: number, balls: number): string {
    if (balls === 0) return "0.00";
    return ((runs / balls) * 6).toFixed(2);
}

export function calculateStrikeRate(runs: number, balls: number): string {
    if (balls === 0) return "0.00";
    return ((runs / balls) * 100).toFixed(2);
}

export function calculateEconomy(runs: number, balls: number): string {
    if (balls === 0) return "0.00";
    return ((runs / balls) * 6).toFixed(2);
}

export function getMatchStatusColor(status: string): string {
    switch (status) {
        case "LIVE":
            return "text-live";
        case "COMPLETED":
            return "text-muted-foreground";
        case "UPCOMING":
            return "text-foreground";
        default:
            return "text-muted-foreground";
    }
}

export function getResultColor(result: string): string {
    if (result.includes("won")) return "text-foreground";
    if (result.includes("lost")) return "text-muted-foreground";
    return "text-muted-foreground";
}

export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
}
