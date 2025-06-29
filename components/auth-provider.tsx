"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: "user" | "admin" | "doctor"
  created_at: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  isDoctor: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, fullName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      // Simulate checking session
      const storedUser = localStorage.getItem("hlahub_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error checking user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate login
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        full_name:
          email === "admin@hlahub.com"
            ? "Admin User"
            : email === "doctor@hlahub.com"
              ? "Dr. Sarah Johnson"
              : "Healthcare User",
        role: email === "admin@hlahub.com" ? "admin" : email === "doctor@hlahub.com" ? "doctor" : "user",
        created_at: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("hlahub_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, fullName: string) => {
    setIsLoading(true)
    try {
      // Simulate registration
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        full_name: fullName,
        role: "user",
        created_at: new Date().toISOString(),
      }

      setUser(mockUser)
      localStorage.setItem("hlahub_user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hlahub_user")
  }

  const isAdmin = user?.role === "admin"
  const isDoctor = user?.role === "doctor"

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
        isDoctor,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}