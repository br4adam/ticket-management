import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Landing from "./pages/Landing"
import Callback from "./pages/Callback"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"
import Create from "./pages/Create"
import TicketList from "./pages/TicketList"
import Ticket from "./pages/Ticket"
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
      { path: "/tickets/:id", element: <Ticket /> },
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