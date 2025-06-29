"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Image from "next/image"

export function BoltBadge() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-all duration-300 hover:scale-110 hover:rotate-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
        aria-label="Powered by Bolt.new - Click to visit Bolt.new"
      >
        <Image
          src={isDark ? "/bolt-badge-white.png" : "/bolt-badge-black.png"}
          alt="Powered by Bolt.new"
          width={64}
          height={64}
          className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
          priority
        />
      </a>
    </div>
  )
}