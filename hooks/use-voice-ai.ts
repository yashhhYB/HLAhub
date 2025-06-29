"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { createVoiceAI, HLAhubVoiceAI, VOICE_PRESETS } from '@/lib/elevenlabs'

export interface VoiceAISettings {
  enabled: boolean
  language: string
  voicePreset: keyof typeof VOICE_PRESETS
  speed: number
  autoRead: boolean
}

export function useVoiceAI() {
  const [isInitialized, setIsInitialized] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<VoiceAISettings>({
    enabled: true,
    language: 'en',
    voicePreset: 'medical_professional',
    speed: 1.0,
    autoRead: false
  })

  const voiceAI = useRef<HLAhubVoiceAI | null>(null)

  useEffect(() => {
    voiceAI.current = createVoiceAI()
  }, [])

  const speak = useCallback(async (text: string, options?: Partial<VoiceAISettings>) => {
    if (!settings.enabled) return
    
    setIsLoading(true)
    console.log('Speaking:', text, options)
    
    setTimeout(() => {
      setIsLoading(false)
      setIsPlaying(true)
      setTimeout(() => setIsPlaying(false), 2000)
    }, 500)
  }, [settings])

  const stop = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const speakHLAResults = useCallback(async (hlaData: any) => {
    console.log('Speaking HLA results:', hlaData)
  }, [])

  const updateSettings = useCallback((newSettings: Partial<VoiceAISettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  return {
    isInitialized,
    isLoading,
    isPlaying,
    error,
    settings,
    speak,
    stop,
    speakHLAResults,
    updateSettings
  }
}