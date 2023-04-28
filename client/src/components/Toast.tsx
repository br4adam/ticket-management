import { Toaster } from "react-hot-toast"

const Toast = () => {
  return (
    <Toaster 
      position="top-center"
      containerStyle={{ marginTop: "0.25rem", userSelect: "none", textAlign: "center" }}
      toastOptions={{ 
        className: "toast", 
        duration: 2500, 
        success: { iconTheme: { primary: "#59c240", secondary: "#ffffff" } },
        error: { iconTheme: { primary: "#fa5353", secondary: "#ffffff" } },
      }}
    />
  )
}

export default Toast