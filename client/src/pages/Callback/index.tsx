import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Loader from "../../components/Loader"
import { login, user$ } from "../../states/user"
import useGlobal from "../../hooks/useGlobal"

const Callback = () => {
  const user = useGlobal(user$)
  const [ searchParams ] = useSearchParams()
  const code = searchParams.get("code")
  const navigate = useNavigate()

  useEffect(() => {
    if (code) login(code)
  }, [])

  useEffect(() => {
    if (user) {
      if (!user.company) return navigate("/onboarding")
      navigate("/dashboard")
    }
  }, [user])

  return (
    <div className="callback wrapper">
      <Loader />
    </div>
  )
}

export default Callback