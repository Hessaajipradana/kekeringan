import { useState, useEffect, createContext, useContext } from "react"

const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const { toasts, setToasts } = context

  const toast = ({ title, description, duration = 5000, ...props }) => {
    const id = Math.random().toString(36).substr(2, 9)
    
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, duration, ...props },
    ])

    if (duration) {
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        )
      }, duration)
    }
  }

  return { toast, toasts }
}