import { useNavigate } from "react-router-dom"
import { logout } from "../../states/user"

const Logout = () => {
  const navigate = useNavigate()
  
  const logOut = () => {
    logout()
    navigate(0)
  }

  return (
    <div className="logout container">
      <div>
        <h2>Logout</h2>
        <p>Thank you for using the app! When you're ready to log out, simply click the Logout button.</p>
      </div>
      <button className="solid" onClick={logOut}>Logout</button>
    </div>
  )
}

export default Logout