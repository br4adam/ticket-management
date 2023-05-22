import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Suspense } from "react"
import RootLayout from "./layout/RootLayout"
import ProtectedRoute from "./layout/ProtectedRoute"
import Landing from "./pages/Landing"
import Callback from "./pages/Callback"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"
import Create from "./pages/Create"
import TicketList from "./pages/TicketList"
import Ticket from "./pages/Ticket"
import Profile from "./pages/Profile"
import Users from "./pages/Users"
import NotFound from "./pages/NotFound"
import Loader from "./components/Loader"

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <Suspense fallback={<Loader />}>
        <RootLayout />
      </Suspense>,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/callback", element: <Callback /> },
      { element: <ProtectedRoute />,
        children: [
          { path: "/onboarding", element: <Onboarding /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/create", element: <Create /> },
          { path: "/tickets", element: <TicketList /> },
          { path: "/tickets/:id", element: <Ticket /> },
          { path: "/profile", element: <Profile /> },
          { path: "/users", element: <Users /> },
        ] 
      },
      { path: "/*", element: <NotFound /> }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App