import { FC, ReactNode } from "react"
import empty from "../assets/empty-state.webp"

type Props = {
  children: ReactNode
}

const EmptyState: FC<Props> = ({ children}) => {
  return (
    <div className="empty-state">
      <img src={empty} alt="no data found here" />
      { children }
    </div>
  )
}

export default EmptyState