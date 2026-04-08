export interface PlatformShareSeries {
  platform: string
  colorHex: string
  counts: number[]
}

export interface GenreSeries {
  genre: string
  counts: number[]
}

export type HeatmapDataPoint = [string, number]

export interface BoxPlotEntry {
  genre: string
  summary: [number, number, number, number, number]
}
