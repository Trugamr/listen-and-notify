import { getEnv } from './env.server'

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = getEnv()

type SendMessageResponse = {
  ok: true
  result: {
    message_id: number
    sender_chat: {
      id: number
      title: string
      type: 'channel'
    }
    chat: {
      id: number
      title: string
      type: 'channel'
    }
    date: number
    text: string
  }
}

type SendMessageOptions = {
  parseMode?: 'html'
}

export async function sendMessage(
  text: string,
  options: SendMessageOptions = {},
) {
  const url = new URL(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
  )
  url.searchParams.set('chat_id', TELEGRAM_CHAT_ID)
  url.searchParams.set('text', text)
  if (options.parseMode) {
    url.searchParams.set('parse_mode', options.parseMode)
  }

  const response = await fetch(url)
  const json: SendMessageResponse = await response.json()

  return json
}
