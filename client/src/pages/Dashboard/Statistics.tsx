import { FC } from "react"
import { getStatistics, type StatisticListType } from "../../api/charts"
import Stat from "./Stat"
import useApi from "../../hooks/useApi"

const initialState = [{ status: "total", count: 0 }, { status: "open", count: 0 }, { status: "pending", count: 0 }, { status: "closed", count: 0 }]

type Props = {
  showCharts: boolean
  setShowCharts: React.Dispatch<React.SetStateAction<boolean>>
}

const Statistics: FC<Props> = ({ showCharts, setShowCharts }) => {
  const { data: statistics } = useApi<StatisticListType>(getStatistics, initialState)
  
  const toggle = () => setShowCharts(prev => !prev)

  return (
    <section className="statistics">
      <div className="wrapper">
        <div className="titlebar">
          <h1>Dashboard</h1>
          { showCharts ? <button onClick={toggle}>Hide charts</button> : <button onClick={toggle} className="hidden">Show charts</button> }
        </div>
        <div className="statgrid">
        { statistics && statistics.map(stat => <Stat key={stat.status} stat={stat} />)}
        </div>
      </div>
    </section>
  )
}

export default Statistics