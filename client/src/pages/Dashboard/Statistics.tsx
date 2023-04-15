import { FC, useEffect, useState } from "react"
import { getStatistics, type StatisticListType } from "../../api/charts"
import { HiEye, HiEyeOff } from "react-icons/hi"
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
  
  return (
    <section className="statistics">
      <div className="wrapper">
        <div className="titlebar">
          <h1>Dashboard</h1>
          { showCharts ? <HiEye onClick={toggle} /> : <HiEyeOff onClick={toggle} className="hidden" /> }
        </div>
        <div className="statgrid">
        { statistics.map(stat => <Stat key={stat.status} {...stat} />)}
        </div>
      </div>
    </section>
  )
}

export default Statistics