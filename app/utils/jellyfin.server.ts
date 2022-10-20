import { z } from 'zod'

const itemSchema = z.object({
  ServerId: z.string(),
  ServerName: z.string(),
  ServerVersion: z.string(),
  ServerUrl: z.string(),
  NotificationType: z.enum(['ItemAdded']),
  Timestamp: z.string(),
  UtcTimestamp: z.string(),
  Name: z.string(),
  Overview: z.string(),
  Tagline: z.string(),
  ItemId: z.string(),
  ItemType: z.enum(['Movie', 'Series', 'Season']),
  RunTimeTicks: z.number(),
  RunTime: z.string(),
  Year: z.number(),
})

const movieItemSchema = itemSchema.extend({
  ItemType: z.literal('Movie'),
})
const seriesItemSchema = itemSchema.extend({
  ItemType: z.literal('Series'),
})
const seasonItemSchema = itemSchema.extend({
  ItemType: z.literal('Season'),
  SeriesName: z.string(),
  SeasonNumber: z.number(),
  SeasonNumber00: z.string(),
})

export async function getParsedJellyfinItem(body: unknown) {
  const item = await itemSchema.parseAsync(body)

  switch (item.ItemType) {
    case 'Movie':
      return movieItemSchema.parseAsync(body)
    case 'Series':
      return seriesItemSchema.parseAsync(body)
    case 'Season':
      return seasonItemSchema.parseAsync(body)
  }
}

export async function getJellyfinNotification(
  item: Awaited<ReturnType<typeof getParsedJellyfinItem>>,
) {
  switch (item.ItemType) {
    case 'Movie':
      return {
        title: item.Name,
        subtitle: 'Movie added',
        description: item.Overview,
        poster: `${item.ServerUrl}/Items/${item.ItemId}/Images/Primary`,
      }
    case 'Series':
      return {
        title: item.Name,
        subtitle: 'Series added',
        description: item.Overview,
        poster: `${item.ServerUrl}/Items/${item.ItemId}/Images/Primary`,
      }
    case 'Season':
      return {
        title: item.SeriesName,
        subtitle: `Season ${item.SeasonNumber00} added`,
        poster: `${item.ServerUrl}/Items/${item.ItemId}/Images/Primary`,
      }
  }
}
