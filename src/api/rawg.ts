import type { RawgGame, GamesQueryParams } from '../types/rawg'
import {
  RAWG_BASE_URL,
  MAX_PAGE_SIZE,
  MAX_PAGES_PER_QUERY,
} from './constants'
import { fetchAllPages } from './client'

function getApiKey(): string {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY
  if (!apiKey) {
    throw new Error('VITE_RAWG_API_KEY is not set. See .env.example.')
  }
  return apiKey
}

export function buildGamesUrl(params: GamesQueryParams): string {
  const url = new URL(`${RAWG_BASE_URL}/games`)
  url.searchParams.set('key', getApiKey())
  url.searchParams.set('page_size', String(params.pageSize ?? MAX_PAGE_SIZE))

  if (params.dates) url.searchParams.set('dates', params.dates)
  if (params.platforms) url.searchParams.set('platforms', params.platforms)
  if (params.metacritic) url.searchParams.set('metacritic', params.metacritic)
  if (params.ordering) url.searchParams.set('ordering', params.ordering)
  if (params.page) url.searchParams.set('page', String(params.page))

  return url.toString()
}

export async function fetchGamesByYear(
  year: number,
  maxPages = MAX_PAGES_PER_QUERY,
): Promise<RawgGame[]> {
  const url = buildGamesUrl({
    dates: `${year}-01-01,${year}-12-31`,
    ordering: '-added',
  })
  return fetchAllPages<RawgGame>(url, maxPages)
}

export async function fetchGamesWithMetacritic(
  year: number,
  maxPages = MAX_PAGES_PER_QUERY,
): Promise<RawgGame[]> {
  const url = buildGamesUrl({
    dates: `${year}-01-01,${year}-12-31`,
    metacritic: '1,100',
    ordering: '-metacritic',
  })
  return fetchAllPages<RawgGame>(url, maxPages)
}
