import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Landing from "./pages/Landing"
import Callback from "./pages/Callback"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/callback", element: <Callback /> }
    ],
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App