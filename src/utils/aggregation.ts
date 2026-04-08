export function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  const groups: Record<string, T[]> = {}

  for (const item of items) {
    const key = keyFn(item)
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
  }

  return groups
}

export function countBy<T>(
  items: T[],
  keyFn: (item: T) => string,
): Record<string, number> {
  const counts: Record<string, number> = {}

  for (const item of items) {
    const key = keyFn(item)
    counts[key] = (counts[key] ?? 0) + 1
  }

  return counts
}

export function percentageShare(
  counts: Record<string, number>,
): Record<string, number> {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
  if (total === 0) return {}

  const percentages: Record<string, number> = {}
  for (const [key, count] of Object.entries(counts)) {
    percentages[key] = Math.round((count / total) * 10000) / 100
  }

  return percentages
}

function quantile(sorted: number[], q: number): number {
  const position = (sorted.length - 1) * q
  const lower = Math.floor(position)
  const upper = Math.ceil(position)
  const fraction = position - lower

  if (lower === upper) return sorted[lower]
  return sorted[lower] * (1 - fraction) + sorted[upper] * fraction
}

export function fiveNumberSummary(
  values: number[],
): [number, number, number, number, number] {
  if (values.length === 0) return [0, 0, 0, 0, 0]

  const sorted = [...values].sort((a, b) => a - b)

  return [
    sorted[0],
    quantile(sorted, 0.25),
    quantile(sorted, 0.5),
    quantile(sorted, 0.75),
    sorted[sorted.length - 1],
  ]
}
