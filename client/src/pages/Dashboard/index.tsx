import { useState } from "react"
import Statistics from "./Statistics"
import NewTicketsChart from "./BarChart"
import StatusChart from "./LineChart"
import Tickets from "./Tickets"

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
        <Tickets />
      </div>
    </>
  )
}

export default Dashboard