import { Link } from "react-router-dom"
import avatars from "../assets/avatars"
import defaultAvatar from "../assets/default-avatar.webp"
import useGlobal from "../hooks/useGlobal"
import { user$ } from "../states/user"
import Avatar from "../components/Avatar"
import createGoogleUrl from "../utils/createGoogleUrl"

const Navigation = () => {
  const user = useGlobal(user$)
  const avatar = avatars.find(a => a.includes(user?.avatar!)) || defaultAvatar
  
  return (
    <nav>
      { user?.company
      ? <>
          <Link to="/dashboard" className="link">Dashboard</Link>
          <Link to="/tickets" className="link">Tickets</Link>
          <Link to="/create" className="outline">+ New Ticket</Link>
          <Link to="/profile"><Avatar image={avatar || ""} /></Link>
        </>
      : <Link to={createGoogleUrl()} className="outline">Login</Link>
      }
    </nav>
  )
}

export default Navigation