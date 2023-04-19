import { useState, useEffect } from "react"

type Response<T> = {
  data: T | null
  loading: boolean
  error: string | null,
  refresh: () => Promise<void>
}

const useApi = <T>(func: () => Promise<{ data: T, status: number }>, initialState: T | null = null ): Response<T> => {
  const [ data, setData ] = useState<T | null>(initialState)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<string | null>(null)

  const callApi = async () => {
    setLoading(true)
    try {
      const response: { data: T, status: number } = await func()
      if (response.status !== 200) throw new Error(`${response.data}`)
      setData(response.data)
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  const refresh = () => callApi()

  return { data, loading, error, refresh }
}

export default useApi