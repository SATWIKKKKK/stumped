// Comprehensive mock cricket data for the Stumped platform
// This powers the entire UI when no external API keys are configured

import type {
    Team, Player, PlayerStats, Match, Innings, BatsmanScore, BowlerFigures,
    FallOfWicket, OverSummary, CommentaryBall, Ranking, Series,
    CommunityPost, Notification, PredictionData, FantasyPlayer,
} from "@/types/cricket";

// --- TEAMS ---
export const teams: Team[] = [
    { id: "t1", name: "India", shortName: "IND", logo: "/teams/ind.png", color: "#0078D4", ranking: 1 },
    { id: "t2", name: "Australia", shortName: "AUS", logo: "/teams/aus.png", color: "#FFD700", ranking: 2 },
    { id: "t3", name: "England", shortName: "ENG", logo: "/teams/eng.png", color: "#1A3668", ranking: 3 },
    { id: "t4", name: "South Africa", shortName: "SA", logo: "/teams/sa.png", color: "#007749", ranking: 4 },
    { id: "t5", name: "New Zealand", shortName: "NZ", logo: "/teams/nz.png", color: "#000000", ranking: 5 },
    { id: "t6", name: "Pakistan", shortName: "PAK", logo: "/teams/pak.png", color: "#01411C", ranking: 6 },
    { id: "t7", name: "Sri Lanka", shortName: "SL", logo: "/teams/sl.png", color: "#0A2351", ranking: 7 },
    { id: "t8", name: "West Indies", shortName: "WI", logo: "/teams/wi.png", color: "#7B0040", ranking: 8 },
    { id: "t9", name: "Bangladesh", shortName: "BAN", logo: "/teams/ban.png", color: "#006A4E", ranking: 9 },
    { id: "t10", name: "Afghanistan", shortName: "AFG", logo: "/teams/afg.png", color: "#000080", ranking: 10 },
];

// --- PLAYERS ---
export const players: Player[] = [
    // India
    { id: "p1", name: "Virat Kohli", shortName: "V Kohli", country: "India", teamId: "t1", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm medium", dateOfBirth: "1988-11-05" },
    { id: "p2", name: "Rohit Sharma", shortName: "R Sharma", country: "India", teamId: "t1", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1987-04-30" },
    { id: "p3", name: "Jasprit Bumrah", shortName: "J Bumrah", country: "India", teamId: "t1", role: "BOWLER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast", dateOfBirth: "1993-12-06" },
    { id: "p4", name: "Ravindra Jadeja", shortName: "R Jadeja", country: "India", teamId: "t1", role: "ALL_ROUNDER", battingStyle: "Left-hand bat", bowlingStyle: "Slow left-arm orthodox", dateOfBirth: "1988-12-06" },
    { id: "p5", name: "KL Rahul", shortName: "KL Rahul", country: "India", teamId: "t1", role: "WICKET_KEEPER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm medium", dateOfBirth: "1992-04-18" },
    { id: "p25", name: "Shubman Gill", shortName: "S Gill", country: "India", teamId: "t1", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1999-09-08" },
    { id: "p26", name: "Rishabh Pant", shortName: "R Pant", country: "India", teamId: "t1", role: "WICKET_KEEPER", battingStyle: "Left-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1997-10-04" },
    { id: "p27", name: "Mohammed Shami", shortName: "M Shami", country: "India", teamId: "t1", role: "BOWLER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast-medium", dateOfBirth: "1990-09-03" },
    { id: "p28", name: "Hardik Pandya", shortName: "H Pandya", country: "India", teamId: "t1", role: "ALL_ROUNDER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast-medium", dateOfBirth: "1993-10-11" },
    { id: "p29", name: "Ravichandran Ashwin", shortName: "R Ashwin", country: "India", teamId: "t1", role: "ALL_ROUNDER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1986-09-17" },
    { id: "p30", name: "Suryakumar Yadav", shortName: "SK Yadav", country: "India", teamId: "t1", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm medium", dateOfBirth: "1990-09-14" },
    // Australia
    { id: "p6", name: "Steve Smith", shortName: "S Smith", country: "Australia", teamId: "t2", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm leg break", dateOfBirth: "1989-06-02" },
    { id: "p7", name: "Pat Cummins", shortName: "P Cummins", country: "Australia", teamId: "t2", role: "BOWLER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast", dateOfBirth: "1993-05-08" },
    { id: "p8", name: "Mitchell Starc", shortName: "M Starc", country: "Australia", teamId: "t2", role: "BOWLER", battingStyle: "Left-hand bat", bowlingStyle: "Left-arm fast", dateOfBirth: "1990-01-30" },
    { id: "p9", name: "Travis Head", shortName: "T Head", country: "Australia", teamId: "t2", role: "BATSMAN", battingStyle: "Left-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1993-12-29" },
    { id: "p10", name: "Marnus Labuschagne", shortName: "M Labuschagne", country: "Australia", teamId: "t2", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm leg break", dateOfBirth: "1994-06-22" },
    // England
    { id: "p11", name: "Joe Root", shortName: "J Root", country: "England", teamId: "t3", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1990-12-30" },
    { id: "p12", name: "Ben Stokes", shortName: "B Stokes", country: "England", teamId: "t3", role: "ALL_ROUNDER", battingStyle: "Left-hand bat", bowlingStyle: "Right-arm fast-medium", dateOfBirth: "1991-06-04" },
    { id: "p13", name: "James Anderson", shortName: "J Anderson", country: "England", teamId: "t3", role: "BOWLER", battingStyle: "Left-hand bat", bowlingStyle: "Right-arm fast-medium", dateOfBirth: "1982-07-30" },
    { id: "p14", name: "Jos Buttler", shortName: "J Buttler", country: "England", teamId: "t3", role: "WICKET_KEEPER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm medium", dateOfBirth: "1990-09-08" },
    // South Africa
    { id: "p15", name: "Kagiso Rabada", shortName: "K Rabada", country: "South Africa", teamId: "t4", role: "BOWLER", battingStyle: "Left-hand bat", bowlingStyle: "Right-arm fast", dateOfBirth: "1995-05-25" },
    // New Zealand
    { id: "p16", name: "Kane Williamson", shortName: "K Williamson", country: "New Zealand", teamId: "t5", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1990-08-08" },
    { id: "p17", name: "Trent Boult", shortName: "T Boult", country: "New Zealand", teamId: "t5", role: "BOWLER", battingStyle: "Right-hand bat", bowlingStyle: "Left-arm fast", dateOfBirth: "1989-07-22" },
    // Pakistan
    { id: "p18", name: "Babar Azam", shortName: "B Azam", country: "Pakistan", teamId: "t6", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1994-10-15" },
    { id: "p19", name: "Shaheen Afridi", shortName: "S Afridi", country: "Pakistan", teamId: "t6", role: "BOWLER", battingStyle: "Left-hand bat", bowlingStyle: "Left-arm fast", dateOfBirth: "2000-04-06" },
    // Sri Lanka
    { id: "p20", name: "Wanindu Hasaranga", shortName: "W Hasaranga", country: "Sri Lanka", teamId: "t7", role: "ALL_ROUNDER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm leg break", dateOfBirth: "1997-07-29" },
    // West Indies
    { id: "p21", name: "Nicholas Pooran", shortName: "N Pooran", country: "West Indies", teamId: "t8", role: "WICKET_KEEPER", battingStyle: "Left-hand bat", bowlingStyle: "Right-arm off break", dateOfBirth: "1995-10-02" },
    // Bangladesh
    { id: "p22", name: "Shakib Al Hasan", shortName: "S Al Hasan", country: "Bangladesh", teamId: "t9", role: "ALL_ROUNDER", battingStyle: "Left-hand bat", bowlingStyle: "Slow left-arm orthodox", dateOfBirth: "1987-03-24" },
    // Afghanistan
    { id: "p23", name: "Rashid Khan", shortName: "R Khan", country: "Afghanistan", teamId: "t10", role: "ALL_ROUNDER", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm leg break", dateOfBirth: "1998-09-20" },
    { id: "p24", name: "Ibrahim Zadran", shortName: "I Zadran", country: "Afghanistan", teamId: "t10", role: "BATSMAN", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm medium", dateOfBirth: "2001-12-12" },
];

// --- PLAYER STATS ---
export const playerStats: PlayerStats[] = [
    // Kohli ODI
    { playerId: "p1", format: "ODI", matches: 292, innings: 283, runs: 13906, ballsFaced: 15143, hundreds: 50, fifties: 72, highestScore: "183", average: 58.18, strikeRate: 93.54, wickets: 4, ballsBowled: 294, runsConceded: 259, bestBowling: "1/15", bowlingAverage: 64.75, economyRate: 5.28, catches: 131, stumpings: 0 },
    // Kohli T20I
    { playerId: "p1", format: "T20I", matches: 125, innings: 120, runs: 4188, ballsFaced: 3264, hundreds: 1, fifties: 38, highestScore: "122*", average: 52.35, strikeRate: 137.04, wickets: 4, ballsBowled: 138, runsConceded: 124, bestBowling: "1/13", bowlingAverage: 31.0, economyRate: 5.39, catches: 43, stumpings: 0 },
    // Kohli Test
    { playerId: "p1", format: "TEST", matches: 115, innings: 197, runs: 8848, ballsFaced: 15570, hundreds: 29, fifties: 30, highestScore: "254*", average: 48.88, strikeRate: 56.84, wickets: 0, ballsBowled: 24, runsConceded: 30, bestBowling: "0/10", bowlingAverage: 0, economyRate: 7.5, catches: 102, stumpings: 0 },
    // Rohit ODI
    { playerId: "p2", format: "ODI", matches: 265, innings: 258, runs: 10709, ballsFaced: 11585, hundreds: 31, fifties: 49, highestScore: "264", average: 49.12, strikeRate: 92.44, wickets: 8, ballsBowled: 342, runsConceded: 326, bestBowling: "2/32", bowlingAverage: 40.75, economyRate: 5.72, catches: 67, stumpings: 0 },
    // Bumrah Test
    { playerId: "p3", format: "TEST", matches: 40, innings: 71, runs: 152, ballsFaced: 306, hundreds: 0, fifties: 0, highestScore: "34", average: 7.6, strikeRate: 49.67, wickets: 181, ballsBowled: 8040, runsConceded: 3706, bestBowling: "6/27", bowlingAverage: 20.47, economyRate: 2.77, catches: 3, stumpings: 0 },
    // Bumrah ODI
    { playerId: "p3", format: "ODI", matches: 82, innings: 82, runs: 22, ballsFaced: 38, hundreds: 0, fifties: 0, highestScore: "10*", average: 5.5, strikeRate: 57.89, wickets: 149, ballsBowled: 4380, runsConceded: 3416, bestBowling: "5/27", bowlingAverage: 22.93, economyRate: 4.68, catches: 14, stumpings: 0 },
    // Smith Test
    { playerId: "p6", format: "TEST", matches: 110, innings: 196, runs: 9685, ballsFaced: 18542, hundreds: 32, fifties: 40, highestScore: "239", average: 56.94, strikeRate: 52.23, wickets: 5, ballsBowled: 528, runsConceded: 341, bestBowling: "1/0", bowlingAverage: 68.2, economyRate: 3.88, catches: 141, stumpings: 0 },
    // Root Test
    { playerId: "p11", format: "TEST", matches: 150, innings: 278, runs: 12672, ballsFaced: 23847, hundreds: 35, fifties: 64, highestScore: "254", average: 50.09, strikeRate: 53.14, wickets: 46, ballsBowled: 3444, runsConceded: 2071, bestBowling: "4/5", bowlingAverage: 45.02, economyRate: 3.61, catches: 182, stumpings: 0 },
    // Williamson Test
    { playerId: "p16", format: "TEST", matches: 102, innings: 188, runs: 8743, ballsFaced: 17894, hundreds: 32, fifties: 34, highestScore: "251", average: 54.02, strikeRate: 48.86, wickets: 29, ballsBowled: 2286, runsConceded: 1248, bestBowling: "4/44", bowlingAverage: 43.03, economyRate: 3.28, catches: 74, stumpings: 0 },
    // Babar ODI
    { playerId: "p18", format: "ODI", matches: 115, innings: 112, runs: 5729, ballsFaced: 5959, hundreds: 19, fifties: 29, highestScore: "158", average: 57.29, strikeRate: 96.14, wickets: 0, ballsBowled: 0, runsConceded: 0, bestBowling: "-", bowlingAverage: 0, economyRate: 0, catches: 28, stumpings: 0 },
    // Babar T20I
    { playerId: "p18", format: "T20I", matches: 108, innings: 105, runs: 3985, ballsFaced: 3244, hundreds: 3, fifties: 36, highestScore: "122", average: 41.51, strikeRate: 128.83, wickets: 0, ballsBowled: 0, runsConceded: 0, bestBowling: "-", bowlingAverage: 0, economyRate: 0, catches: 22, stumpings: 0 },
    // Stokes Test
    { playerId: "p12", format: "TEST", matches: 106, innings: 190, runs: 6450, ballsFaced: 11250, hundreds: 13, fifties: 29, highestScore: "258", average: 35.36, strikeRate: 57.33, wickets: 200, ballsBowled: 11958, runsConceded: 6924, bestBowling: "6/22", bowlingAverage: 34.62, economyRate: 3.47, catches: 106, stumpings: 0 },
    // Cummins Test
    { playerId: "p7", format: "TEST", matches: 62, innings: 109, runs: 1467, ballsFaced: 2652, hundreds: 0, fifties: 6, highestScore: "93", average: 16.98, strikeRate: 55.32, wickets: 274, ballsBowled: 12696, runsConceded: 6194, bestBowling: "7/58", bowlingAverage: 22.61, economyRate: 2.93, catches: 18, stumpings: 0 },
    // Rashid Khan T20I
    { playerId: "p23", format: "T20I", matches: 82, innings: 60, runs: 527, ballsFaced: 360, hundreds: 0, fifties: 0, highestScore: "29", average: 11.45, strikeRate: 146.39, wickets: 130, ballsBowled: 1908, runsConceded: 1480, bestBowling: "5/3", bowlingAverage: 11.38, economyRate: 6.14, catches: 23, stumpings: 0 },
    // Rabada Test
    { playerId: "p15", format: "TEST", matches: 58, innings: 100, runs: 852, ballsFaced: 1584, hundreds: 0, fifties: 2, highestScore: "60", average: 13.31, strikeRate: 53.79, wickets: 282, ballsBowled: 11742, runsConceded: 6250, bestBowling: "7/112", bowlingAverage: 22.16, economyRate: 3.19, catches: 12, stumpings: 0 },
];

// --- MATCHES ---
const createInningsData = (
    num: number, teamId: string, teamName: string,
    runs: number, wickets: number, overs: number, balls: number,
    status: "IN_PROGRESS" | "ALL_OUT" | "DECLARED" | "COMPLETED"
): Innings => ({
    inningsNumber: num,
    battingTeamId: teamId,
    battingTeam: teamName,
    runs,
    wickets,
    overs,
    balls,
    extras: Math.floor(Math.random() * 15) + 5,
    runRate: parseFloat(((runs / (overs * 6 + balls)) * 6).toFixed(2)),
    status,
    batsmen: [],
    bowlers: [],
    fallOfWickets: [],
    overHistory: [],
});

export const matches: Match[] = [
    {
        id: "m1",
        seriesName: "Border-Gavaskar Trophy 2025-26",
        matchNumber: "3rd Test",
        format: "TEST",
        status: "LIVE",
        venue: "Melbourne Cricket Ground",
        city: "Melbourne",
        startDate: "2026-02-28T04:00:00Z",
        team1: teams[0],
        team2: teams[1],
        toss: { winner: "Australia", decision: "bat" },
        innings: [
            {
                ...createInningsData(1, "t2", "Australia", 312, 10, 84, 2, "ALL_OUT"),
                batsmen: [
                    { playerId: "p9", name: "Travis Head", runs: 152, balls: 148, fours: 18, sixes: 4, strikeRate: 102.7, dismissal: "c Kohli b Bumrah", isNotOut: false },
                    { playerId: "p10", name: "Marnus Labuschagne", runs: 62, balls: 120, fours: 6, sixes: 0, strikeRate: 51.67, dismissal: "lbw b Jadeja", isNotOut: false },
                    { playerId: "p6", name: "Steve Smith", runs: 48, balls: 95, fours: 5, sixes: 1, strikeRate: 50.53, dismissal: "b Bumrah", isNotOut: false },
                ],
                bowlers: [
                    { playerId: "p3", name: "Jasprit Bumrah", overs: 24, maidens: 7, runs: 68, wickets: 4, economy: 2.83, dots: 96, wides: 0, noBalls: 1 },
                    { playerId: "p4", name: "Ravindra Jadeja", overs: 28, maidens: 5, runs: 92, wickets: 3, economy: 3.29, dots: 89, wides: 0, noBalls: 0 },
                    { playerId: "p27", name: "Mohammed Shami", overs: 22, maidens: 4, runs: 78, wickets: 2, economy: 3.55, dots: 72, wides: 1, noBalls: 0 },
                ],
                fallOfWickets: [
                    { wicketNumber: 1, runs: 45, overs: 14.3, playerName: "Usman Khawaja" },
                    { wicketNumber: 2, runs: 128, overs: 38.2, playerName: "M Labuschagne" },
                    { wicketNumber: 3, runs: 185, overs: 52.4, playerName: "S Smith" },
                    { wicketNumber: 4, runs: 232, overs: 62.1, playerName: "T Head" },
                ],
                overHistory: [
                    { overNumber: 82, bowler: "J Bumrah", runs: 2, wickets: 0, deliveries: ["0", "0", "1", "0", "0", "1"] },
                    { overNumber: 83, bowler: "R Jadeja", runs: 8, wickets: 1, deliveries: ["1", "0", "4", "W", "0", "2"] },
                    { overNumber: 84, bowler: "J Bumrah", runs: 3, wickets: 1, deliveries: ["0", "1", "W", "0", "0", "2"] },
                ],
            },
            {
                ...createInningsData(2, "t1", "India", 198, 4, 52, 3, "IN_PROGRESS"),
                batsmen: [
                    { playerId: "p2", name: "Rohit Sharma", runs: 45, balls: 68, fours: 6, sixes: 1, strikeRate: 66.18, dismissal: "c Smith b Cummins", isNotOut: false },
                    { playerId: "p25", name: "Shubman Gill", runs: 78, balls: 125, fours: 9, sixes: 2, strikeRate: 62.4, dismissal: "", isNotOut: true, isOnStrike: true },
                    { playerId: "p1", name: "Virat Kohli", runs: 34, balls: 52, fours: 4, sixes: 0, strikeRate: 65.38, dismissal: "b Starc", isNotOut: false },
                    { playerId: "p26", name: "Rishabh Pant", runs: 28, balls: 22, fours: 3, sixes: 2, strikeRate: 127.27, dismissal: "", isNotOut: true },
                ],
                bowlers: [
                    { playerId: "p7", name: "Pat Cummins", overs: 16, maidens: 3, runs: 52, wickets: 2, economy: 3.25, dots: 55, wides: 0, noBalls: 0 },
                    { playerId: "p8", name: "Mitchell Starc", overs: 14, maidens: 2, runs: 58, wickets: 1, economy: 4.14, dots: 42, wides: 2, noBalls: 0 },
                ],
                fallOfWickets: [
                    { wicketNumber: 1, runs: 67, overs: 18.4, playerName: "R Sharma" },
                    { wicketNumber: 2, runs: 102, overs: 28.1, playerName: "KL Rahul" },
                    { wicketNumber: 3, runs: 145, overs: 38.5, playerName: "V Kohli" },
                    { wicketNumber: 4, runs: 168, overs: 44.2, playerName: "R Jadeja" },
                ],
                overHistory: [
                    { overNumber: 50, bowler: "P Cummins", runs: 4, wickets: 0, deliveries: ["0", "1", "0", "0", "2", "1"] },
                    { overNumber: 51, bowler: "M Starc", runs: 6, wickets: 0, deliveries: ["4", "0", "0", "1", "0", "1"] },
                    { overNumber: 52, bowler: "P Cummins", runs: 3, wickets: 0, deliveries: ["0", "0", "1"] },
                ],
            },
        ],
        currentInnings: 2,
    },
    {
        id: "m2",
        seriesName: "ICC Champions Trophy 2026",
        matchNumber: "Semi-Final 1",
        format: "ODI",
        status: "LIVE",
        venue: "Dubai International Cricket Stadium",
        city: "Dubai",
        startDate: "2026-03-01T09:30:00Z",
        team1: teams[2],
        team2: teams[5],
        toss: { winner: "England", decision: "bat" },
        innings: [
            {
                ...createInningsData(1, "t3", "England", 287, 8, 50, 0, "COMPLETED"),
                batsmen: [
                    { playerId: "p11", name: "Joe Root", runs: 118, balls: 124, fours: 12, sixes: 2, strikeRate: 95.16, dismissal: "c Babar b Afridi", isNotOut: false },
                    { playerId: "p14", name: "Jos Buttler", runs: 82, balls: 54, fours: 8, sixes: 4, strikeRate: 151.85, dismissal: "not out", isNotOut: true },
                    { playerId: "p12", name: "Ben Stokes", runs: 45, balls: 38, fours: 4, sixes: 2, strikeRate: 118.42, dismissal: "run out", isNotOut: false },
                ],
                bowlers: [
                    { playerId: "p19", name: "Shaheen Afridi", overs: 10, maidens: 1, runs: 58, wickets: 3, economy: 5.8, dots: 32, wides: 1, noBalls: 0 },
                ],
            },
            {
                ...createInningsData(2, "t6", "Pakistan", 156, 3, 28, 2, "IN_PROGRESS"),
                batsmen: [
                    { playerId: "p18", name: "Babar Azam", runs: 72, balls: 78, fours: 8, sixes: 1, strikeRate: 92.31, dismissal: "", isNotOut: true, isOnStrike: true },
                ],
                bowlers: [],
            },
        ],
        currentInnings: 2,
    },
    {
        id: "m3",
        seriesName: "ICC World Test Championship Final 2025-27",
        matchNumber: "Final",
        format: "TEST",
        status: "UPCOMING",
        venue: "Lord's Cricket Ground",
        city: "London",
        startDate: "2026-06-11T10:00:00Z",
        team1: teams[0],
        team2: teams[3],
        innings: [],
    },
    {
        id: "m4",
        seriesName: "T20I Series - India vs England",
        matchNumber: "1st T20I",
        format: "T20I",
        status: "COMPLETED",
        venue: "Eden Gardens",
        city: "Kolkata",
        startDate: "2026-01-22T14:00:00Z",
        team1: teams[0],
        team2: teams[2],
        toss: { winner: "India", decision: "bat" },
        result: "India won by 43 runs",
        innings: [
            {
                ...createInningsData(1, "t1", "India", 212, 4, 20, 0, "COMPLETED"),
                batsmen: [
                    { playerId: "p30", name: "Suryakumar Yadav", runs: 96, balls: 52, fours: 8, sixes: 6, strikeRate: 184.62, dismissal: "c Buttler b Stokes", isNotOut: false },
                    { playerId: "p28", name: "Hardik Pandya", runs: 48, balls: 22, fours: 3, sixes: 4, strikeRate: 218.18, dismissal: "not out", isNotOut: true },
                ],
                bowlers: [],
            },
            {
                ...createInningsData(2, "t3", "England", 169, 10, 18, 4, "ALL_OUT"),
                batsmen: [
                    { playerId: "p14", name: "Jos Buttler", runs: 56, balls: 30, fours: 4, sixes: 4, strikeRate: 186.67, dismissal: "c Pant b Bumrah", isNotOut: false },
                ],
                bowlers: [],
            },
        ],
    },
    {
        id: "m5",
        seriesName: "T20I Series - India vs England",
        matchNumber: "2nd T20I",
        format: "T20I",
        status: "COMPLETED",
        venue: "M. A. Chidambaram Stadium",
        city: "Chennai",
        startDate: "2026-01-25T14:00:00Z",
        team1: teams[0],
        team2: teams[2],
        toss: { winner: "England", decision: "field" },
        result: "England won by 6 wickets",
        innings: [
            {
                ...createInningsData(1, "t1", "India", 158, 8, 20, 0, "COMPLETED"),
                batsmen: [],
                bowlers: [],
            },
            {
                ...createInningsData(2, "t3", "England", 162, 4, 19, 2, "COMPLETED"),
                batsmen: [],
                bowlers: [],
            },
        ],
    },
    {
        id: "m6",
        seriesName: "T20I Series - Australia vs Pakistan",
        matchNumber: "3rd T20I",
        format: "T20I",
        status: "UPCOMING",
        venue: "Sydney Cricket Ground",
        city: "Sydney",
        startDate: "2026-03-05T09:00:00Z",
        team1: teams[1],
        team2: teams[5],
        innings: [],
    },
    {
        id: "m7",
        seriesName: "ODI Series - NZ vs SL",
        matchNumber: "2nd ODI",
        format: "ODI",
        status: "UPCOMING",
        venue: "Hagley Oval",
        city: "Christchurch",
        startDate: "2026-03-08T03:00:00Z",
        team1: teams[4],
        team2: teams[6],
        innings: [],
    },
    {
        id: "m8",
        seriesName: "Border-Gavaskar Trophy 2025-26",
        matchNumber: "2nd Test",
        format: "TEST",
        status: "COMPLETED",
        venue: "Adelaide Oval",
        city: "Adelaide",
        startDate: "2026-02-20T04:00:00Z",
        team1: teams[1],
        team2: teams[0],
        toss: { winner: "India", decision: "bat" },
        result: "India won by 7 wickets",
        innings: [],
    },
];

// --- SERIES ---
export const series: Series[] = [
    {
        id: "s1",
        name: "Border-Gavaskar Trophy 2025-26",
        format: "TEST",
        startDate: "2026-02-10",
        endDate: "2026-03-22",
        teams: [teams[0], teams[1]],
        matches: matches.filter(m => m.seriesName.includes("Border-Gavaskar")),
    },
    {
        id: "s2",
        name: "ICC Champions Trophy 2026",
        format: "ODI",
        startDate: "2026-02-19",
        endDate: "2026-03-09",
        teams: [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
        matches: matches.filter(m => m.seriesName.includes("Champions Trophy")),
    },
    {
        id: "s3",
        name: "T20I Series - India vs England",
        format: "T20I",
        startDate: "2026-01-22",
        endDate: "2026-02-03",
        teams: [teams[0], teams[2]],
        matches: matches.filter(m => m.seriesName.includes("T20I Series - India vs England")),
    },
];

// --- RANKINGS ---
export const rankings: Ranking[] = [
    // Test Batting
    { rank: 1, player: players.find(p => p.id === "p11"), rating: 897, previousRank: 1, format: "TEST", category: "batting" },
    { rank: 2, player: players.find(p => p.id === "p6"), rating: 882, previousRank: 2, format: "TEST", category: "batting" },
    { rank: 3, player: players.find(p => p.id === "p16"), rating: 867, previousRank: 4, format: "TEST", category: "batting" },
    { rank: 4, player: players.find(p => p.id === "p1"), rating: 843, previousRank: 3, format: "TEST", category: "batting" },
    { rank: 5, player: players.find(p => p.id === "p10"), rating: 836, previousRank: 5, format: "TEST", category: "batting" },
    // Test Bowling
    { rank: 1, player: players.find(p => p.id === "p3"), rating: 908, previousRank: 1, format: "TEST", category: "bowling" },
    { rank: 2, player: players.find(p => p.id === "p15"), rating: 866, previousRank: 2, format: "TEST", category: "bowling" },
    { rank: 3, player: players.find(p => p.id === "p7"), rating: 856, previousRank: 3, format: "TEST", category: "bowling" },
    { rank: 4, player: players.find(p => p.id === "p13"), rating: 812, previousRank: 5, format: "TEST", category: "bowling" },
    { rank: 5, player: players.find(p => p.id === "p19"), rating: 798, previousRank: 4, format: "TEST", category: "bowling" },
    // ODI Batting
    { rank: 1, player: players.find(p => p.id === "p18"), rating: 891, previousRank: 1, format: "ODI", category: "batting" },
    { rank: 2, player: players.find(p => p.id === "p1"), rating: 857, previousRank: 2, format: "ODI", category: "batting" },
    { rank: 3, player: players.find(p => p.id === "p11"), rating: 845, previousRank: 3, format: "ODI", category: "batting" },
    { rank: 4, player: players.find(p => p.id === "p2"), rating: 832, previousRank: 4, format: "ODI", category: "batting" },
    { rank: 5, player: players.find(p => p.id === "p25"), rating: 798, previousRank: 8, format: "ODI", category: "batting" },
    // T20I Batting
    { rank: 1, player: players.find(p => p.id === "p30"), rating: 895, previousRank: 1, format: "T20I", category: "batting" },
    { rank: 2, player: players.find(p => p.id === "p18"), rating: 862, previousRank: 2, format: "T20I", category: "batting" },
    { rank: 3, player: players.find(p => p.id === "p14"), rating: 835, previousRank: 3, format: "T20I", category: "batting" },
    // Team Rankings
    { rank: 1, team: teams[0], rating: 121, previousRank: 1, format: "TEST", category: "team" },
    { rank: 2, team: teams[1], rating: 116, previousRank: 2, format: "TEST", category: "team" },
    { rank: 3, team: teams[2], rating: 111, previousRank: 3, format: "TEST", category: "team" },
    { rank: 4, team: teams[3], rating: 108, previousRank: 4, format: "TEST", category: "team" },
    { rank: 5, team: teams[4], rating: 105, previousRank: 5, format: "TEST", category: "team" },
    { rank: 1, team: teams[0], rating: 118, previousRank: 1, format: "ODI", category: "team" },
    { rank: 2, team: teams[1], rating: 114, previousRank: 2, format: "ODI", category: "team" },
    { rank: 3, team: teams[2], rating: 112, previousRank: 3, format: "ODI", category: "team" },
    { rank: 4, team: teams[5], rating: 105, previousRank: 5, format: "ODI", category: "team" },
    { rank: 5, team: teams[4], rating: 102, previousRank: 4, format: "ODI", category: "team" },
];

// --- COMMENTARY ---
export const commentary: CommentaryBall[] = [
    { overNumber: 52, ballNumber: 1, bowler: "Pat Cummins", batsman: "Shubman Gill", runs: 0, extras: 0, isWicket: false, commentary: "Good length delivery outside off, Gill leaves it alone. Excellent discipline.", timestamp: "2026-03-01T12:45:00Z" },
    { overNumber: 52, ballNumber: 2, bowler: "Pat Cummins", batsman: "Shubman Gill", runs: 0, extras: 0, isWicket: false, commentary: "Back of a length, angling in. Gill gets behind the line, solid defence.", timestamp: "2026-03-01T12:46:00Z" },
    { overNumber: 52, ballNumber: 3, bowler: "Pat Cummins", batsman: "Shubman Gill", runs: 1, extras: 0, isWicket: false, commentary: "Punched through the covers! Single taken. Beautiful timing from Gill.", timestamp: "2026-03-01T12:47:00Z" },
    { overNumber: 51, ballNumber: 1, bowler: "Mitchell Starc", batsman: "Shubman Gill", runs: 4, extras: 0, isWicket: false, commentary: "FOUR! Starc strays on the pads and Gill flicks it through midwicket. Gorgeous shot!", timestamp: "2026-03-01T12:40:00Z" },
    { overNumber: 51, ballNumber: 2, bowler: "Mitchell Starc", batsman: "Shubman Gill", runs: 0, extras: 0, isWicket: false, commentary: "Swinging back in, Gill plays and misses! That was close to the edge.", timestamp: "2026-03-01T12:41:00Z" },
    { overNumber: 51, ballNumber: 3, bowler: "Mitchell Starc", batsman: "Shubman Gill", runs: 0, extras: 0, isWicket: false, commentary: "Full and wide, left alone outside off. Good judgement.", timestamp: "2026-03-01T12:41:30Z" },
    { overNumber: 51, ballNumber: 4, bowler: "Mitchell Starc", batsman: "Shubman Gill", runs: 1, extras: 0, isWicket: false, commentary: "Nudged to midwicket, quick single. Gill reaches his fifty earlier partnership continues.", timestamp: "2026-03-01T12:42:00Z" },
    { overNumber: 51, ballNumber: 5, bowler: "Mitchell Starc", batsman: "Rishabh Pant", runs: 0, extras: 0, isWicket: false, commentary: "Short ball at Pant, he ducks under it comfortably. Good bouncer.", timestamp: "2026-03-01T12:43:00Z" },
    { overNumber: 51, ballNumber: 6, bowler: "Mitchell Starc", batsman: "Rishabh Pant", runs: 1, extras: 0, isWicket: false, commentary: "Worked away to square leg. Single to end the over.", timestamp: "2026-03-01T12:44:00Z" },
    { overNumber: 50, ballNumber: 1, bowler: "Pat Cummins", batsman: "Shubman Gill", runs: 0, extras: 0, isWicket: false, commentary: "Good length outside off, left alone. Cummins probing.", timestamp: "2026-03-01T12:35:00Z" },
    { overNumber: 50, ballNumber: 2, bowler: "Pat Cummins", batsman: "Shubman Gill", runs: 1, extras: 0, isWicket: false, commentary: "Pushed to mid-on for a single. Nice rotation of strike.", timestamp: "2026-03-01T12:36:00Z" },
    { overNumber: 50, ballNumber: 3, bowler: "Pat Cummins", batsman: "Rishabh Pant", runs: 0, extras: 0, isWicket: false, commentary: "Pant defends cautiously. Very unlike him but smart play.", timestamp: "2026-03-01T12:37:00Z" },
    { overNumber: 50, ballNumber: 4, bowler: "Pat Cummins", batsman: "Rishabh Pant", runs: 0, extras: 0, isWicket: false, commentary: "Another dot. Cummins is building pressure here.", timestamp: "2026-03-01T12:37:30Z" },
    { overNumber: 50, ballNumber: 5, bowler: "Pat Cummins", batsman: "Rishabh Pant", runs: 2, extras: 0, isWicket: false, commentary: "Driven through cover! Two runs. Pant picks his spot.", timestamp: "2026-03-01T12:38:00Z" },
    { overNumber: 50, ballNumber: 6, bowler: "Pat Cummins", batsman: "Rishabh Pant", runs: 1, extras: 0, isWicket: false, commentary: "Tucked off the pads for a single to square leg.", timestamp: "2026-03-01T12:39:00Z" },
];

// --- PREDICTIONS ---
export const predictions: Record<string, PredictionData> = {
    m1: {
        team1Probability: 38,
        team2Probability: 45,
        drawProbability: 17,
        predictedScore: "India trail by 114 runs with 6 wickets remaining",
        keyFactors: [
            "Travis Head's 152 puts Australia in strong position",
            "Bumrah's 4 wickets kept Australia in check",
            "Gill-Pant partnership crucial for India",
            "Pitch showing signs of uneven bounce on Day 3",
            "India historically strong chasers at MCG",
        ],
        momentum: [45, 42, 38, 35, 38, 42, 45, 48, 45, 42, 38, 35, 33, 35, 38],
    },
    m2: {
        team1Probability: 55,
        team2Probability: 45,
        drawProbability: 0,
        predictedScore: "Pakistan require 132 runs from 130 balls",
        keyFactors: [
            "Root's century anchored England's innings",
            "Babar looking set for a big score",
            "Required rate very manageable at 6.09",
            "England spinners could be key in middle overs",
            "Dubai pitch slowing down",
        ],
        momentum: [55, 52, 48, 50, 52, 55, 58, 55, 52, 48, 45, 48, 50, 52, 55],
    },
};

// --- COMMUNITY POSTS ---
export const communityPosts: CommunityPost[] = [
    { id: "cp1", userId: "u1", userName: "CricketFanatic99", content: "Gill is playing the innings of his life! What a knock at the MCG. India could pull off something special here.", matchId: "m1", likes: 234, comments: 45, createdAt: "2026-03-01T12:30:00Z", isVerified: false },
    { id: "cp2", userId: "u2", userName: "CricketAnalyst", content: "Bumrah's spell in the first innings was absolutely world class. 4/68 with a new ball on a flat MCG deck is phenomenal bowling.", matchId: "m1", likes: 567, comments: 89, createdAt: "2026-03-01T10:00:00Z", isVerified: true },
    { id: "cp3", userId: "u3", userName: "ScoutPro", content: "Root's century today was a masterclass in ODI batting. His ability to rotate strike and then accelerate in the death overs is unmatched.", matchId: "m2", likes: 189, comments: 23, createdAt: "2026-03-01T09:00:00Z", isVerified: true },
    { id: "cp4", userId: "u4", userName: "FantasyKing", content: "If you didn't captain Suryakumar in the 1st T20I, you missed out on massive fantasy points. 96 off 52 balls is just insane!", matchId: "m4", likes: 321, comments: 56, createdAt: "2026-01-22T18:00:00Z" },
    { id: "cp5", userId: "u5", userName: "TestCricketLover", content: "The Border-Gavaskar Trophy never disappoints. This series has been incredible so far. India winning in Adelaide and now this epic battle at the MCG.", likes: 445, comments: 67, createdAt: "2026-03-01T08:00:00Z" },
];

// --- NOTIFICATIONS ---
export const notifications: Notification[] = [
    { id: "n1", type: "WICKET", title: "WICKET! Kohli dismissed", body: "Virat Kohli b Starc 34 (52). India 145/3 in the 2nd innings.", matchId: "m1", playerId: "p1", read: false, createdAt: "2026-03-01T11:30:00Z" },
    { id: "n2", type: "MILESTONE", title: "Root reaches century!", body: "Joe Root scores his 51st ODI century. ENG 225/4 in 42 overs.", matchId: "m2", playerId: "p11", read: false, createdAt: "2026-03-01T09:15:00Z" },
    { id: "n3", type: "MATCH_START", title: "Match Started", body: "BGT 3rd Test - AUS vs IND at MCG has begun. Australia won the toss and elected to bat.", matchId: "m1", read: true, createdAt: "2026-02-28T04:00:00Z" },
    { id: "n4", type: "MILESTONE", title: "Head reaches 150!", body: "Travis Head smashes his way to 150*. AUS 290/6 on Day 1.", matchId: "m1", playerId: "p9", read: true, createdAt: "2026-02-28T10:20:00Z" },
    { id: "n5", type: "TOSS", title: "Toss Result", body: "Australia won the toss and elected to bat at the MCG.", matchId: "m1", read: true, createdAt: "2026-02-28T03:45:00Z" },
];

// --- FANTASY PLAYERS ---
export const fantasyPlayers: FantasyPlayer[] = [
    { ...players[0], credits: 10.5, points: 156, selectedBy: 87 },
    { ...players[1], credits: 10.0, points: 89, selectedBy: 72 },
    { ...players[2], credits: 10.5, points: 234, selectedBy: 91 },
    { ...players[3], credits: 9.0, points: 178, selectedBy: 65 },
    { ...players[4], credits: 8.5, points: 67, selectedBy: 45 },
    { ...players[5], credits: 9.5, points: 198, selectedBy: 78 },
    { ...players[24], credits: 9.5, points: 145, selectedBy: 56 },
    { ...players[25], credits: 9.0, points: 167, selectedBy: 68 },
    { ...players[6], credits: 9.5, points: 134, selectedBy: 62 },
    { ...players[7], credits: 10.0, points: 201, selectedBy: 85 },
    { ...players[8], credits: 9.5, points: 112, selectedBy: 58 },
    { ...players[9], credits: 9.0, points: 89, selectedBy: 42 },
];

// --- HELPER FUNCTIONS ---
export function getTeamById(id: string): Team | undefined {
    return teams.find(t => t.id === id);
}

export function getPlayerById(id: string): Player | undefined {
    return players.find(p => p.id === id);
}

export function getPlayerStatsByPlayerId(playerId: string): PlayerStats[] {
    return playerStats.filter(ps => ps.playerId === playerId);
}

export function getMatchById(id: string): Match | undefined {
    return matches.find(m => m.id === id);
}

export function getPlayersByTeamId(teamId: string): Player[] {
    return players.filter(p => p.teamId === teamId);
}

export function getLiveMatches(): Match[] {
    return matches.filter(m => m.status === "LIVE");
}

export function getUpcomingMatches(): Match[] {
    return matches.filter(m => m.status === "UPCOMING");
}

export function getCompletedMatches(): Match[] {
    return matches.filter(m => m.status === "COMPLETED");
}

export function getRankingsByFormatAndCategory(format: string, category: string): Ranking[] {
    return rankings.filter(r => r.format === format && r.category === category).sort((a, b) => a.rank - b.rank);
}

export function getCommentaryForMatch(matchId: string): CommentaryBall[] {
    if (matchId === "m1") return commentary;
    return [];
}

export function getSeriesById(id: string): Series | undefined {
    return series.find(s => s.id === id);
}

export function searchPlayers(query: string): Player[] {
    const lower = query.toLowerCase();
    return players.filter(
        p => p.name.toLowerCase().includes(lower) || p.country.toLowerCase().includes(lower)
    );
}

export function searchAll(query: string): { players: Player[]; teams: Team[]; matches: Match[] } {
    const lower = query.toLowerCase();
    return {
        players: players.filter(p => p.name.toLowerCase().includes(lower)),
        teams: teams.filter(t => t.name.toLowerCase().includes(lower) || t.shortName.toLowerCase().includes(lower)),
        matches: matches.filter(m => m.seriesName.toLowerCase().includes(lower) || m.venue.toLowerCase().includes(lower)),
    };
}
