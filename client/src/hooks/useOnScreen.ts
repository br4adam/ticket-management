import { useEffect, useState, RefObject } from "react"

const useOnScreen = (ref: RefObject<Element>, rootMargin = "0px") => {
  const [ isIntersecting, setIsIntersecting ] = useState<boolean>(true)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { setIsIntersecting(entry.isIntersecting) }, { rootMargin })
    if (ref.current) observer.observe(ref.current) 
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return isIntersecting
}

export default useOnScreen