"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Mail, AlertCircle, Volume2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { VoiceAIControls } from "@/components/voice-ai-controls"
import { useVoiceAI } from "@/hooks/use-voice-ai"

interface Donor {
  id: string
  name: string
  age: number
  bloodType: string
  hlaType: {
    A: string[]
    B: string[]
    C: string[]
    DR: string[]
    DQ: string[]
  }
  location: string
  compatibility: number
  lastActive: string
}

const mockDonors: Donor[] = [
  {
    id: "1",
    name: "Anonymous Donor #001",
    age: 28,
    bloodType: "O+",
    hlaType: {
      A: ["A*02:01", "A*24:02"],
      B: ["B*15:01", "B*51:01"],
      C: ["C*03:03", "C*14:02"],
      DR: ["DRB1*04:01", "DRB1*13:02"],
      DQ: ["DQB1*03:01", "DQB1*06:04"],
    },
    location: "Mumbai",
    compatibility: 95,
    lastActive: "2024-01-15",
  },
  {
    id: "2",
    name: "Anonymous Donor #002",
    age: 34,
    bloodType: "A+",
    hlaType: {
      A: ["A*01:01", "A*02:01"],
      B: ["B*08:01", "B*15:01"],
      C: ["C*03:03", "C*07:01"],
      DR: ["DRB1*03:01", "DRB1*04:01"],
      DQ: ["DQB1*02:01", "DQB1*03:01"],
    },
    location: "Delhi",
    compatibility: 88,
    lastActive: "2024-01-14",
  },
  {
    id: "3",
    name: "Anonymous Donor #003",
    age: 31,
    bloodType: "B+",
    hlaType: {
      A: ["A*11:01", "A*24:02"],
      B: ["B*35:01", "B*51:01"],
      C: ["C*04:01", "C*14:02"],
      DR: ["DRB1*11:01", "DRB1*13:02"],
      DQ: ["DQB1*03:01", "DQB1*06:09"],
    },
    location: "Bangalore",
    compatibility: 82,
    lastActive: "2024-01-13",
  },
]

export default function DonorMatchPage() {
  const [hlaInput, setHlaInput] = useState({
    A1: "",
    A2: "",
    B1: "",
    B2: "",
    C1: "",
    C2: "",
    DR1: "",
    DR2: "",
    DQ1: "",
    DQ2: "",
  })
  const [matches, setMatches] = useState<Donor[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const { speak, speakHLAResults } = useVoiceAI()

  const calculateCompatibility = (donorHLA: Donor["hlaType"], patientHLA: typeof hlaInput) => {
    // Simplified HLA matching algorithm
    let matches = 0
    let total = 0

    // Check A locus
    const patientA = [patientHLA.A1, patientHLA.A2].filter(Boolean)
    const donorA = donorHLA.A
    patientA.forEach((allele) => {
      total++
      if (donorA.some((dAllele) => dAllele.includes(allele))) matches++
    })

    // Check B locus
    const patientB = [patientHLA.B1, patientHLA.B2].filter(Boolean)
    const donorB = donorHLA.B
    patientB.forEach((allele) => {
      total++
      if (donorB.some((dAllele) => dAllele.includes(allele))) matches++
    })

    // Check DR locus
    const patientDR = [patientHLA.DR1, patientHLA.DR2].filter(Boolean)
    const donorDR = donorHLA.DR
    patientDR.forEach((allele) => {
      total++
      if (donorDR.some((dAllele) => dAllele.includes(allele))) matches++
    })

    return total > 0 ? Math.round((matches / total) * 100) : 0
  }

  const searchDonors = async () => {
    setIsSearching(true)

    // Announce search start
    await speak("Searching for compatible donors based on your HLA type. Please wait while we analyze the donor database.", { voicePreset: 'medical_professional' })

    // Simulate API call
    setTimeout(async () => {
      const compatibleDonors = mockDonors
        .map((donor) => ({
          ...donor,
          compatibility: calculateCompatibility(donor.hlaType, hlaInput),
        }))
        .filter((donor) => donor.compatibility > 50)
        .sort((a, b) => b.compatibility - a.compatibility)

      setMatches(compatibleDonors)
      setIsSearching(false)
      setHasSearched(true)

      // Announce results
      if (compatibleDonors.length > 0) {
        const resultMessage = `Search complete! Found ${compatibleDonors.length} compatible donors. The best match has ${compatibleDonors[0].compatibility}% compatibility. Would you like me to read the detailed results?`
        await speak(resultMessage, { voicePreset: 'patient_friendly' })
      } else {
        await speak("Search complete. Unfortunately, no compatible donors were found in our current database. Please consider expanding your search criteria or checking back later as new donors register regularly.", { voicePreset: 'patient_friendly' })
      }

      // Log to blockchain (dummy)
      const blockchainLog = {
        timestamp: new Date().toISOString(),
        searchHash: btoa(JSON.stringify(hlaInput)),
        matchCount: compatibleDonors.length,
        network: "Algorand",
      }
      console.log("Blockchain Log:", blockchainLog)
    }, 2000)
  }

  const requestContact = async (donor: Donor) => {
    // Simulate contact request
    const request = {
      donorId: donor.id,
      patientHLA: hlaInput,
      timestamp: new Date().toISOString(),
      status: "Pending",
    }

    const existingRequests = JSON.parse(localStorage.getItem("hlahub_contact_requests") || "[]")
    existingRequests.push(request)
    localStorage.setItem("hlahub_contact_requests", JSON.stringify(existingRequests))

    const message = `Contact request sent for ${donor.name} with ${donor.compatibility}% compatibility. You will be notified once the donor responds through our secure system.`
    await speak(message, { voicePreset: 'patient_friendly' })

    alert(`Contact request sent for ${donor.name}. You will be notified once the donor responds.`)
  }

  const speakDonorInfo = async (donor: Donor) => {
    const info = `${donor.name}, ${donor.age} years old, blood type ${donor.bloodType}, located in ${donor.location}. HLA compatibility: ${donor.compatibility}%. HLA profile: A types ${donor.hlaType.A.join(' and ')}, B types ${donor.hlaType.B.join(' and ')}, D R types ${donor.hlaType.DR.join(' and ')}.`
    await speak(info, { voicePreset: 'medical_professional' })
  }

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (compatibility >= 80) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (compatibility >= 70) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Donor Match</h1>
          <p className="text-gray-600 dark:text-gray-300">Find compatible donors using HLA typing</p>
        </div>
        <VoiceAIControls 
          text="Welcome to the donor matching system. Enter your HLA typing results to find compatible donors in our secure database. All donor information is anonymized for privacy protection."
          compact={true}
        />
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          All donor information is anonymized and secure. Contact requests are handled through our verified system with ElevenLabs voice guidance available.
        </AlertDescription>
      </Alert>

      {/* HLA Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Your HLA Type</CardTitle>
          <CardDescription>Input your HLA typing results to find compatible donors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <VoiceAIControls 
            text="Please enter your HLA typing results in the form below. HLA or Human Leukocyte Antigen typing includes A, B, C, DR, and DQ loci. Each person typically has two alleles for each locus."
            compact={true}
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">HLA-A</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="A*02:01"
                    value={hlaInput.A1}
                    onChange={(e) => setHlaInput({ ...hlaInput, A1: e.target.value })}
                  />
                  <Input
                    placeholder="A*24:02"
                    value={hlaInput.A2}
                    onChange={(e) => setHlaInput({ ...hlaInput, A2: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">HLA-B</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="B*15:01"
                    value={hlaInput.B1}
                    onChange={(e) => setHlaInput({ ...hlaInput, B1: e.target.value })}
                  />
                  <Input
                    placeholder="B*51:01"
                    value={hlaInput.B2}
                    onChange={(e) => setHlaInput({ ...hlaInput, B2: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">HLA-C</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="C*03:03"
                    value={hlaInput.C1}
                    onChange={(e) => setHlaInput({ ...hlaInput, C1: e.target.value })}
                  />
                  <Input
                    placeholder="C*14:02"
                    value={hlaInput.C2}
                    onChange={(e) => setHlaInput({ ...hlaInput, C2: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">HLA-DR</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="DRB1*04:01"
                    value={hlaInput.DR1}
                    onChange={(e) => setHlaInput({ ...hlaInput, DR1: e.target.value })}
                  />
                  <Input
                    placeholder="DRB1*13:02"
                    value={hlaInput.DR2}
                    onChange={(e) => setHlaInput({ ...hlaInput, DR2: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">HLA-DQ</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="DQB1*03:01"
                    value={hlaInput.DQ1}
                    onChange={(e) => setHlaInput({ ...hlaInput, DQ1: e.target.value })}
                  />
                  <Input
                    placeholder="DQB1*06:04"
                    value={hlaInput.DQ2}
                    onChange={(e) => setHlaInput({ ...hlaInput, DQ2: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button onClick={searchDonors} disabled={isSearching || !hlaInput.A1} className="w-full">
            {isSearching ? "Searching..." : "Find Compatible Donors"}
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compatible Donors ({matches.length})</h2>
            <VoiceAIControls 
              text={`Found ${matches.length} compatible donors. ${matches.length > 0 ? `The best match has ${matches[0].compatibility}% compatibility.` : 'Consider expanding your search criteria or checking back later.'}`}
              compact={true}
            />
          </div>

          {matches.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No compatible donors found. Try expanding your search criteria or check back later.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {matches.map((donor) => (
                <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            {donor.name}
                          </CardTitle>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => speakDonorInfo(donor)}
                            className="p-1 h-auto"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardDescription>
                          Age: {donor.age} | Blood Type: {donor.bloodType} | {donor.location}
                        </CardDescription>
                      </div>
                      <Badge className={getCompatibilityColor(donor.compatibility)}>{donor.compatibility}% Match</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <p className="font-medium mb-2">HLA Profile:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>A: {donor.hlaType.A.join(", ")}</div>
                        <div>B: {donor.hlaType.B.join(", ")}</div>
                        <div>DR: {donor.hlaType.DR.join(", ")}</div>
                        <div>DQ: {donor.hlaType.DQ.join(", ")}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => requestContact(donor)} className="flex-1" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Request Contact
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => speak(`More detailed information about ${donor.name} will be available after contact approval and verification through our secure system.`, { voicePreset: 'medical_professional' })}
                      >
                        More Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}