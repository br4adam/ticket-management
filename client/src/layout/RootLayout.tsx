import { Outlet } from "react-router-dom"
import Header from "./Header"
import Toast from "../components/Toast"

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Toast />
      </main>
    </>
  )
}

export default RootLayout