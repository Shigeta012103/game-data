import type { RawgPaginatedResponse } from '../types/rawg'

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(`API Error ${status}: ${message}`)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new ApiError(response.status, response.statusText)
  }
  return response.json() as Promise<T>
}

export async function fetchAllPages<T>(
  baseUrl: string,
  maxPages: number,
): Promise<T[]> {
  const results: T[] = []
  let nextUrl: string | null = baseUrl
  let currentPage = 0

  while (nextUrl && currentPage < maxPages) {
    const response: RawgPaginatedResponse<T> =
      await fetchJson(nextUrl)
    results.push(...response.results)
    nextUrl = response.next
    currentPage++
  }

  return results
}
