import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Landing from "./pages/Landing"
import Callback from "./pages/Callback"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/callback", element: <Callback /> },
      { path: "/onboarding", element: <Onboarding /> },
      { path: "/dashboard", element: <Dashboard /> }
    ],
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App