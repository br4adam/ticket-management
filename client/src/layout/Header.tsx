import { useState } from "react"
import { Menu, Close } from "@carbon/icons-react"
import logo from "../assets/logo.svg"
import useWindowSize from "../hooks/useWindowSize"
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
          <p><span>Ticket</span> Management</p>
        </div>
        { width > 768
          ? <Navigation />
          : <>
            { isOpen ? <Close size="24" className="hamburger" onClick={onClick} /> : <Menu size="24" className="hamburger" onClick={onClick} /> }
            <MobileNavigation isOpen={isOpen} onClick={onClick} />
            </>
        }
      </div>
    </header>
  )
}

export default Header