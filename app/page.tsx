"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Users,
  Calendar,
  TrendingUp,
  Search,
  TestTube,
  Shield,
  Zap,
  Globe,
  Award,
  ArrowRight,
  Activity,
  Clock,
  Sparkles,
  Brain,
  Lock,
  Bot,
  MessageCircle,
  Star,
} from "lucide-react"
import Link from "next/link"
import { VoiceAssistant } from "@/components/voice-assistant"

export default function HomePage() {
  const [animatedStats, setAnimatedStats] = useState({
    totalMatches: 0,
    activeDonors: 0,
    labBookings: 0,
    successRate: 0,
  })

  useEffect(() => {
    // Animate stats on load
    const timer = setTimeout(() => {
      setAnimatedStats({
        totalMatches: 1243,
        activeDonors: 889,
        labBookings: 153,
        successRate: 94.2,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const recentMatches = [
    {
      id: "HLA-2024-001",
      donor: "Anonymous Donor #1247",
      recipient: "Patient A.",
      compatibility: 96,
      location: "New York, NY",
      timestamp: "2:30 PM, Jan 15",
      status: "verified",
    },
    {
      id: "HLA-2024-002",
      donor: "Anonymous Donor #1248",
      recipient: "Patient B.",
      compatibility: 89,
      location: "Los Angeles, CA",
      timestamp: "3:45 PM, Jan 14",
      status: "pending",
    },
    {
      id: "HLA-2024-003",
      donor: "Anonymous Donor #1249",
      recipient: "Patient C.",
      compatibility: 92,
      location: "Chicago, IL",
      timestamp: "10:20 AM, Jan 13",
      status: "verified",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced algorithms for precise HLA compatibility",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable records and secure data management",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Instant laboratory result processing",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Complete control over medical information",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-8 main-content">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 text-white animate-fade-in-up">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-48 -translate-x-48 animate-float" />

          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 animate-pulse" />
              <Badge className="bg-white/20 text-white border-white/30 animate-shimmer">
                <Sparkles className="mr-1 h-3 w-3" />
                Blockchain-Powered
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4 animate-slide-in-left">
              Welcome to <span className="text-gradient">HLAhub</span>
            </h1>
            <p className="text-xl mb-6 max-w-2xl animate-slide-in-right">
              Revolutionary healthcare platform connecting organ donors and recipients using advanced HLA matching and
              Algorand blockchain technology for complete transparency and trust.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/match">
                <Button size="lg" className="btn-primary">
                  <Search className="mr-2 h-5 w-5" />
                  Find a Match
                </Button>
              </Link>
              <Link href="/lab">
                <Button size="lg" className="btn-outline border-white text-white hover:bg-white hover:text-blue-600">
                  <TestTube className="mr-2 h-5 w-5" />
                  Book Lab Test
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <VoiceAssistant />
          </div>
        </div>

        {/* AI Assistant Ready Banner */}
        <Card className="glass-card animate-fade-in-up border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950">
                  <Bot className="h-6 w-6 text-purple-600 animate-bounce-gentle" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Assistant Ready to Help</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant answers about HLA matching, lab results, and medical consultations
                  </p>
                </div>
              </div>
              <Link href="/voice">
                <Button className="btn-secondary">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Chat
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card card-hover animate-fade-in-up border-l-4 border-l-teal-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
              <Heart className="h-4 w-4 text-teal-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-600">{animatedStats.totalMatches.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass-card card-hover animate-fade-in-up border-l-4 border-l-blue-500"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
              <Users className="h-4 w-4 text-blue-600 animate-bounce-gentle" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{animatedStats.activeDonors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> new registrations
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass-card card-hover animate-fade-in-up border-l-4 border-l-purple-500"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lab Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600 animate-float" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{animatedStats.labBookings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">12</span> this week
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass-card card-hover animate-fade-in-up border-l-4 border-l-green-500"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 animate-pulse-glow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{animatedStats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="animate-slide-in-left">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-rotate" />
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="glass-card card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-200`}
                      >
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Matches */}
          <div className="lg:col-span-2">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-teal-600 animate-pulse" />
                  Recent Matches
                </CardTitle>
                <CardDescription>Latest HLA compatibility matches verified on Algorand blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300 card-hover animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {match.status === "verified" ? (
                          <Shield className="h-5 w-5 text-green-600 animate-bounce-gentle" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600 animate-pulse" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{match.recipient}</p>
                        <p className="text-sm text-muted-foreground">{match.donor}</p>
                        <p className="text-xs text-muted-foreground">
                          {match.location} • {match.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={match.status === "verified" ? "default" : "secondary"}
                        className={cn(
                          match.status === "verified"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "",
                          "animate-shimmer",
                        )}
                      >
                        {match.compatibility}% Match
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{match.id}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full btn-primary">
                  View All Matches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blockchain Status */}
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500 animate-pulse-glow" />
                  Blockchain Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Network Health</span>
                    <span className="text-green-600 animate-bounce-gentle">Excellent</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Transaction Speed</span>
                    <span className="text-blue-600">4.5s avg</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Block</span>
                  <Badge variant="outline" className="animate-shimmer">
                    #2,847,392
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/match">
                  <Button className="w-full justify-start btn-primary">
                    <Search className="mr-2 h-4 w-4" />
                    Find Compatible Donor
                  </Button>
                </Link>
                <Link href="/lab">
                  <Button className="w-full justify-start btn-secondary">
                    <TestTube className="mr-2 h-4 w-4" />
                    Schedule HLA Test
                  </Button>
                </Link>
                <Link href="/nft">
                  <Button variant="outline" className="w-full justify-start btn-outline">
                    <Award className="mr-2 h-4 w-4" />
                    View NFT Badges
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card className="glass-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Platform Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600 animate-bounce-gentle" />
                  <div>
                    <p className="text-sm font-medium">Blockchain Verified</p>
                    <p className="text-xs text-muted-foreground">All matches recorded on-chain</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-600 animate-float" />
                  <div>
                    <p className="text-sm font-medium">Global Network</p>
                    <p className="text-xs text-muted-foreground">Worldwide donor database</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-yellow-600 animate-pulse-glow" />
                  <div>
                    <p className="text-sm font-medium">AI-Powered</p>
                    <p className="text-xs text-muted-foreground">Advanced matching algorithms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Feed */}
        <Card className="glass-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600 animate-bounce-gentle" />
              Community Stories
            </CardTitle>
            <CardDescription>Latest success stories and discussions from our HLAhub community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {index === 1 ? "Success Story" : index === 2 ? "Experience" : "Technology"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="h-3 w-3" />
                      {index * 50 + 100}
                      <MessageCircle className="h-3 w-3" />
                      {index * 10 + 5}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">
                    {index === 1
                      ? "Successfully matched with 96% compatibility!"
                      : index === 2
                      ? "HLA typing test experience at HealthFirst"
                      : "AI Assistant helped me understand my results"}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {index === 1
                      ? "After 18 months of waiting, I finally found a perfect match through HLAhub. The blockchain verification gave me complete confidence in the process."
                      : index === 2
                      ? "Just completed my HLA typing test. The process was smooth and payment with Algorand was instant. Results expected in 3 days!"
                      : "The voice assistant feature is amazing! It explained my HLA typing results in simple terms and helped me understand what to expect next."}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    — {index === 1 ? "Sarah M." : index === 2 ? "Michael R." : "Jennifer L."}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}