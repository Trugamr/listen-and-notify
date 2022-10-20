import type { ActionArgs } from '@remix-run/node'
import { renderToStaticMarkup } from 'react-dom/server'
import { authorizeRequest } from '~/utils/authorize.server'
import {
  getJellyfinNotification,
  getParsedJellyfinItem,
} from '~/utils/jellyfin.server'
import { sendMessage } from '~/utils/telegram.server'

export const action = async ({ request }: ActionArgs) => {
  authorizeRequest(request)

  const body = await request.json()
  const item = await getParsedJellyfinItem(body)
  const notification = await getJellyfinNotification(item)

  const markup = (
    <>
      <a href={notification.poster}>{notification.title}</a>
      <pre>{notification.subtitle}</pre>
      {notification.description}
    </>
  )

  const message = renderToStaticMarkup(markup)

  await sendMessage(message, {
    parseMode: 'html',
  })

  return new Response(message, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export const loader = () => {
  return new Response('👂 listening')
}
