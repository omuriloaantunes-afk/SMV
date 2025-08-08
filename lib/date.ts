export function formatTodayLongPT(date?: Date) {
  // Use uma data fixa se nenhuma for fornecida para evitar problemas de hidratação
  const targetDate = date || new Date(2025, 7, 8) // 8 de agosto de 2025
  // ex: quinta-feira, 8 de agosto de 2025
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(targetDate)
    .replace(/^\w/, (c) => c.toUpperCase())
}

export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function getMonthMatrix(year: number, monthIndexZero: number) {
  // Monday-first calendar
  const first = new Date(year, monthIndexZero, 1)
  const last = new Date(year, monthIndexZero + 1, 0)
  // JS getDay: 0 Sun ... 6 Sat; we want 1 Mon ... 7 Sun
  const weekday = (first.getDay() + 6) % 7 // 0 for Monday
  const daysInMonth = last.getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < weekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, monthIndexZero, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}
