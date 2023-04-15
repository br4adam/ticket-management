import { FC, useEffect, useState } from "react"
import { getStatistics, type StatisticListType } from "../../api/charts"
import Stat from "./Stat"

type Props = {
  showCharts: boolean
  setShowCharts: React.Dispatch<React.SetStateAction<boolean>>
}

const Statistics: FC<Props> = ({ showCharts, setShowCharts }) => {
  const [ statistics, setStatistics ] = useState<StatisticListType>([{ status: "total", count: 0 }, { status: "open", count: 0 }, { status: "pending", count: 0 }, { status: "closed", count: 0 }])
  
  useEffect(() => {
    const loadStatistics = async () => {
      const data = await getStatistics()
      if (!data) return
      setStatistics(data)
    }
    loadStatistics()
  }, [])

  const toggle = () => setShowCharts(prev => !prev)
  
  return (
    <section className="statistics">
      <div className="wrapper">
        <div className="titlebar">
          <h1>Dashboard</h1>
          { showCharts ? <button onClick={toggle}>hide charts</button> : <button onClick={toggle} className="hidden">show charts</button> }
        </div>
        <div className="statgrid">
        { statistics.map(stat => <Stat key={stat.status} {...stat} />)}
        </div>
      </div>
    </section>
  )
}

export default Statistics