import { Outlet } from "react-router-dom"
import Header from "./Header"
import Toast from "../components/Toast"

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toast />
    </>
  )
}

export default RootLayout