import { FC } from "react"
import { Link } from "react-router-dom"
import useGlobal from "../hooks/useGlobal"
import { user$ } from "../states/user"
import LoginButton from "../components/LoginButton"

type Props = {
  isOpen: boolean,
  onClick: () => void
}

const MobileNavigation: FC<Props> = ({ isOpen, onClick }) => {
  const user = useGlobal(user$)

  return (
    <nav className={ isOpen ? "mobile slide" : "mobile" }>
      { user?.company
      ? <>
          <Link to="/dashboard" onClick={onClick} className="link">Dashboard</Link>
          <Link to="/tickets" onClick={onClick} className="link">Tickets</Link>
          <Link to="/create" onClick={onClick} className="link">Create Ticket</Link>
          <Link to="/profile" onClick={onClick} className="link">Profile</Link>
        </>
      : <LoginButton type="link">Login</LoginButton>
      }
    </nav>
  )
}

export default MobileNavigation