import { FC, ReactNode } from "react"
import empty from "../assets/empty-state.webp"

type Props = {
  children: ReactNode,
  loading: boolean
}

const EmptyState: FC<Props> = ({ children, loading = false }) => {
  if (loading) return null

  return (
    <div className="empty-state">
      <img src={empty} alt="no data found here" />
      { children }
    </div>
  )
}

export default EmptyState