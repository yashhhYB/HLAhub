"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Star, Filter } from "lucide-react"
import { VoiceAIControls } from "@/components/voice-ai-controls"
import { useVoiceAI } from "@/hooks/use-voice-ai"

interface Lab {
  id: string
  name: string
  city: string
  address: string
  phone: string
  price: number
  rating: number
  availability: "Available" | "Busy" | "Closed"
  specialties: string[]
  description: string
}

const mockLabs: Lab[] = [
  {
    id: "1",
    name: "MedLife Diagnostics",
    city: "Mumbai",
    address: "123 Medical Center, Bandra West",
    phone: "+91 98765 43210",
    price: 2500,
    rating: 4.8,
    availability: "Available",
    specialties: ["HLA Typing", "Crossmatch", "Antibody Screening"],
    description: "State-of-the-art diagnostic facility specializing in comprehensive HLA testing."
  },
  {
    id: "2",
    name: "Apollo Lab Services",
    city: "Delhi",
    address: "456 Health Plaza, CP",
    phone: "+91 98765 43211",
    price: 3000,
    rating: 4.9,
    availability: "Busy",
    specialties: ["HLA Typing", "Flow Cytometry"],
    description: "Premier laboratory network offering cutting-edge HLA testing services."
  },
]

export default function LabPage() {
  const [labs, setLabs] = useState<Lab[]>(mockLabs)
  const [filteredLabs, setFilteredLabs] = useState<Lab[]>(mockLabs)
  const [cityFilter, setCityFilter] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("")

  const { speak } = useVoiceAI()

  useEffect(() => {
    let filtered = labs

    if (cityFilter) {
      filtered = filtered.filter((lab) => lab.city.toLowerCase().includes(cityFilter.toLowerCase()))
    }

    if (availabilityFilter) {
      filtered = filtered.filter((lab) => lab.availability === availabilityFilter)
    }

    setFilteredLabs(filtered)
  }, [cityFilter, availabilityFilter, labs])

  const handleBooking = async (lab: Lab) => {
    const confirmationMessage = `Booking confirmed at ${lab.name}! Your HLA test is scheduled. You will receive updates on your phone.`
    await speak(confirmationMessage, { voicePreset: 'patient_friendly' })
    alert(`Booking confirmed at ${lab.name}!`)
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Busy":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lab Booking</h1>
          <p className="text-gray-600 dark:text-gray-300">Find and book HLA tests at certified laboratories</p>
        </div>
        <VoiceAIControls 
          text="Welcome to the lab booking page. Here you can find certified laboratories for HLA testing near you."
          compact={true}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Search by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Busy">Busy</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => (
          <Card key={lab.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{lab.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {lab.city}
                  </CardDescription>
                </div>
                <Badge className={getAvailabilityColor(lab.availability)}>{lab.availability}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {lab.address}
                </p>
                <p className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4" />
                  {lab.phone}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{lab.rating}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {lab.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {lab.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{lab.price.toLocaleString()}
                  </span>
                </div>
                <Button
                  onClick={() => handleBooking(lab)}
                  disabled={lab.availability === "Closed"}
                >
                  Book Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLabs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No labs found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}