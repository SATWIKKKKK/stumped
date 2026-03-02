import { Redis } from "@upstash/redis"

// Upstash Redis client — serverless, edge-compatible
// Free tier: 10k commands/day

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})
