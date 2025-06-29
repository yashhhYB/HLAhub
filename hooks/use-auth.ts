"use client"

import { useAuth as useAuthFromProvider } from "@/components/auth-provider"

export function useAuth() {
  return useAuthFromProvider()
}