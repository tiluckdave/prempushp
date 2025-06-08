import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated")
    setIsAuthenticated(authStatus === "true")
    setIsLoading(false)
  }, [])

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuthenticated", "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem("adminAuthenticated")
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  return { isAuthenticated, isLoading, login, logout }
}

