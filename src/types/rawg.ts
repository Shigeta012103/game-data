export interface RawgPaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface RawgPlatformRef {
  platform: {
    id: number
    name: string
    slug: string
  }
}

export interface RawgGenreRef {
  id: number
  name: string
  slug: string
}

export interface RawgGame {
  id: number
  name: string
  released: string | null
  metacritic: number | null
  platforms: RawgPlatformRef[] | null
  genres: RawgGenreRef[] | null
}

export interface GamesQueryParams {
  dates?: string
  platforms?: string
  metacritic?: string
  ordering?: string
  pageSize?: number
  page?: number
}
