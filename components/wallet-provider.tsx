"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
  signMessage: (message: string) => Promise<string>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)

  const connect = async () => {
    // Simulate wallet connection
    const mockAddress = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    setAddress(mockAddress)
    setIsConnected(true)
    setBalance(125.5)
  }

  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
    setBalance(0)
  }

  const signMessage = async (message: string): Promise<string> => {
    // Simulate message signing
    return "mock_signature_" + Date.now()
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        signMessage,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Export the context for other components that might need it
export { WalletContext }