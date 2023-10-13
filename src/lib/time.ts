export const fmt = {
  duration:
    new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format,
  compact: new Intl.NumberFormat(undefined, { notation: 'compact' }).format,
  fromNow: new Intl.RelativeTimeFormat(undefined, { numeric: 'always' }),
}

function duration(ms: number) {
  const h = Math.floor(ms / 60 / 60)
  const m = Math.floor((ms / 60) % 60)
  const s = Math.floor(ms % 60)

  if (h > 0) {
    return `${h}:${fmt.duration(m)}:${fmt.duration(s)}`
  }

  return `${m}:${fmt.duration(s)}`
}

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
]

function ago(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return fmt.fromNow.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}

export const time = {
  duration,
  ago,
}
