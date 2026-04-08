export const RAWG_BASE_URL = 'https://api.rawg.io/api'

export const PLATFORM_IDS = {
  PC: 4,
  PLAYSTATION_4: 18,
  PLAYSTATION_5: 187,
  XBOX_ONE: 1,
  XBOX_SERIES: 186,
  NINTENDO_SWITCH: 7,
} as const

export const PLATFORM_FAMILIES: Record<string, number[]> = {
  PC: [PLATFORM_IDS.PC],
  PlayStation: [PLATFORM_IDS.PLAYSTATION_4, PLATFORM_IDS.PLAYSTATION_5],
  Xbox: [PLATFORM_IDS.XBOX_ONE, PLATFORM_IDS.XBOX_SERIES],
  Nintendo: [PLATFORM_IDS.NINTENDO_SWITCH],
}

export const ALL_PLATFORM_IDS = Object.values(PLATFORM_FAMILIES).flat()

export const MAX_PAGE_SIZE = 40
export const MAX_PAGES_PER_QUERY = 5
export const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000
export const CACHE_KEY_PREFIX = 'rawg'

export const DEFAULT_START_YEAR = 2019
export const DEFAULT_END_YEAR = 2024
export const MIN_YEAR = 2015

export const PLATFORM_COLORS: Record<string, string> = {
  PC: '#6b7280',
  PlayStation: '#003791',
  Xbox: '#107c10',
  Nintendo: '#e60012',
}
