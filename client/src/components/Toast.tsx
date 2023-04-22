import { Toaster } from "react-hot-toast"

const Toast = () => {
  return (
    <Toaster 
      position="top-center"
      containerStyle={{ marginTop: "0.25rem", userSelect: "none", textAlign: "center" }}
      toastOptions={{ className: "toast", duration: 2500 }}
    />
  )
}

export default Toast