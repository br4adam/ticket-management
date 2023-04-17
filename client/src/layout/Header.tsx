import { useState } from "react"
import logo from "../assets/logo.svg"
import useWindowSize from "../hooks/useWindowSize"
import { HiMenu, HiX } from "react-icons/hi"
import Navigation from "./Navigation"
import MobileNavigation from "./MobileNavigation"

const Header = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const { width } = useWindowSize()

  const onClick = (() => setIsOpen(prev => !prev))

  return (
    <header>
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="logo icon" />
          <p>Ticket Management</p>
        </div>
        { width > 768
          ? <Navigation />
          : <>
            { isOpen ? <HiX className="hamburger" onClick={onClick} /> : <HiMenu className="hamburger" onClick={onClick} /> }
            <MobileNavigation isOpen={isOpen} onClick={onClick} />
            </>
        }
      </div>
    </header>
  )
}

export default Header