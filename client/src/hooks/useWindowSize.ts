import { useState, useLayoutEffect } from "react"

type WindowSize = {
  width: number,
  height: number
}

const useWindowSize = (): WindowSize => {
  const [ windowSize, setWindowSize ] = useState<WindowSize>({ width: 0, height: 0 });

  const handleSize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useLayoutEffect(() => {
    handleSize()
    window.addEventListener("resize", handleSize)
    return () => window.removeEventListener("resize", handleSize)
  }, [])

  return windowSize
}

export default useWindowSize