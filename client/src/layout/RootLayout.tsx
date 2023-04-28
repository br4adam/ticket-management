import { Outlet } from "react-router-dom"
import Header from "./Header"
import Toast from "../components/Toast"
import ScrollToTop from "../components/ScrollToTop"

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <ScrollToTop/>
        <Toast />
      </main>
    </>
  )
}

export default RootLayout