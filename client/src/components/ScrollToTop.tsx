import { useState, useEffect } from "react"
import { ArrowUp } from "@carbon/icons-react"

const ScrollToTop = () => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) setIsVisible(true)
    else setIsVisible(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <>
      { isVisible && <button className="solid scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top"><ArrowUp size={24} /></button> }
    </>
  )
}

export default ScrollToTop