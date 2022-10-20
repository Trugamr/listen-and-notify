import { json } from '@remix-run/node'
import { getEnv } from './env.server'

const { API_KEY } = getEnv()

export function authorizeRequest(request: Request) {
  if (API_KEY) {
    const requestApiKey = request.headers.get('X-API-KEY')
    if (requestApiKey === null) {
      throw json(
        { error: 'API key not present in X-API-KEY header' },
        { status: 401 },
      )
    }
    if (requestApiKey !== API_KEY) {
      throw json({ error: 'Invalid API key' }, { status: 401 })
    }
  }
}
