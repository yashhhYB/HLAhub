"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import {
  Home,
  Search,
  Calendar,
  Wallet,
  Award,
  Users,
  Activity,
  Heart,
  Shield,
  ChevronLeft,
  ChevronRight,
  Mic,
  Bot,
  BarChart3,
  Database,
  Stethoscope,
  Settings,
  UserCheck,
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Find a Match", href: "/match", icon: Search, badge: "New" },
  { name: "Book Lab Test", href: "/lab", icon: Calendar },
  { name: "Wallet & Consent", href: "/wallet", icon: Wallet },
  { name: "NFT Badges", href: "/nft", icon: Award },
  { name: "Community", href: "/community", icon: Users },
  { name: "Voice Assistant", href: "/voice", icon: Mic, badge: "AI" },
  { name: "Consultant", href: "/consultant", icon: Stethoscope, badge: "Dr." },
]

const adminNavigation = [
  { name: "Admin Dashboard", href: "/admin", icon: Shield },
  { name: "Match Logs", href: "/admin/matches", icon: Activity },
  { name: "User Management", href: "/admin/users", icon: UserCheck },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Database", href: "/admin/database", icon: Database },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { user, isAdmin } = useAuth()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-full transition-all duration-300 ease-in-out shadow-2xl",
        "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
        "dark:from-black dark:via-gray-900 dark:to-black",
        "border-r border-white/10 dark:border-white/5",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-white/5">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="relative">
                <Heart className="h-8 w-8 text-primary animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-primary animate-ping opacity-20" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HLAhub</h1>
                <p className="text-xs text-white/60">Healthcare Platform</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2 py-4">
            {/* Main Navigation */}
            <div className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Main Menu
                </h3>
              )}
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <div key={item.name} style={{ animationDelay: `${index * 0.1}s` }}>
                    <Link href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start text-white hover:bg-white/10 hover:text-white transition-all duration-200 group relative overflow-hidden",
                          isActive && "bg-primary/20 text-primary shadow-lg border border-primary/30",
                          isCollapsed && "px-2",
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <item.icon
                          className={cn(
                            "h-4 w-4 group-hover:scale-110 transition-all duration-200 relative z-10",
                            !isCollapsed && "mr-3",
                            isActive && "text-primary",
                          )}
                        />
                        {!isCollapsed && (
                          <>
                            <span className="relative z-10">{item.name}</span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="ml-auto bg-yellow-400 text-yellow-900 text-xs relative z-10"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>

            {/* Admin Section */}
            {isAdmin && (
              <div className="pt-6">
                <Separator className="mb-4 bg-white/10" />
                {!isCollapsed && (
                  <div className="px-3 py-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-400" />
                    <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider">Administration</h3>
                    <Badge variant="destructive" className="text-xs">
                      Admin
                    </Badge>
                  </div>
                )}
                <div className="space-y-1 mt-2">
                  {adminNavigation.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <div
                        key={item.name}
                        style={{ animationDelay: `${(navigation.length + index) * 0.1}s` }}
                      >
                        <Link href={item.href}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start text-white hover:bg-red-500/10 hover:text-red-400 group relative overflow-hidden transition-all duration-200",
                              isActive && "bg-red-500/20 text-red-400 shadow-lg border border-red-500/30",
                              isCollapsed && "px-2",
                            )}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <item.icon
                              className={cn(
                                "h-4 w-4 group-hover:scale-110 transition-all duration-200 relative z-10",
                                !isCollapsed && "mr-3",
                                isActive && "text-red-400",
                              )}
                            />
                            {!isCollapsed && <span className="relative z-10">{item.name}</span>}
                          </Button>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-white/10 dark:border-white/5 p-4">
          {!isCollapsed ? (
            <div className="rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="h-6 w-6 text-primary" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">AI Assistant</p>
                  <p className="text-xs text-white/60">Ready to help</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-green-400 mt-1">Online</span>
                </div>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="w-full text-white hover:bg-white/10 relative group">
              <Bot className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}