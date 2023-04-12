import { FC, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Loader from "../../components/Loader"
import { user$, login } from "../../states/user"
import useGlobal from "../../hooks/useGlobal"
import { useNavigate } from "react-router-dom"

const Callback: FC = () => {
  const user = useGlobal(user$, null)

  const [ searchParams ] = useSearchParams()
  const code = searchParams.get("code")

  const navigate = useNavigate()

  useEffect(() => {
    if (code) login(code)
    // if (user && (!user.company || !user.avatar)) return navigate("/completeprofile")
    // navigate("/dashboard")
  }, [])

  return (
    <div className="callback wrapper">
      <Loader />
    </div>
  )
}

export default Callback