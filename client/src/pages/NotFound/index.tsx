import { Link } from "react-router-dom"
import notfound from "../../assets/notfound.webp"

const NotFound = () => {
  return (
    <div className="notfound wrapper">
      <img src={notfound} alt="page not found" />
      <Link to="/" className="solid">Back to Home</Link>
    </div>
  )
}

export default NotFound