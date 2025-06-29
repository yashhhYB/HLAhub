"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useElevenLabs } from "@/hooks/use-elevenlabs"

export function VoiceAssistant() {
  const { isListening, isSpeaking, startConversation, stopConversation } = useElevenLabs()
  const { toast } = useToast()

  const handleVoiceAssistant = async () => {
    if (isListening || isSpeaking) {
      stopConversation()
      return
    }

    try {
      await startConversation()
      toast({
        title: "Voice Assistant",
        description: "Dr. Sarah is ready to help! Listen for her response.",
      })
    } catch (error) {
      toast({
        title: "Voice Assistant Error",
        description: "Unable to start voice conversation",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
        AI Assistant
      </Badge>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleVoiceAssistant}
        className={`text-white hover:bg-white/10 ${isListening || isSpeaking ? "animate-pulse bg-green-500/20" : ""}`}
      >
        {isSpeaking ? (
          <Volume2 className="h-4 w-4 text-green-400" />
        ) : isListening ? (
          <MicOff className="h-4 w-4 text-red-400" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>

      {isSpeaking && <Badge className="bg-green-500 text-white animate-pulse">Speaking</Badge>}
    </div>
  )
}