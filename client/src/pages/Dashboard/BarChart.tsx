import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { getBarChartData, type BarChartDataType } from "../../api/charts"

const NewTicketsChart = () => {
  const [ chartData, setChartData ] = useState<BarChartDataType>([])

  useEffect(() => {
    const getChartData = async () => {
      const data = await getBarChartData()
      if (!data) return
      setChartData(data)
    }
    getChartData()
  }, [])

  return (
    <div className="chart">
      <p>New Tickets</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} stroke="#666666" />
          <XAxis height={24} dy={8} dataKey="date" tick={{ fill: "white" }} tickLine={false} interval={0} />
          <YAxis width={32} dx={-8} axisLine={false} tick={{ fill: "white" }} allowDecimals={false} />
          <Tooltip offset={8} 
            cursor={{ fill: "#ffffff10" }}
            wrapperStyle={{ outline: "none"}}
            contentStyle={{ backgroundColor: "#262829", border: "1px solid #666666", borderRadius: "0.25rem" }} />
          <Bar dataKey="count" fill="#7befff" radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default NewTicketsChart