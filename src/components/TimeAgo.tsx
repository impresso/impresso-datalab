import { DateTime } from "luxon"
import { useEffect, useMemo, useState } from "react"

export interface TimeAgoProps {
  value: string | number | Date | DateTime
  locale?: string
  fallback?: string
  className?: string
  prefix?: string
  suffix?: string
  refreshRate?: number
  updateIntervalMs?: number
  showAbsoluteOnHover?: boolean
}

const parseDateTime = (value: TimeAgoProps["value"]): DateTime | null => {
  if (DateTime.isDateTime(value)) {
    return value.isValid ? value : null
  }

  if (value instanceof Date) {
    const dateTime = DateTime.fromJSDate(value)
    return dateTime.isValid ? dateTime : null
  }

  if (typeof value === "number") {
    const dateTime = DateTime.fromMillis(value)
    return dateTime.isValid ? dateTime : null
  }

  if (typeof value === "string") {
    const fromIso = DateTime.fromISO(value)
    if (fromIso.isValid) {
      return fromIso
    }

    const fromRfc = DateTime.fromRFC2822(value)
    if (fromRfc.isValid) {
      return fromRfc
    }

    const fromHttp = DateTime.fromHTTP(value)
    if (fromHttp.isValid) {
      return fromHttp
    }
  }

  return null
}

const TimeAgo: React.FC<TimeAgoProps> = ({
  value,
  locale = "en",
  fallback = "N/A",
  className,
  prefix = "",
  suffix = "",
  refreshRate,
  updateIntervalMs,
  showAbsoluteOnHover = true,
}) => {
  const parsedDate = useMemo(() => parseDateTime(value), [value])
  const [now, setNow] = useState<DateTime>(DateTime.now())
  const effectiveRefreshRate = refreshRate ?? updateIntervalMs ?? 3_600_000

  useEffect(() => {
    if (effectiveRefreshRate <= 0) {
      return
    }

    const timer = setInterval(() => {
      setNow(DateTime.now())
    }, effectiveRefreshRate)

    return () => {
      clearInterval(timer)
    }
  }, [effectiveRefreshRate])

  if (!parsedDate) {
    return <time className={className}>{fallback}</time>
  }

  const relative =
    parsedDate.setLocale(locale).toRelative({ base: now }) ?? fallback

  return (
    <time
      className={className}
      dateTime={parsedDate.toISO() ?? undefined}
      title={
        showAbsoluteOnHover
          ? parsedDate
              .setLocale(locale)
              .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
          : undefined
      }
    >
      {prefix}
      {relative}
      {suffix}
    </time>
  )
}

export default TimeAgo
