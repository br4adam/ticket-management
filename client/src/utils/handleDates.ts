const getDateBefore = (days: number): Date => {
  const todayDate = new Date().setHours(0, 0, 0, 0)
  const beforeDate = new Date(todayDate - days * 24 * 60 * 60 * 1000)
  return beforeDate
}

const getDates = (startDate: Date, endDate: Date): Date[] => {
  const datesArray = []
  let currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    datesArray.push(currentDate)
    currentDate = new Date(currentDate)
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return datesArray
}

const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${month}.${day}.`
}

export { getDateBefore, getDates, formatDate }