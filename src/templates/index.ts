import type { Template } from '@/types'
import future from './future.json'
import movie from './movie.json'
import advertisement from './advertisement.json'
import news from './news.json'
import travel from './travel.json'
import fairytale from './fairytale.json'
import webtoon from './webtoon.json'

// New templates can be added by dropping a JSON file here and
// registering it in this array — nothing else needs to change.
export const templates: Template[] = [
  future,
  movie,
  advertisement,
  news,
  travel,
  fairytale,
  webtoon,
]

export function getTemplateById(id: string | null): Template | undefined {
  if (!id) return undefined
  return templates.find((t) => t.id === id)
}
