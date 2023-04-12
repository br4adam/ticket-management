import { Link } from "react-router-dom";
import { FC, ReactNode } from "react";
import createGoogleUrl from "../utils/createGoogleUrl"

type Props = {
  children: ReactNode,
  type: string
}

const LoginButton: FC<Props> = ({ children, type }) => {
  const url = createGoogleUrl()

  return (
    <Link to={url} className={type}>
      { children }
    </Link>
  )
}
export default LoginButton