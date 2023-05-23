import total from "../../assets/status-total.svg"
import open from "../../assets/status-open.svg"
import pending from "../../assets/status-pending.svg"
import closed from "../../assets/status-closed.svg"
import capitalize from "../../utils/capitalize"

type Props = {
  stat: {
    status: string
    count: number
  }
}

const Stat = ({ stat }: Props) => {
  const statusIcons = [ total, open, pending, closed ]
  const icon = statusIcons.find(icon => icon.includes(stat.status))

  return (
    <div className="stat">
      <div className={`icon ${stat.status}`}>
        <img src={icon} alt="stat icon" />
      </div>
      <div className="data">
        <p>{ stat.count }</p>
        <p>{ `${capitalize(stat.status)} Tickets` }</p>
      </div>
    </div>
  )
}

export default Stat