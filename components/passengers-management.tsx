"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, Users, Mail, Phone, MapPin, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSharedData } from "./shared-data-context"

// Kenyan and common nationalities
const NATIONALITIES = [
  "Kenyan",
  "Tanzanian",
  "Ugandan",
  "Rwandan",
  "Ethiopian",
  "South African",
  "British",
  "American",
  "Canadian",
  "German",
  "French",
  "Dutch",
  "Indian",
  "Chinese",
  "Japanese",
  "Australian",
  "Nigerian",
  "Egyptian",
  "Moroccan",
]

export function PassengersManagement() {
  const { passengers, addPassenger, updatePassenger, deletePassenger } = useSharedData()

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPassenger, setEditingPassenger] = useState<any>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [newPassenger, setNewPassenger] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    passportNumber: "",
    dateOfBirth: "",
  })

  const filteredPassengers = passengers.filter(
    (passenger) =>
      passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.phone.includes(searchTerm) ||
      passenger.frequentFlyerNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const generateFrequentFlyerNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    return `KQ${timestamp.padStart(9, "0")}`
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleAddPassenger = () => {
    if (
      newPassenger.name &&
      newPassenger.email &&
      newPassenger.phone &&
      newPassenger.nationality &&
      newPassenger.passportNumber &&
      newPassenger.dateOfBirth
    ) {
      const passenger = {
        id: Date.now().toString(),
        name: newPassenger.name,
        email: newPassenger.email,
        phone: newPassenger.phone,
        nationality: newPassenger.nationality,
        passportNumber: newPassenger.passportNumber,
        dateOfBirth: newPassenger.dateOfBirth,
        totalFlights: 0,
        memberSince: new Date().toISOString().split("T")[0],
        frequentFlyerNumber: generateFrequentFlyerNumber(),
      }

      addPassenger(passenger)

      // Reset form
      setNewPassenger({
        name: "",
        email: "",
        phone: "",
        nationality: "",
        passportNumber: "",
        dateOfBirth: "",
      })
      setIsAddDialogOpen(false)

      // Show success message
      showSuccess(`Passenger ${passenger.name} added successfully! FF#: ${passenger.frequentFlyerNumber}`)
    }
  }

  const handleEditPassenger = (passenger: any) => {
    setEditingPassenger(passenger)
    setNewPassenger({
      name: passenger.name,
      email: passenger.email,
      phone: passenger.phone,
      nationality: passenger.nationality,
      passportNumber: passenger.passportNumber,
      dateOfBirth: passenger.dateOfBirth,
    })
  }

  const handleUpdatePassenger = () => {
    if (
      editingPassenger &&
      newPassenger.name &&
      newPassenger.email &&
      newPassenger.phone &&
      newPassenger.nationality &&
      newPassenger.passportNumber &&
      newPassenger.dateOfBirth
    ) {
      const updatedData = {
        name: newPassenger.name,
        email: newPassenger.email,
        phone: newPassenger.phone,
        nationality: newPassenger.nationality,
        passportNumber: newPassenger.passportNumber,
        dateOfBirth: newPassenger.dateOfBirth,
      }

      updatePassenger(editingPassenger.id, updatedData)
      setEditingPassenger(null)
      setNewPassenger({
        name: "",
        email: "",
        phone: "",
        nationality: "",
        passportNumber: "",
        dateOfBirth: "",
      })

      showSuccess(`Passenger ${updatedData.name} updated successfully!`)
    }
  }

  const handleDeletePassenger = (id: string, name: string) => {
    deletePassenger(id)
    showSuccess(`Passenger ${name} deleted successfully!`)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-md shadow-md flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </motion.div>
      )}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Passenger Management
          </h1>
          <p className="text-gray-600">Manage passenger information and profiles</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Passenger
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Passenger</DialogTitle>
              <DialogDescription>Create a new passenger profile with complete information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., John Kamau"
                  value={newPassenger.name}
                  onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g., john.kamau@email.com"
                    value={newPassenger.email}
                    onChange={(e) => setNewPassenger({ ...newPassenger, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="e.g., +254 712 345 678"
                    value={newPassenger.phone}
                    onChange={(e) => setNewPassenger({ ...newPassenger, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Select
                    value={newPassenger.nationality}
                    onValueChange={(value) => setNewPassenger({ ...newPassenger, nationality: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {NATIONALITIES.map((nationality) => (
                        <SelectItem key={nationality} value={nationality}>
                          {nationality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newPassenger.dateOfBirth}
                    onChange={(e) => setNewPassenger({ ...newPassenger, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input
                  id="passportNumber"
                  placeholder="e.g., A1234567"
                  value={newPassenger.passportNumber}
                  onChange={(e) => setNewPassenger({ ...newPassenger, passportNumber: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Automatic Generation</h4>
                <p className="text-sm text-blue-600">
                  A unique frequent flyer number will be automatically generated upon registration.
                </p>
              </div>

              <Button onClick={handleAddPassenger} className="w-full bg-gradient-to-r from-red-600 to-red-700">
                Add Passenger
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search passengers by name, email, phone, or frequent flyer number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Passengers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPassengers.map((passenger, index) => (
          <motion.div
            key={passenger.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600">
                    <AvatarFallback className="text-white font-semibold">{getInitials(passenger.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-red-800">{passenger.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {passenger.nationality} • Age {calculateAge(passenger.dateOfBirth)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{passenger.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{passenger.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Passport: {passenger.passportNumber}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Member since {new Date(passenger.memberSince).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Flights</span>
                    <span className="font-semibold text-red-800">{passenger.totalFlights}</span>
                  </div>
                  <div className="text-xs text-gray-500">FF#: {passenger.frequentFlyerNumber}</div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPassenger(passenger)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Passenger</DialogTitle>
                        <DialogDescription>Update passenger information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="editName">Full Name *</Label>
                          <Input
                            id="editName"
                            value={newPassenger.name}
                            onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="editEmail">Email Address *</Label>
                            <Input
                              id="editEmail"
                              type="email"
                              value={newPassenger.email}
                              onChange={(e) => setNewPassenger({ ...newPassenger, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="editPhone">Phone Number *</Label>
                            <Input
                              id="editPhone"
                              value={newPassenger.phone}
                              onChange={(e) => setNewPassenger({ ...newPassenger, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="editNationality">Nationality *</Label>
                            <Select
                              value={newPassenger.nationality}
                              onValueChange={(value) => setNewPassenger({ ...newPassenger, nationality: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {NATIONALITIES.map((nationality) => (
                                  <SelectItem key={nationality} value={nationality}>
                                    {nationality}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="editDateOfBirth">Date of Birth *</Label>
                            <Input
                              id="editDateOfBirth"
                              type="date"
                              value={newPassenger.dateOfBirth}
                              onChange={(e) => setNewPassenger({ ...newPassenger, dateOfBirth: e.target.value })}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="editPassportNumber">Passport Number *</Label>
                          <Input
                            id="editPassportNumber"
                            value={newPassenger.passportNumber}
                            onChange={(e) =>
                              setNewPassenger({ ...newPassenger, passportNumber: e.target.value.toUpperCase() })
                            }
                          />
                        </div>

                        <Button
                          onClick={handleUpdatePassenger}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700"
                        >
                          Update Passenger
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePassenger(passenger.id, passenger.name)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPassengers.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No passengers found</h3>
          <p className="text-gray-500">Try adjusting your search or add a new passenger.</p>
        </motion.div>
      )}
    </div>
  )
}
