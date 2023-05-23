import { ReactNode } from "react"
import empty from "../assets/empty-state.webp"

type Props = {
  children: ReactNode
  loading: boolean
}

const EmptyState = ({ children, loading = false }: Props) => {
  if (loading) return null

  return (
    <div className="empty-state">
      <img src={empty} alt="no data found here" />
      { children }
    </div>
  )
}

export default EmptyState