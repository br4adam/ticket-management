import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import useGlobal from "../hooks/useGlobal"
import { user$, logout } from "../states/user"
import createGoogleUrl from "../utils/createGoogleUrl"

type Props = {
  isOpen: boolean,
  onClick: () => void
}

const MobileNavigation: FC<Props> = ({ isOpen, onClick }) => {
  const user = useGlobal(user$)
  const navigate = useNavigate()

  const logOut = () => {
    logout()
    onClick()
    navigate(0)
  }

  return (
    <nav className={ isOpen ? "mobile slide" : "mobile" }>
      { user?.company
      ? <>
          <Link to="/dashboard" onClick={onClick} className="link">Dashboard</Link>
          <Link to="/tickets" onClick={onClick} className="link">Tickets</Link>
          <Link to="/create" onClick={onClick} className="link">Create Ticket</Link>
          <Link to="/profile" onClick={onClick} className="link">Profile</Link>
          <button onClick={logOut} className="link">Logout</button>
        </>
      : <Link to={createGoogleUrl()} className="linke">Login</Link>
      }
    </nav>
  )
}

export default MobileNavigation