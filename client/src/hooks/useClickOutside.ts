import { useEffect, RefObject } from "react"

type Event = MouseEvent | TouchEvent

const useClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e?.target as Node)) callback()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [ref, callback])
}

export default useClickOutside