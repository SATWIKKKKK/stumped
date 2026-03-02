import { redis } from "@/lib/redis"
import { CricketAPI } from "./cricket-api"

// Redis-cached wrappers for CricketData.org API
// Use THESE functions everywhere in the app — never call CricketAPI directly

async function cachedFetch<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number
): Promise<T> {
  try {
    // Try cache first
    const cached = await redis.get(cacheKey)
    if (cached) {
      return (typeof cached === "string" ? JSON.parse(cached) : cached) as T
    }
  } catch {
    // Redis unavailable — fall through to API
  }

  // Cache miss — hit the API
  const data = await fetcher()

  try {
    await redis.setex(cacheKey, ttlSeconds, JSON.stringify(data))
  } catch {
    // Redis write failed — continue with fresh data
  }

  return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiResponse = { status: string; data: any }

export const Cricket = {
  getLiveMatches: () =>
    cachedFetch<ApiResponse>(
      "live:matches",
      () => CricketAPI.currentMatches(),
      30 // 30s for live data
    ),

  getMatchInfo: (id: string) =>
    cachedFetch<ApiResponse>(
      `match:info:${id}`,
      () => CricketAPI.matchInfo(id),
      30
    ),

  getScorecard: (id: string) =>
    cachedFetch<ApiResponse>(
      `match:scorecard:${id}`,
      () => CricketAPI.matchScorecard(id),
      15 // 15s for live scorecard
    ),

  getBallByBall: (id: string, inning: number) =>
    cachedFetch<ApiResponse>(
      `match:bbb:${id}:${inning}`,
      () => CricketAPI.matchBallByBall(id, inning),
      10
    ),

  getPlayer: (id: string) =>
    cachedFetch<ApiResponse>(
      `player:${id}`,
      () => CricketAPI.playerInfo(id),
      86400 // 24h for player info
    ),

  getPlayerStats: (id: string) =>
    cachedFetch<ApiResponse>(
      `player:stats:${id}`,
      () => CricketAPI.playerStats(id),
      3600 // 1h
    ),

  searchPlayers: (name: string) =>
    cachedFetch<ApiResponse>(
      `player:search:${name.toLowerCase()}`,
      () => CricketAPI.playerSearch(name),
      3600
    ),

  getSeries: () =>
    cachedFetch<ApiResponse>(
      "series:list",
      () => CricketAPI.seriesList(),
      3600
    ),

  getSeriesInfo: (id: string) =>
    cachedFetch<ApiResponse>(
      `series:${id}`,
      () => CricketAPI.seriesInfo(id),
      3600
    ),

  getRankings: (
    type: "batsmen" | "bowlers" | "allrounders",
    format: "test" | "odi" | "t20"
  ) =>
    cachedFetch<ApiResponse>(
      `rankings:${type}:${format}`,
      () => CricketAPI.iccRankings(type, format),
      3600 // 1h for rankings
    ),
}
