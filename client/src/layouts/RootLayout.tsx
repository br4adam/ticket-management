import { Outlet } from "react-router-dom"
import Header from "./Header"

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default RootLayout