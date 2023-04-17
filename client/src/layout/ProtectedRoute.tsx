import { Navigate, Outlet } from "react-router-dom"
import useGlobal from "../hooks/useGlobal"
import { user$ } from "../states/user"

const ProtectedRoute = () => {
  const user = useGlobal(user$)
  
  if (!user) return <Navigate to="/" replace />
  return <Outlet />
}

export default ProtectedRoute