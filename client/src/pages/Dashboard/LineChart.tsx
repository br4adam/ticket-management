import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"
import { getLineChartData } from "../../api/charts"
import { getDateBefore, getDates, formatDate } from "../../utils/handleDates"

type ChartDataType = {
  date: string,
  open: number,
  pending: number,
  closed: number
}

const StatusChart = () => {
  const [ chartData, setChartData ] = useState<ChartDataType[]>([])

  useEffect(() => {
    const getChartData = async () => {
      const data = await getLineChartData()
      setChartData(data)
    }
    getChartData()
  }, [])

  const datesArray = getDates(getDateBefore(7), new Date())
  const filledChartData = datesArray.map((date) => {
    const ticketCount = chartData?.find(chartData => chartData.date === formatDate(date))
    return { date: formatDate(date), open: ticketCount ? ticketCount.open : 0, closed: ticketCount ? ticketCount.closed : 0, pending: ticketCount ? ticketCount.pending : 0 }
  })

  return (
    <div className="chart">
      <p>Tickets by status</p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filledChartData}>
          <CartesianGrid vertical={false} stroke="#666666" />
          <XAxis height={24} dy={8} padding={{ left: 8, right: 16 }} tickLine={false} dataKey="date" tick={{ fill: "white" }} interval={0} />
          <YAxis width={32} dx={-8} axisLine={false} tick={{ fill: "white" }} allowDecimals={false} />
          <Tooltip offset={8} 
            cursor={{ stroke: "#666666" }}
            wrapperStyle={{ outline: "none" }}
            contentStyle={{ backgroundColor: "#262829", border: "1px solid #666666", borderRadius: "0.25rem" }} />
          <Line type="monotone" dataKey="open" stroke="#acffaa" dot={false} strokeWidth={2} activeDot={{ stroke: "#262829", strokeWidth: 2 }} />
          <Line type="monotone" dataKey="pending" stroke="#ffe693" dot={false} strokeWidth={2} activeDot={{ stroke: "#262829", strokeWidth: 2 }} />
          <Line type="monotone" dataKey="closed" stroke="#e0c8ff" dot={false} strokeWidth={2} activeDot={{ stroke: "#262829", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatusChart