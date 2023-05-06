import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getLineChartData, type LineChartDataType } from "../../api/charts"
import useApi from "../../hooks/useApi"

const StatusChart = () => {
  const { data: chartData } = useApi<LineChartDataType>(getLineChartData)

  if (!chartData) return null

  return (
    <div className="chart">
      <h2>Change of status</h2>
      <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} stroke="#666666" />
        <XAxis height={24} dy={8} padding={{ left: 8, right: 16 }} tickLine={false} dataKey="date" tick={{ fill: "white" }} interval={0} />
        <YAxis width={32} dx={-8} axisLine={false} tick={{ fill: "white" }} allowDecimals={false} />
        <Tooltip offset={8} 
          cursor={{ stroke: "#666666" }}
          wrapperStyle={{ outline: "none" }}
          contentStyle={{ backgroundColor: "#262829", border: "1px solid #666666", borderRadius: "0.25rem" }} />
        <Line type="monotone" dataKey="open" stroke="#b8feb0" dot={false} strokeWidth={2} activeDot={{ stroke: "#262829", strokeWidth: 2 }} isAnimationActive={false} />
        <Line type="monotone" dataKey="pending" stroke="#fddd8d" dot={false} strokeWidth={2} activeDot={{ stroke: "#262829", strokeWidth: 2 }} isAnimationActive={false} />
        <Line type="monotone" dataKey="closed" stroke="#dfcdf8" dot={false} strokeWidth={2} activeDot={{ stroke: "#262829", strokeWidth: 2 }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default StatusChart