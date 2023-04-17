const timeAgo = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()

  const diff = now.getTime() - date.getTime()
  const minutesAgo = Math.round(diff / (1000 * 60))
  const hoursAgo = Math.round(diff / (1000 * 60 * 60))
  const daysAgo = Math.round(diff / (1000 * 60 * 60 * 24))

  if (daysAgo > 0) return date.toLocaleDateString("en-US", { weekday: "long", month: "2-digit", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric", hour12: false })
  else if (hoursAgo > 0) return `${hoursAgo} hours ago`
  else if (minutesAgo > 0) return `${minutesAgo} minutes ago`
  return "just now"
}

export default timeAgo