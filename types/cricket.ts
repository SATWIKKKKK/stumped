// Types for the Stumped cricket platform

export type MatchFormat = "TEST" | "ODI" | "T20I" | "T20" | "LIST_A" | "FC";
export type MatchStatus = "UPCOMING" | "LIVE" | "COMPLETED" | "ABANDONED";
export type PlayerRole = "BATSMAN" | "BOWLER" | "ALL_ROUNDER" | "WICKET_KEEPER";
export type InningsStatus = "IN_PROGRESS" | "ALL_OUT" | "DECLARED" | "COMPLETED";
export type DismissalType = "BOWLED" | "CAUGHT" | "LBW" | "RUN_OUT" | "STUMPED" | "HIT_WICKET" | "RETIRED" | "NOT_OUT";

export interface Team {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    color: string;
    ranking?: number;
}

export interface Player {
    id: string;
    name: string;
    shortName: string;
    country: string;
    teamId: string;
    role: PlayerRole;
    battingStyle: string;
    bowlingStyle: string;
    dateOfBirth: string;
    image?: string;
}

export interface PlayerStats {
    playerId: string;
    format: MatchFormat;
    matches: number;
    innings: number;
    runs: number;
    ballsFaced: number;
    hundreds: number;
    fifties: number;
    highestScore: string;
    average: number;
    strikeRate: number;
    wickets: number;
    ballsBowled: number;
    runsConceded: number;
    bestBowling: string;
    bowlingAverage: number;
    economyRate: number;
    catches: number;
    stumpings: number;
}

export interface Match {
    id: string;
    seriesName: string;
    matchNumber: string;
    format: MatchFormat;
    status: MatchStatus;
    venue: string;
    city: string;
    startDate: string;
    team1: Team;
    team2: Team;
    toss?: {
        winner: string;
        decision: string;
    };
    result?: string;
    innings: Innings[];
    currentInnings?: number;
}

export interface Innings {
    inningsNumber: number;
    battingTeamId: string;
    battingTeam: string;
    runs: number;
    wickets: number;
    overs: number;
    balls: number;
    extras: number;
    runRate: number;
    status: InningsStatus;
    batsmen: BatsmanScore[];
    bowlers: BowlerFigures[];
    fallOfWickets: FallOfWicket[];
    overHistory: OverSummary[];
}

export interface BatsmanScore {
    playerId: string;
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    dismissal: string;
    isOnStrike?: boolean;
    isNotOut?: boolean;
}

export interface BowlerFigures {
    playerId: string;
    name: string;
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
    dots: number;
    wides: number;
    noBalls: number;
}

export interface FallOfWicket {
    wicketNumber: number;
    runs: number;
    overs: number;
    playerName: string;
}

export interface OverSummary {
    overNumber: number;
    bowler: string;
    runs: number;
    wickets: number;
    deliveries: string[];
}

export interface CommentaryBall {
    overNumber: number;
    ballNumber: number;
    bowler: string;
    batsman: string;
    runs: number;
    extras: number;
    extraType?: string;
    isWicket: boolean;
    wicketType?: string;
    dismissedBatsman?: string;
    commentary: string;
    timestamp: string;
}

export interface Series {
    id: string;
    name: string;
    format: MatchFormat;
    startDate: string;
    endDate: string;
    teams: Team[];
    matches: Match[];
}

export interface Ranking {
    rank: number;
    team?: Team;
    player?: Player;
    rating: number;
    previousRank: number;
    format: MatchFormat;
    category: "batting" | "bowling" | "allrounder" | "team";
}

export interface PredictionData {
    team1Probability: number;
    team2Probability: number;
    drawProbability: number;
    predictedScore?: string;
    keyFactors: string[];
    momentum: number[];
}

export interface FantasyPlayer extends Player {
    credits: number;
    points: number;
    selectedBy: number;
    isCaptain?: boolean;
    isViceCaptain?: boolean;
}

export interface CommunityPost {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    matchId?: string;
    playerId?: string;
    likes: number;
    comments: number;
    createdAt: string;
    isVerified?: boolean;
}

export interface Notification {
    id: string;
    type: "WICKET" | "MILESTONE" | "MATCH_START" | "MATCH_END" | "TOSS" | "ALERT";
    title: string;
    body: string;
    matchId?: string;
    playerId?: string;
    read: boolean;
    createdAt: string;
}
