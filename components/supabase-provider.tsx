"use client"

import { createContext, useContext, type ReactNode } from "react"

interface SupabaseContextType {
  supabase: any // Mock supabase client
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  // Mock Supabase client
  const supabase = {
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
    auth: {
      signIn: () => Promise.resolve({ user: null, error: null }),
      signUp: () => Promise.resolve({ user: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ user: null, error: null }),
    },
  }

  return <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
}

export function useSupabaseClient() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error("useSupabaseClient must be used within a SupabaseProvider")
  }
  return context.supabase
}