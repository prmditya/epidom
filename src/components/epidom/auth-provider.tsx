"use client"

import type React from "react"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  name: string
  email: string
  businessName?: string
  address?: string
  avatarUrl?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: {
    name: string
    email: string
    password: string
    businessName?: string
    address?: string
  }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = "epidom_auth_v1"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setUser(JSON.parse(raw))
      }
    } catch {}
  }, [])

  const login = useCallback(async (email: string, _password: string) => {
    // Mocked login
    const mockUser: User = { name: email.split("@")[0] || "User", email }
    setUser(mockUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
  }, [])

  const register = useCallback(async ({ name, email, password: _password, businessName, address }) => {
    const mockUser: User = { name, email, businessName, address }
    setUser(mockUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function useRequireAuth(redirectTo = "/login") {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace(redirectTo)
    }
  }, [user, router, redirectTo])
  return user
}
