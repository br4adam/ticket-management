const formatDate = (dateString: string, type?: string): string => {
  const date = new Date(dateString)
  if (type === "short") return date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
  return date.toLocaleDateString("en-US", { weekday: "long", month: "2-digit", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric", hour12: false })
}

export default formatDate