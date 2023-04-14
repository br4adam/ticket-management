import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { getBarChartData } from "../../api/charts"
import { getDateBefore, getDates, formatDate } from "../../utils/handleDates"

type ChartDataType = {
  date: string,
  count: number,
}

const NewTicketsChart = () => {
  const [ chartData, setChartData ] = useState<ChartDataType[]>([])

  useEffect(() => {
    const getChartData = async () => {
      const data = await getBarChartData()
      setChartData(data)
    }
    getChartData()
  }, [])

  const datesArray = getDates(getDateBefore(7), new Date())
  const filledChartData = datesArray.map((date) => {
    const ticketCount = chartData?.find(chartData => chartData.date === formatDate(date))
    return { date: formatDate(date), count: ticketCount ? ticketCount.count : 0 }
  })

  return (
    <div className="chart">
      <p>New Tickets</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filledChartData}>
          <CartesianGrid vertical={false} stroke="#666666" />
          <XAxis height={24} dy={8} dataKey="date" tick={{ fill: "white" }} tickLine={false} interval={0} />
          <YAxis width={32} dx={-8} axisLine={false} tick={{ fill: "white" }} allowDecimals={false} />
          <Tooltip offset={8} 
            cursor={{ fill: "#ffffff10" }}
            wrapperStyle={{ outline: "none"}}
            contentStyle={{ backgroundColor: "#262829", border: "1px solid #666666", borderRadius: "0.25rem" }} />
          <Bar dataKey="count" fill="#7befff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default NewTicketsChart