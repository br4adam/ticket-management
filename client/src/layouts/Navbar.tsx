import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"
import avatars from "../assets/avatars"
import defaultAvatar from "../assets/default-avatar.png"
import LoginButton from "../components/LoginButton"
import useGlobal from "../hooks/useGlobal"
import { user$ } from "../states/user"

const Navbar = () => {
  const user = useGlobal(user$)
  const avatar = avatars.find(a => a.includes(user?.avatar!)) || defaultAvatar

  return (
    <header>
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="logo icon" />
          <p>Ticket Management</p>
        </div>
        <nav>
          { user && user.company
          ? <>
              <Link to="/dashboard" className="link">Dashboard</Link>
              <Link to="/tickets" className="link">Tickets</Link>
              <Link to="/create" className="outline">+ New Ticket</Link>
              <Link to="/profile"><img src={avatar} alt="avatar" /></Link>
            </>
          : <LoginButton type="outline">Login</LoginButton>
          }
        </nav>
      </div>
    </header>
  )
}

export default Navbar