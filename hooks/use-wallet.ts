"use client"

import { useWallet as useWalletFromProvider } from "@/components/wallet-provider"

export function useWallet() {
  return useWalletFromProvider()
}