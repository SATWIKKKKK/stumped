// CricketData.org API Client
// Primary API — 100 hits/day free tier
// NEVER call these directly from components — use cached-cricket.ts instead

const BASE_URL = "https://api.cricketdata.org/api/v1"
const API_KEY = process.env.CRICKETDATA_API_KEY || ""

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function apiFetch(path: string): Promise<any> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 0 }, // always fresh, cache handled by Redis
  })
  if (!res.ok) {
    throw new Error(`CricketAPI error: ${res.status} ${path}`)
  }
  return res.json()
}

export const CricketAPI = {
  // Matches
  currentMatches: (offset = 0) =>
    apiFetch(`/currentMatches?apikey=${API_KEY}&offset=${offset}`),

  matchInfo: (id: string) =>
    apiFetch(`/match_info?apikey=${API_KEY}&id=${id}`),

  matchScorecard: (id: string) =>
    apiFetch(`/match_scorecard?apikey=${API_KEY}&id=${id}`),

  matchBallByBall: (id: string, inning: number) =>
    apiFetch(`/match_bbb?apikey=${API_KEY}&id=${id}&inning=${inning}`),

  // Players
  playerInfo: (id: string) =>
    apiFetch(`/players?apikey=${API_KEY}&id=${id}`),

  playerStats: (id: string) =>
    apiFetch(`/players_info?apikey=${API_KEY}&id=${id}`),

  playerSearch: (name: string) =>
    apiFetch(
      `/players?apikey=${API_KEY}&search=${encodeURIComponent(name)}`
    ),

  // Series & Rankings
  seriesList: (offset = 0) =>
    apiFetch(`/series?apikey=${API_KEY}&offset=${offset}`),

  seriesInfo: (id: string) =>
    apiFetch(`/series_info?apikey=${API_KEY}&id=${id}`),

  iccRankings: (
    type: "batsmen" | "bowlers" | "allrounders",
    format: "test" | "odi" | "t20"
  ) => apiFetch(`/rankings?apikey=${API_KEY}&type=${type}&format=${format}`),
}
