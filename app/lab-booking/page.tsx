"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Star, Filter, Volume2 } from "lucide-react"
import { VoiceAIControls } from "@/components/voice-ai-controls"
import { useVoiceAI } from "@/hooks/use-voice-ai"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

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
    description: "State-of-the-art diagnostic facility specializing in comprehensive HLA testing with advanced molecular techniques and rapid turnaround times."
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
    description: "Premier laboratory network offering cutting-edge HLA testing services with internationally accredited quality standards."
  },
  {
    id: "3",
    name: "Pathkind Laboratories",
    city: "Bangalore",
    address: "789 Tech Park, Whitefield",
    phone: "+91 98765 43212",
    price: 2200,
    rating: 4.6,
    availability: "Available",
    specialties: ["HLA Typing", "Molecular Testing"],
    description: "Advanced diagnostic center with specialized focus on genetic testing and HLA compatibility analysis for transplant patients."
  },
  {
    id: "4",
    name: "SRL Diagnostics",
    city: "Chennai",
    address: "321 Medical Street, T Nagar",
    phone: "+91 98765 43213",
    price: 2800,
    rating: 4.7,
    availability: "Available",
    specialties: ["HLA Typing", "Immunology"],
    description: "Comprehensive immunology laboratory providing detailed HLA analysis with expert consultation and personalized patient care."
  },
]

export default function LabBookingPage() {
  const [labs, setLabs] = useState<Lab[]>(mockLabs)
  const [filteredLabs, setFilteredLabs] = useState<Lab[]>(mockLabs)
  const [cityFilter, setCityFilter] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("")
  const [priceFilter, setPriceFilter] = useState("")
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null)
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    testType: "",
    preferredDate: "",
    notes: "",
  })

  const { speak, isLoading: voiceLoading } = useVoiceAI()

  useEffect(() => {
    let filtered = labs

    if (cityFilter) {
      filtered = filtered.filter((lab) => lab.city.toLowerCase().includes(cityFilter.toLowerCase()))
    }

    if (availabilityFilter) {
      filtered = filtered.filter((lab) => lab.availability === availabilityFilter)
    }

    if (priceFilter) {
      if (priceFilter === "low") {
        filtered = filtered.filter((lab) => lab.price < 2500)
      } else if (priceFilter === "medium") {
        filtered = filtered.filter((lab) => lab.price >= 2500 && lab.price < 3000)
      } else if (priceFilter === "high") {
        filtered = filtered.filter((lab) => lab.price >= 3000)
      }
    }

    setFilteredLabs(filtered)
  }, [cityFilter, availabilityFilter, priceFilter, labs])

  const handleBooking = async (lab: Lab) => {
    // Simulate booking process
    const booking = {
      id: Date.now().toString(),
      lab: lab,
      patient: bookingForm,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    }

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("hlahub_bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("hlahub_bookings", JSON.stringify(existingBookings))

    // Speak confirmation
    const confirmationMessage = `Booking confirmed at ${lab.name}! Your HLA test is scheduled. You will receive WhatsApp updates on ${bookingForm.phone}. Please arrive 15 minutes early with a valid ID and your prescription.`
    await speak(confirmationMessage, { voicePreset: 'patient_friendly' })

    alert(`Booking confirmed at ${lab.name}! You will receive WhatsApp updates on ${bookingForm.phone}`)
    setSelectedLab(null)
    setBookingForm({
      patientName: "",
      phone: "",
      email: "",
      testType: "",
      preferredDate: "",
      notes: "",
    })
  }

  const speakLabInfo = async (lab: Lab) => {
    const info = `${lab.name} in ${lab.city}. Rating: ${lab.rating} out of 5 stars. Price: ${lab.price} rupees. Specializes in ${lab.specialties.join(', ')}. ${lab.description}`
    await speak(info, { voicePreset: 'medical_professional' })
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
          text="Welcome to the lab booking page. Here you can find certified laboratories for HLA testing near you. Use the filters to narrow down your search and book your test with ease."
          compact={true}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
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
            <div>
              <Label htmlFor="price">Price Range</Label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">Under ₹2,500</SelectItem>
                  <SelectItem value="medium">₹2,500 - ₹3,000</SelectItem>
                  <SelectItem value="high">Above ₹3,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Labs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => (
          <Card key={lab.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{lab.name}</CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => speakLabInfo(lab)}
                      disabled={voiceLoading}
                      className="p-1 h-auto"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedLab(lab)} disabled={lab.availability === "Closed"}>
                      Book Test
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book HLA Test</DialogTitle>
                      <DialogDescription>Book your test at {lab.name}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <VoiceAIControls 
                        text={`Booking form for ${lab.name}. Please fill in your details to schedule your HLA test. We will send confirmation and instructions via WhatsApp.`}
                        compact={true}
                      />
                      <div>
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input
                          id="patientName"
                          value={bookingForm.patientName}
                          onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">WhatsApp Number</Label>
                        <Input
                          id="phone"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="testType">Test Type</Label>
                        <Select
                          value={bookingForm.testType}
                          onValueChange={(value) => setBookingForm({ ...bookingForm, testType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select test type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hla-typing">HLA Typing</SelectItem>
                            <SelectItem value="crossmatch">Crossmatch</SelectItem>
                            <SelectItem value="antibody-screening">Antibody Screening</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={bookingForm.preferredDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={bookingForm.notes}
                          onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        />
                      </div>
                      <Button
                        onClick={() => selectedLab && handleBooking(selectedLab)}
                        className="w-full"
                        disabled={!bookingForm.patientName || !bookingForm.phone || !bookingForm.testType}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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