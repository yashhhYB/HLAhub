"use client"

import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

const ELEVENLABS_API_KEY = "sk_33ea2d45904517576b1b1b303f35b1faa9c5b8af4eb014b6"
const AGENT_ID = "agent_01jxy3tef9ehd8csgycfwp4gys"

export function useElevenLabs() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const { toast } = useToast()
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const startConversation = async () => {
    try {
      setIsListening(true)

      // Simulate voice conversation with ElevenLabs agent
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await simulateAgentResponse(
        "Hello, I'm Dr. AI Assistant. How can I help you with your HLA matching needs today?",
      )

      setIsListening(false)
      setIsSpeaking(true)

      // Play audio response with real speech synthesis
      await playAudioResponse(response)

      setIsSpeaking(false)

      return response
    } catch (error) {
      console.error("ElevenLabs error:", error)
      toast({
        title: "Voice Assistant Error",
        description: "Unable to connect to voice assistant",
        variant: "destructive",
      })
      setIsListening(false)
      setIsSpeaking(false)
    }
  }

  const sendMessage = async (message: string) => {
    try {
      setIsSpeaking(true)

      // Simulate API call to ElevenLabs
      const response = await simulateAgentResponse(message)

      // Play audio response with real speech synthesis
      await playAudioResponse(response)

      setIsSpeaking(false)

      return response
    } catch (error) {
      console.error("ElevenLabs error:", error)
      setIsSpeaking(false)
      throw error
    }
  }

  const startVoiceRecording = () => {
    if (typeof window === "undefined") {
      return Promise.resolve("")
    }

    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please type your message instead.",
        variant: "destructive",
      })
      return Promise.resolve("")
    }

    return new Promise<string>((resolve) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      setIsRecording(true)
      setIsListening(true)

      recognition.onstart = () => {
        console.log("Voice recognition started")
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        console.log("Voice input:", transcript)
        setIsRecording(false)
        setIsListening(false)
        resolve(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsRecording(false)
        setIsListening(false)
        toast({
          title: "Voice Recognition Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        })
        resolve("")
      }

      recognition.onend = () => {
        setIsRecording(false)
        setIsListening(false)
      }

      recognition.start()
      recognitionRef.current = recognition

      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
      }, 10000)
    })
  }

  const simulateAgentResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I'm Dr. Sarah, your AI healthcare assistant. I'm here to help you with HLA matching, organ transplantation, and medical questions. What would you like to know?"
    } else if (lowerMessage.includes("hla") || lowerMessage.includes("match")) {
      return "HLA matching is crucial for organ transplantation success. HLA stands for Human Leukocyte Antigens, which are proteins on your cells that help your immune system recognize what belongs in your body. I can help you understand your HLA typing results, find compatible donors, or explain the matching process in detail. What specific aspect would you like to explore?"
    } else if (lowerMessage.includes("blockchain") || lowerMessage.includes("algorand")) {
      return "Our platform uses Algorand blockchain technology to ensure complete transparency and trust in the organ matching process. Every successful match is recorded on-chain, providing immutable proof of compatibility and maintaining a permanent, tamper-proof record. This helps build trust between donors, recipients, and medical professionals. Would you like me to explain how this benefits patients and the healthcare system?"
    } else if (lowerMessage.includes("test") || lowerMessage.includes("lab")) {
      return "I can help you book HLA typing tests at certified laboratories. We have partnerships with top-rated labs that offer high-resolution HLA typing using the latest DNA sequencing technology. The process typically takes 3 to 5 days for results, and we'll notify you immediately when they're ready. Would you like me to show you available labs in your area and help you schedule an appointment?"
    } else if (lowerMessage.includes("doctor") || lowerMessage.includes("consultation")) {
      return "I'm Dr. Sarah AI, specialized in HLA compatibility and organ transplantation medicine. I have access to the latest medical research and can provide evidence-based guidance. I can help interpret test results, explain treatment options, and connect you with human specialists when needed. What medical questions do you have for me today?"
    } else if (lowerMessage.includes("transplant") || lowerMessage.includes("organ")) {
      return "Organ transplantation is a life-saving medical procedure, and HLA compatibility is the key to success. The better the HLA match, the lower the risk of rejection. Our platform helps find the best possible matches using advanced algorithms and blockchain verification. I can explain the transplant process, compatibility requirements, or help you understand your options. What would you like to know?"
    } else if (lowerMessage.includes("how are you") || lowerMessage.includes("how do you feel")) {
      return "Thank you for asking! I'm functioning perfectly and ready to help. As an AI, I don't have feelings, but I'm designed to be empathetic and understanding of the challenges you might be facing with healthcare decisions. I'm here 24/7 to provide support and information. How can I assist you with your healthcare needs today?"
    } else {
      return "I'm here to assist you with HLA matching, organ transplantation, medical consultations, and navigating our blockchain-powered healthcare platform. You can ask me about HLA typing, finding compatible matches, booking laboratory tests, understanding your results, or any medical questions related to transplantation. I'm also here to provide emotional support during your healthcare journey. What would you like to discuss?"
    }
  }

  const playAudioResponse = async (text: string): Promise<void> => {
    try {
      // Stop any ongoing speech
      if (synthRef.current) {
        speechSynthesis.cancel()
      }

      // Check if speech synthesis is supported
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        console.warn("Speech synthesis not supported")
        // Fallback: simulate speech duration
        const duration = Math.max(3000, text.length * 60)
        await new Promise((resolve) => setTimeout(resolve, duration))
        return
      }

      // Wait for voices to load
      await new Promise<void>((resolve) => {
        if (speechSynthesis.getVoices().length > 0) {
          resolve()
        } else {
          const timeout = setTimeout(() => resolve(), 1000) // Timeout after 1 second
          speechSynthesis.onvoiceschanged = () => {
            clearTimeout(timeout)
            resolve()
          }
        }
      })

      const utterance = new SpeechSynthesisUtterance(text)
      synthRef.current = utterance

      // Configure voice settings for a professional female voice
      utterance.rate = 0.85 // Slightly slower for clarity
      utterance.pitch = 1.1 // Slightly higher pitch for female voice
      utterance.volume = 0.9

      // Try to select a good female voice
      const voices = speechSynthesis.getVoices()
      console.log(
        "Available voices:",
        voices.map((v) => `${v.name} (${v.lang})`),
      )

      // Prefer female voices
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("female") ||
          voice.name.toLowerCase().includes("samantha") ||
          voice.name.toLowerCase().includes("karen") ||
          voice.name.toLowerCase().includes("moira") ||
          voice.name.toLowerCase().includes("susan") ||
          voice.name.toLowerCase().includes("victoria") ||
          voice.name.toLowerCase().includes("sarah") ||
          (voice.name.toLowerCase().includes("google") && voice.name.toLowerCase().includes("us")) ||
          voice.name.toLowerCase().includes("zira"),
      )

      if (femaleVoice) {
        utterance.voice = femaleVoice
        console.log("Selected voice:", femaleVoice.name)
      } else {
        // Fallback to any English voice
        const englishVoice = voices.find((voice) => voice.lang.startsWith("en"))
        if (englishVoice) {
          utterance.voice = englishVoice
          console.log("Selected fallback voice:", englishVoice.name)
        }
      }

      // Play the speech and wait for completion
      return new Promise((resolve, reject) => {
        utterance.onend = () => {
          console.log("Speech synthesis completed")
          resolve()
        }

        utterance.onerror = (event) => {
          console.error("Speech synthesis error:", event)
          resolve() // Resolve anyway to prevent hanging
        }

        utterance.onstart = () => {
          console.log("Speech synthesis started")
        }

        console.log("Starting speech synthesis...")
        speechSynthesis.speak(utterance)

        // Fallback timeout in case onend doesn't fire
        setTimeout(
          () => {
            if (speechSynthesis.speaking) {
              speechSynthesis.cancel()
            }
            resolve()
          },
          text.length * 100 + 5000,
        ) // Generous timeout based on text length
      })
    } catch (error) {
      console.error("Speech synthesis error:", error)
      // Fallback: simulate speech duration
      const duration = Math.max(3000, text.length * 60)
      await new Promise((resolve) => setTimeout(resolve, duration))
    }
  }

  const stopConversation = () => {
    setIsListening(false)
    setIsSpeaking(false)
    setIsRecording(false)

    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }

    // Stop speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesis.cancel()
    }

    synthRef.current = null
  }

  return {
    isListening,
    isSpeaking,
    isRecording,
    startConversation,
    sendMessage,
    startVoiceRecording,
    stopConversation,
  }
}