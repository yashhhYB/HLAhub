"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Calendar, ExternalLink } from "lucide-react"
import { VoiceAIControls } from "@/components/voice-ai-controls"

interface NFTBadge {
  id: string
  name: string
  description: string
  image: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  dateEarned: string
  criteria: string
}

const mockNFTs: NFTBadge[] = [
  {
    id: "1",
    name: "First Match",
    description: "Awarded for your first successful HLA match",
    image: "🏆",
    rarity: "Common",
    dateEarned: "2024-01-15",
    criteria: "Complete your first HLA compatibility match"
  },
  {
    id: "2",
    name: "Lab Pioneer",
    description: "Completed HLA testing at a certified laboratory",
    image: "🔬",
    rarity: "Rare",
    dateEarned: "2024-01-10",
    criteria: "Complete HLA typing test at any certified lab"
  },
  {
    id: "3",
    name: "Blockchain Verified",
    description: "Your medical data is verified on Algorand blockchain",
    image: "⛓️",
    rarity: "Epic",
    dateEarned: "2024-01-08",
    criteria: "Have your medical records verified on blockchain"
  }
]

export default function NFTPage() {
  const [nfts] = useState<NFTBadge[]>(mockNFTs)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "Rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">NFT Achievement Badges</h1>
          <p className="text-gray-600 dark:text-gray-300">Your blockchain-verified healthcare achievements</p>
        </div>
        <VoiceAIControls 
          text="Welcome to your NFT achievement badges. These are blockchain-verified tokens that represent your healthcare milestones and accomplishments."
          compact={true}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Your Achievements
          </CardTitle>
          <CardDescription>
            Blockchain-verified badges representing your healthcare journey milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <Card key={nft.id} className="hover:shadow-lg transition-shadow border-2">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{nft.image}</div>
                  <CardTitle className="text-lg">{nft.name}</CardTitle>
                  <div className="flex justify-center">
                    <Badge className={getRarityColor(nft.rarity)}>{nft.rarity}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    {nft.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Earned: {new Date(nft.dateEarned).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>Criteria: {nft.criteria}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Blockchain
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Achievements</CardTitle>
          <CardDescription>
            Complete these milestones to earn more NFT badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg opacity-60">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🤝</div>
                <div>
                  <h4 className="font-medium">Community Helper</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Help 5 other patients with their questions
                  </p>
                  <Badge variant="outline" className="mt-2">Locked</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg opacity-60">
              <div className="flex items-center gap-3">
                <div className="text-2xl">💎</div>
                <div>
                  <h4 className="font-medium">Perfect Match</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Achieve 95%+ HLA compatibility match
                  </p>
                  <Badge variant="outline" className="mt-2">Locked</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}