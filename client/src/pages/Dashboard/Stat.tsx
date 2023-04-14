import { FC } from "react"
import total from "../../assets/status-total.svg"
import open from "../../assets/status-open.svg"
import pending from "../../assets/status-pending.svg"
import closed from "../../assets/status-closed.svg"

type Props = {
  status: string,
  count: number
}

const Stat: FC<Props> = ( stat ) => {
  const statusIcons = [ total, open, pending, closed ]
  const icon = statusIcons.find(icon => icon.includes(stat.status))
  const status = `${stat.status.charAt(0).toUpperCase()}${stat.status.slice(1)} Tickets`

  return (
    <div className="stat">
      <div className="icon">
        <img src={icon} alt="stat icon" />
      </div>
      <div className="data">
        <p>{ stat.count }</p>
        <p>{ status }</p>
      </div>
    </div>
  )
}

export default Stat