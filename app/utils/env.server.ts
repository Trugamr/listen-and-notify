import { z } from 'zod'

const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string(),
  TELEGRAM_CHAT_ID: z.string(),
})

export function getEnv() {
  return envSchema.parse(process.env)
}
