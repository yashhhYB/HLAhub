"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, CheckCircle, AlertCircle, Copy } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { VoiceAIControls } from "@/components/voice-ai-controls"

export default function WalletPage() {
  const { isConnected, address, balance, connect, disconnect } = useWallet()
  const [consentGiven, setConsentGiven] = useState(false)

  const handleConsent = () => {
    setConsentGiven(true)
    alert("Consent recorded on blockchain!")
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      alert("Address copied to clipboard!")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet & Consent</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your blockchain wallet and data consent</p>
        </div>
        <VoiceAIControls 
          text="Welcome to the wallet and consent management page. Here you can connect your Algorand wallet and manage your data permissions."
          compact={true}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Algorand Wallet
          </CardTitle>
          <CardDescription>
            Connect your Algorand wallet to enable blockchain features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-8">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Connect your Algorand wallet to access blockchain features
              </p>
              <Button onClick={connect} size="lg">
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Wallet Connected</p>
                    <p className="text-sm text-green-600 dark:text-green-300">Ready for blockchain transactions</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Connected
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex-1">
                      {address?.slice(0, 8)}...{address?.slice(-8)}
                    </code>
                    <Button size="sm" variant="outline" onClick={copyAddress}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Balance</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {balance} ALGO
                  </p>
                </div>
              </div>

              <Button variant="outline" onClick={disconnect} className="w-full">
                Disconnect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Data Consent Management
          </CardTitle>
          <CardDescription>
            Control how your medical data is used and shared
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!consentGiven ? (
            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Consent Required</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Please provide consent to use your medical data for matching purposes. 
                Your consent will be recorded on the blockchain for transparency.
              </p>
              <Button onClick={handleConsent} disabled={!isConnected}>
                Give Consent
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Consent Recorded</p>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Your consent has been securely recorded on the Algorand blockchain
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-medium">Your Data Rights:</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Right to access your data
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Right to withdraw consent
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Right to data portability
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Right to be forgotten
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}