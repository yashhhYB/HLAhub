"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, Bot, MessageCircle } from "lucide-react"
import { useElevenLabs } from "@/hooks/use-elevenlabs"
import { VoiceAIControls } from "@/components/voice-ai-controls"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function VoicePage() {
  const { isListening, isSpeaking, startConversation, sendMessage, startVoiceRecording, stopConversation } = useElevenLabs()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Dr. Sarah AI, your healthcare assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState("")

  const handleVoiceInput = async () => {
    if (isListening) {
      stopConversation()
      return
    }

    try {
      const transcript = await startVoiceRecording()
      if (transcript) {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: transcript,
          sender: "user",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, userMessage])

        const response = await sendMessage(transcript)
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "ai",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      console.error("Voice input error:", error)
    }
  }

  const handleTextInput = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await sendMessage(inputText)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "ai",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error("Text input error:", error)
    }

    setInputText("")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Voice AI Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300">Chat with Dr. Sarah AI for medical guidance</p>
        </div>
        <VoiceAIControls 
          text="Welcome to the voice AI assistant. You can speak or type to chat with Dr. Sarah AI about your healthcare needs."
          compact={true}
        />
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Bot className="w-5 h-5" />
            AI Assistant Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge className={`${isSpeaking ? 'bg-green-500' : isListening ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
              {isSpeaking ? 'Speaking' : isListening ? 'Listening' : 'Ready'}
            </Badge>
            <div className="flex gap-2">
              <Button
                onClick={handleVoiceInput}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isListening ? 'Stop Listening' : 'Start Voice Chat'}
              </Button>
              {isSpeaking && (
                <Button variant="outline" onClick={stopConversation}>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Stop Speaking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextInput()}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleTextInput} disabled={!inputText.trim()}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}