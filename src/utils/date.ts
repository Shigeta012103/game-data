const MONTH_PAD_LENGTH = 2
const DAY_PAD_LENGTH = 2
const YEAR_INDEX = 0
const MONTH_INDEX = 1
const DATE_SEPARATOR = '-'

export function formatDate(year: number, month: number, day: number): string {
  const paddedMonth = String(month).padStart(MONTH_PAD_LENGTH, '0')
  const paddedDay = String(day).padStart(DAY_PAD_LENGTH, '0')
  return `${year}${DATE_SEPARATOR}${paddedMonth}${DATE_SEPARATOR}${paddedDay}`
}

export function extractYearMonth(dateString: string): { year: number; month: number } {
  const parts = dateString.split(DATE_SEPARATOR)
  return {
    year: Number(parts[YEAR_INDEX]),
    month: Number(parts[MONTH_INDEX]),
  }
}
