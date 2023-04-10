const getDateBefore = (days: number): Date => {
  const todayDate = new Date().setHours(0, 0, 0, 0)
  const beforeDate = new Date(todayDate - days * 24 * 60 * 60 * 1000)
  return beforeDate
}

export default getDateBefore