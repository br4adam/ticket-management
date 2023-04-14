import Statistics from "./Statistics"
import NewTicketsChart from "./BarChart"
import StatusChart from "./LineChart"
import { useState } from "react"

const Dashboard = () => {
  const [ showCharts, setShowCharts ] = useState<boolean>(true)
  return (
    <>
      <Statistics showCharts={showCharts} setShowCharts={setShowCharts} />
      <div className="dashboard wrapper">
        { showCharts && <div className="charts">
          <NewTicketsChart />
          <StatusChart />
        </div>
        }
      </div>
    </>
  )
}

export default Dashboard