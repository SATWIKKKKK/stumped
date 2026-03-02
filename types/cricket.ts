// Types for the Stumped cricket platform
// Shaped from CricketData.org API responses

// ─── API Response Types ─────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  status: string
  info: {
    hitsToday: number
    hitsUsed: number
    hitsLimit: number
    credits: number
    server: number
    queryTime: number
  }
  data: T
}

// ─── Match Types (from currentMatches endpoint) ─────────────────
export interface CricketMatch {
  id: string
  name: string
  status: string
  venue: string
  date: string
  dateTimeGMT: string
  matchType: string
  teams: string[]
  teamInfo?: TeamInfo[]
  score?: MatchScore[]
  series_id: string
  fantasyEnabled: boolean
  bbbEnabled: boolean
  hasSquad: boolean
  matchStarted: boolean
  matchEnded: boolean
}

export interface TeamInfo {
  name: string
  shortname: string
  img: string
}

export interface MatchScore {
  r: number  // runs
  w: number  // wickets
  o: number  // overs
  inning: string
}

// ─── Match Scorecard Types ──────────────────────────────────────
export interface ScorecardData {
  id: string
  name: string
  status: string
  venue: string
  teams: string[]
  scorecard: ScorecardInnings[]
}

export interface ScorecardInnings {
  inning: string
  batting: BatsmanEntry[]
  bowling: BowlerEntry[]
  totals: {
    R: number
    W: number
    O: number
    RR: string
  }
}

export interface BatsmanEntry {
  batsman: string
  dismissal: string
  r: number
  b: number
  "4s": number
  "6s": number
  sr: string
}

export interface BowlerEntry {
  bowler: string
  o: number
  m: number
  r: number
  w: number
  eco: string
}

// ─── Player Types ───────────────────────────────────────────────
export interface CricketPlayer {
  id: string
  name: string
  country: string
  role?: string
  battingStyle?: string
  bowlingStyle?: string
  dateOfBirth?: string
  placeOfBirth?: string
  playerImg?: string
  stats?: PlayerStatsByType[]
}

export interface PlayerStatsByType {
  fn: string   // format name e.g. "test", "odi", "t20i"
  matchtype: string
  stat: {
    m?: string   // matches
    inn?: string // innings
    no?: string  // not outs
    runs?: string
    hs?: string  // highest score
    avg?: string
    bf?: string  // balls faced
    sr?: string  // strike rate
    "100s"?: string
    "200s"?: string
    "50s"?: string
    "4s"?: string
    "6s"?: string
    ct?: string  // catches
    st?: string  // stumpings
    wkts?: string  // wickets
    bbi?: string   // best bowling innings
    bbm?: string   // best bowling match
    econ?: string  // economy
    "5w"?: string  // 5 wicket hauls
    "10w"?: string
  }
}

// ─── Rankings Types ─────────────────────────────────────────────
export interface RankingEntry {
  rank: string
  name: string
  country: string
  rating: string
  points: string
}

// ─── Series Types ───────────────────────────────────────────────
export interface CricketSeries {
  id: string
  name: string
  startDate: string
  endDate: string
  odi: number
  t20: number
  test: number
  squads: number
  matches: number
}

// ─── Ball by Ball Types ─────────────────────────────────────────
export interface BallByBallEntry {
  id: number
  batsmanStriker: {
    name: string
    niceName: string
    runs: number
    ballsFaced: number
  }
  batsmanNonStriker: {
    name: string
    niceName: string
  }
  bowler: {
    name: string
    niceName: string
    overs: number
    wickets: number
    runsConceded: number
  }
  over: number
  ball: number
  score: number
  extras: number
  isWicket: boolean
  commentary: string
}

// ─── UI Helper Types ────────────────────────────────────────────
export type MatchFormat = "TEST" | "ODI" | "T20I" | "T20" | "LIST_A" | "FC"
export type MatchStatus = "UPCOMING" | "LIVE" | "COMPLETED" | "ABANDONED"
export type PlayerRole = "BATSMAN" | "BOWLER" | "ALL_ROUNDER" | "WICKET_KEEPER"

