import { useEffect, useState } from "react"
import Stat from "./Stat"

type Statistic = {
  status: string,
  count: number
}

const Statistics = () => {
  const [ statistics, setStatistics ] = useState<Statistic[]>([])

  const getStatistics = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/charts/statistics`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }})
    const data = await response.json()
    setStatistics(data)
  }
  
  useEffect(() => {
    getStatistics()
  }, [])

  const order = ["total", "open", "pending", "closed"]
  const sortedStatistics = statistics.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status))
  
  return (
    <section className="statistics">
      <div className="wrapper">
        <h1>Dashboard</h1>
        <div className="statgrid">
        { sortedStatistics.map(stat => <Stat key={stat.status} {...stat} />)}
        </div>
      </div>
    </section>
  )
}

export default Statistics