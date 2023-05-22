import { FC } from "react"
import capitalize from "../../utils/capitalize"

type Props = {
  item: {
    priority: string
    title: string
    description: string
  }
}

const Priority: FC<Props> = ({ item }) => {
  return (
    <div className="priority-info">
      <div className="priority-name">
        <div className={item.priority}></div>
        <p>{ capitalize(item.title) }</p>
      </div>
      <p>{ item.description }</p>
    </div>
  )
}

export default Priority