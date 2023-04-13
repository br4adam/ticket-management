import { useEffect, useState } from "react"
import { BehaviorSubject } from "rxjs"

const useGlobal = <T>(data: BehaviorSubject<T>): T => {
  const [ value, setValue ] = useState<T>(data.getValue())
  
  useEffect(() => {
    const subscription = data.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [])
  return value
}

export default useGlobal