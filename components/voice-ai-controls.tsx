"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useVoiceAI } from '@/hooks/use-voice-ai'
import { Volume2, VolumeX, Play, Square, Loader2 } from 'lucide-react'

interface VoiceAIControlsProps {
  text?: string
  compact?: boolean
  showSettings?: boolean
}

export function VoiceAIControls({ text, compact = false, showSettings = true }: VoiceAIControlsProps) {
  const { 
    isInitialized, 
    isLoading, 
    isPlaying, 
    error, 
    settings, 
    speak, 
    stop
  } = useVoiceAI()

  const handleSpeak = () => {
    if (text && isInitialized) {
      speak(text)
    }
  }

  const handleStop = () => {
    stop()
  }

  if (!isInitialized && !error) {
    return compact ? null : (
      <Card className="bg-gray-50 dark:bg-gray-900">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Initializing voice AI...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return compact ? null : (
      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <VolumeX className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {settings.enabled && (
          <Button
            size="sm"
            variant="outline"
            onClick={isPlaying ? handleStop : handleSpeak}
            disabled={isLoading || !text}
            className="flex items-center gap-1"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <Square className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            {isPlaying ? 'Stop' : 'Listen'}
          </Button>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Voice AI Assistant
        </CardTitle>
        <CardDescription>
          Listen to content with professional medical pronunciation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={isPlaying ? handleStop : handleSpeak}
            disabled={isLoading || !text || !settings.enabled}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <Square className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isLoading ? 'Generating...' : isPlaying ? 'Stop' : 'Listen'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}