import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Landing from "./pages/Landing"
import Callback from "./pages/Callback"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"
import Create from "./pages/Create"
import TicketList from "./pages/TicketList"
import NotFound from "./pages/NotFound"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/callback", element: <Callback /> },
      { path: "/onboarding", element: <Onboarding /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/create", element: <Create /> },
      { path: "/tickets", element: <TicketList /> },
      { path: "/*", element: <NotFound /> }
    ],
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App