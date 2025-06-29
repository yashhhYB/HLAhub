"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageCircle, Phone, Video, Globe, Award, Clock, Volume2, Mic } from "lucide-react"
import { VoiceAIControls } from "@/components/voice-ai-controls"
import { useVoiceAI } from "@/hooks/use-voice-ai"

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  languages: string[]
  consultationFee: number
  availability: "Available" | "Busy" | "Offline"
  expertise: string[]
  qualifications: string[]
  nextSlot: string
  bio: string
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: "HLA Immunologist",
    experience: 15,
    rating: 4.9,
    languages: ["English", "Hindi", "Marathi"],
    consultationFee: 1500,
    availability: "Available",
    expertise: ["HLA Typing", "Transplant Immunology", "Autoimmune Disorders"],
    qualifications: ["MD Immunology", "Fellowship in Transplant Medicine"],
    nextSlot: "2024-01-16 14:00",
    bio: "Dr. Priya Sharma is a renowned HLA immunologist with over 15 years of experience in transplant medicine."
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialization: "Transplant Surgeon",
    experience: 20,
    rating: 4.8,
    languages: ["English", "Hindi", "Tamil"],
    consultationFee: 2000,
    availability: "Available",
    expertise: ["Kidney Transplant", "Liver Transplant", "HLA Matching"],
    qualifications: ["MS Surgery", "MCh Transplant Surgery"],
    nextSlot: "2024-01-16 16:30",
    bio: "Dr. Rajesh Kumar is a leading transplant surgeon with expertise in kidney and liver transplantation."
  }
]

export default function ConsultantPage() {
  const [doctors] = useState<Doctor[]>(mockDoctors)
  const { speak } = useVoiceAI()

  const initiateConsultation = async (doctor: Doctor, type: "whatsapp" | "video" | "voice_ai") => {
    if (type === "voice_ai") {
      const welcomeMessage = `Hello! I'm Dr. ${doctor.name}, your ${doctor.specialization}. Welcome to your voice AI consultation. How can I assist you today?`
      await speak(welcomeMessage, { voicePreset: 'medical_professional' })
      alert(`🎙️ Voice AI consultation with Dr. ${doctor.name} has begun!`)
    } else {
      alert(`${type === 'whatsapp' ? 'WhatsApp' : 'Video'} consultation scheduled with ${doctor.name} for ${doctor.nextSlot}`)
    }
  }

  const speakDoctorInfo = async (doctor: Doctor) => {
    const info = `Dr. ${doctor.name} is a ${doctor.specialization} with ${doctor.experience} years of experience. Rating: ${doctor.rating} out of 5 stars. Specializes in ${doctor.expertise.join(', ')}.`
    await speak(info, { voicePreset: 'medical_professional' })
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Busy":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Offline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Consult a Specialist</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect with verified HLA specialists for expert consultation
          </p>
        </div>
        <VoiceAIControls 
          text="Welcome to the specialist consultation page. Here you can find and connect with verified HLA specialists for expert medical guidance."
          compact={true}
        />
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Mic className="w-5 h-5" />
            AI-Powered Voice Consultations Available
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-300">
            Experience next-generation healthcare with ElevenLabs voice AI technology
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{doctor.name}</CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => speakDoctorInfo(doctor)}
                      className="p-1 h-auto"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {doctor.specialization}
                  </CardDescription>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{doctor.experience} years experience</p>
                </div>
                <Badge className={getAvailabilityColor(doctor.availability)}>{doctor.availability}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">rating</span>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Qualifications:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.qualifications.map((qual) => (
                    <Badge key={qual} variant="secondary" className="text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      {qual}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Expertise:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.expertise.map((exp) => (
                    <Badge key={exp} variant="outline" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((lang) => (
                    <Badge key={lang} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      <Globe className="w-3 h-3 mr-1" />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>Next available: {new Date(doctor.nextSlot).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ₹{doctor.consultationFee}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">per session</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => initiateConsultation(doctor, "whatsapp")}
                  disabled={doctor.availability === "Offline"}
                  className="flex items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => initiateConsultation(doctor, "voice_ai")}
                  disabled={doctor.availability === "Offline"}
                  className="flex items-center gap-1 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-indigo-100"
                >
                  <Mic className="w-4 h-4" />
                  Voice AI
                </Button>
                <Button
                  size="sm"
                  onClick={() => initiateConsultation(doctor, "video")}
                  disabled={doctor.availability === "Offline"}
                  className="flex items-center gap-1"
                >
                  <Video className="w-4 h-4" />
                  Video
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}