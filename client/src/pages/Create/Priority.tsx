import { FC } from "react"
import capitalize from "../../utils/capitalize"

type Props = {
  item: {
    priority: string
    description: string
  }
}

const Priority: FC<Props> = ({ item }) => {
  return (
    <div className="priority-info">
      <div className="priority-name">
        <div className={item.priority}></div>
        <p>{ capitalize(item.priority) }</p>
      </div>
      <p>{ item.description }</p>
    </div>
  )
}

export default Priority