import { FC, useEffect, useState } from "react"
import { getStatistics, type StatisticListType } from "../../api/charts"
import { HiChartBar, HiOutlineChartBar } from "react-icons/hi2"
import Stat from "./Stat"

type Props = {
  showCharts: boolean
  setShowCharts: React.Dispatch<React.SetStateAction<boolean>>
}

const Statistics: FC<Props> = ({ showCharts, setShowCharts }) => {
  const [ statistics, setStatistics ] = useState<StatisticListType>([])
  
  useEffect(() => {
    const loadStatistics = async () => {
      const data = await getStatistics()
      if (!data) return
      setStatistics(data)
    }
    loadStatistics()
  }, [])

  const toggle = () => setShowCharts(prev => !prev)

  const order = ["total", "open", "pending", "closed"]
  const sortedStatistics = statistics.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status))
  
  return (
    <section className="statistics">
      <div className="wrapper">
        <div className="title">
          <h1>Dashboard</h1>
          { showCharts ? <HiChartBar onClick={toggle} /> : <HiOutlineChartBar onClick={toggle} className="hidden" /> }
        </div>
        <div className="statgrid">
        { sortedStatistics.map(stat => <Stat key={stat.status} {...stat} />)}
        </div>
      </div>
    </section>
  )
}

export default Statistics