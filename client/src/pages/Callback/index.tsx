import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Loader from "../../components/Loader"
import { login } from "../../states/user"

const Callback = () => {
  const [ searchParams ] = useSearchParams()
  const code = searchParams.get("code")
  const navigate = useNavigate()

  useEffect(() => {
    if (code) login(code, {
      onSuccess: () => navigate("/onboarding"),
      onError: () => navigate("/")
    })
  }, [])

  return (
    <div className="callback wrapper">
      <Loader />
    </div>
  )
}

export default Callback