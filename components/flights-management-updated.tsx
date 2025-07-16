"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, Plane, Calendar, Users, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSharedData } from "./shared-data-context"

// Real world airports and locations (same as before)
const AIRPORTS = [
  // Kenyan Airports
  { code: "NBO", city: "Nairobi", country: "Kenya", name: "Jomo Kenyatta International Airport" },
  { code: "MBA", city: "Mombasa", country: "Kenya", name: "Moi International Airport" },
  { code: "KIS", city: "Kisumu", country: "Kenya", name: "Kisumu Airport" },
  { code: "EDL", city: "Eldoret", country: "Kenya", name: "Eldoret Airport" },
  { code: "MYD", city: "Malindi", country: "Kenya", name: "Malindi Airport" },
  { code: "UAS", city: "Samburu", country: "Kenya", name: "Samburu Airport" },

  // East Africa
  { code: "DAR", city: "Dar es Salaam", country: "Tanzania", name: "Julius Nyerere International Airport" },
  { code: "JRO", city: "Kilimanjaro", country: "Tanzania", name: "Kilimanjaro International Airport" },
  { code: "EBB", city: "Entebbe", country: "Uganda", name: "Entebbe International Airport" },
  { code: "KGL", city: "Kigali", country: "Rwanda", name: "Kigali International Airport" },
  { code: "ADD", city: "Addis Ababa", country: "Ethiopia", name: "Bole International Airport" },

  // Middle East
  { code: "DXB", city: "Dubai", country: "UAE", name: "Dubai International Airport" },
  { code: "DOH", city: "Doha", country: "Qatar", name: "Hamad International Airport" },
  { code: "AUH", city: "Abu Dhabi", country: "UAE", name: "Abu Dhabi International Airport" },

  // Europe
  { code: "LHR", city: "London", country: "UK", name: "Heathrow Airport" },
  { code: "CDG", city: "Paris", country: "France", name: "Charles de Gaulle Airport" },
  { code: "AMS", city: "Amsterdam", country: "Netherlands", name: "Schiphol Airport" },
  { code: "FRA", city: "Frankfurt", country: "Germany", name: "Frankfurt Airport" },
  { code: "ZUR", city: "Zurich", country: "Switzerland", name: "Zurich Airport" },

  // Asia
  { code: "BOM", city: "Mumbai", country: "India", name: "Chhatrapati Shivaji International Airport" },
  { code: "DEL", city: "Delhi", country: "India", name: "Indira Gandhi International Airport" },
  { code: "BKK", city: "Bangkok", country: "Thailand", name: "Suvarnabhumi Airport" },
  { code: "SIN", city: "Singapore", country: "Singapore", name: "Changi Airport" },
  { code: "HKG", city: "Hong Kong", country: "Hong Kong", name: "Hong Kong International Airport" },

  // Africa
  { code: "JNB", city: "Johannesburg", country: "South Africa", name: "OR Tambo International Airport" },
  { code: "CPT", city: "Cape Town", country: "South Africa", name: "Cape Town International Airport" },
  { code: "CAI", city: "Cairo", country: "Egypt", name: "Cairo International Airport" },
  { code: "LOS", city: "Lagos", country: "Nigeria", name: "Murtala Muhammed International Airport" },
  { code: "CAS", city: "Casablanca", country: "Morocco", name: "Mohammed V International Airport" },

  // Americas
  { code: "JFK", city: "New York", country: "USA", name: "John F. Kennedy International Airport" },
  { code: "LAX", city: "Los Angeles", country: "USA", name: "Los Angeles International Airport" },
  { code: "YYZ", city: "Toronto", country: "Canada", name: "Pearson International Airport" },
]

// Realistic flight times based on routes (same as before)
const FLIGHT_SCHEDULES = {
  // Domestic Kenya flights
  "NBO-MBA": ["06:00", "09:30", "13:00", "16:30", "19:00"],
  "NBO-KIS": ["07:00", "11:00", "15:00", "18:00"],
  "NBO-EDL": ["08:00", "12:00", "16:00"],

  // Regional East Africa
  "NBO-DAR": ["08:30", "14:00", "18:30"],
  "NBO-EBB": ["09:00", "15:00"],
  "NBO-ADD": ["07:00", "13:00", "19:00"],

  // Middle East
  "NBO-DXB": ["02:30", "14:30", "23:45"],
  "NBO-DOH": ["03:00", "15:00"],

  // Europe (mostly night flights)
  "NBO-LHR": ["23:45"],
  "NBO-CDG": ["21:15", "23:30"],
  "NBO-AMS": ["22:00"],

  // Asia
  "NBO-BOM": ["02:00", "14:00"],
  "NBO-BKK": ["23:30"],

  // Africa
  "NBO-JNB": ["06:00", "10:30", "16:20", "20:00"],
  "NBO-CPT": ["11:00", "17:30"],
}

// Realistic pricing in KSH based on route distance and class (same as before)
const calculatePrice = (departure: string, arrival: string, seatClass: "Economy" | "Business" | "First") => {
  const depCode = departure.split(" (")[1]?.split(")")[0] || departure
  const arrCode = arrival.split(" (")[1]?.split(")")[0] || arrival

  // Base prices in KSH
  const basePrices: Record<string, { economy: number; business: number; first: number }> = {
    // Domestic Kenya
    "NBO-MBA": { economy: 12000, business: 35000, first: 65000 },
    "NBO-KIS": { economy: 8000, business: 25000, first: 45000 },
    "NBO-EDL": { economy: 9000, business: 28000, first: 50000 },

    // Regional East Africa
    "NBO-DAR": { economy: 18000, business: 55000, first: 95000 },
    "NBO-EBB": { economy: 22000, business: 65000, first: 110000 },
    "NBO-ADD": { economy: 25000, business: 75000, first: 130000 },

    // Middle East
    "NBO-DXB": { economy: 45000, business: 135000, first: 250000 },
    "NBO-DOH": { economy: 48000, business: 145000, first: 270000 },

    // Europe
    "NBO-LHR": { economy: 85000, business: 285000, first: 520000 },
    "NBO-CDG": { economy: 82000, business: 275000, first: 500000 },
    "NBO-AMS": { economy: 78000, business: 265000, first: 480000 },

    // Asia
    "NBO-BOM": { economy: 55000, business: 165000, first: 300000 },
    "NBO-BKK": { economy: 75000, business: 225000, first: 420000 },

    // Africa
    "NBO-JNB": { economy: 35000, business: 105000, first: 195000 },
    "NBO-CPT": { economy: 42000, business: 125000, first: 230000 },
  }

  const route = `${depCode}-${arrCode}`
  const reverseRoute = `${arrCode}-${depCode}`

  const prices = basePrices[route] || basePrices[reverseRoute] || { economy: 50000, business: 150000, first: 280000 }

  return prices[seatClass.toLowerCase() as keyof typeof prices]
}

export function FlightsManagement() {
  const { flights, addFlight, updateFlight, deleteFlight } = useSharedData()

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingFlight, setEditingFlight] = useState<any>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    departure: "",
    arrival: "",
    date: "",
    time: "",
    capacity: "",
    status: "On Time" as any,
  })

  const filteredFlights = flights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.arrival.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAvailableTimes = (departure: string, arrival: string) => {
    const depCode = departure.split(" (")[1]?.split(")")[0] || ""
    const arrCode = arrival.split(" (")[1]?.split(")")[0] || ""
    const route = `${depCode}-${arrCode}`
    const reverseRoute = `${arrCode}-${depCode}`

    return FLIGHT_SCHEDULES[route] || FLIGHT_SCHEDULES[reverseRoute] || ["06:00", "12:00", "18:00"]
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleAddFlight = () => {
    if (
      newFlight.flightNumber &&
      newFlight.departure &&
      newFlight.arrival &&
      newFlight.date &&
      newFlight.time &&
      newFlight.capacity
    ) {
      const economyPrice = calculatePrice(newFlight.departure, newFlight.arrival, "Economy")
      const businessPrice = calculatePrice(newFlight.departure, newFlight.arrival, "Business")
      const firstPrice = calculatePrice(newFlight.departure, newFlight.arrival, "First")

      const flight = {
        id: Date.now().toString(),
        flightNumber: newFlight.flightNumber,
        departure: newFlight.departure,
        arrival: newFlight.arrival,
        date: newFlight.date,
        time: newFlight.time,
        capacity: Number.parseInt(newFlight.capacity),
        booked: 0,
        status: newFlight.status,
        economyPrice,
        businessPrice,
        firstPrice,
      }

      addFlight(flight)

      // Reset form
      setNewFlight({
        flightNumber: "",
        departure: "",
        arrival: "",
        date: "",
        time: "",
        capacity: "",
        status: "On Time",
      })
      setIsAddDialogOpen(false)

      // Show success message
      showSuccess(`Flight ${flight.flightNumber} added successfully!`)
    }
  }

  const handleEditFlight = (flight: any) => {
    setEditingFlight(flight)
    setNewFlight({
      flightNumber: flight.flightNumber,
      departure: flight.departure,
      arrival: flight.arrival,
      date: flight.date,
      time: flight.time,
      capacity: flight.capacity.toString(),
      status: flight.status,
    })
  }

  const handleUpdateFlight = () => {
    if (
      editingFlight &&
      newFlight.flightNumber &&
      newFlight.departure &&
      newFlight.arrival &&
      newFlight.date &&
      newFlight.time &&
      newFlight.capacity
    ) {
      const economyPrice = calculatePrice(newFlight.departure, newFlight.arrival, "Economy")
      const businessPrice = calculatePrice(newFlight.departure, newFlight.arrival, "Business")
      const firstPrice = calculatePrice(newFlight.departure, newFlight.arrival, "First")

      const updatedFlight = {
        flightNumber: newFlight.flightNumber,
        departure: newFlight.departure,
        arrival: newFlight.arrival,
        date: newFlight.date,
        time: newFlight.time,
        capacity: Number.parseInt(newFlight.capacity),
        status: newFlight.status,
        economyPrice,
        businessPrice,
        firstPrice,
      }

      updateFlight(editingFlight.id, updatedFlight)
      setEditingFlight(null)
      setNewFlight({
        flightNumber: "",
        departure: "",
        arrival: "",
        date: "",
        time: "",
        capacity: "",
        status: "On Time",
      })

      showSuccess(`Flight ${updatedFlight.flightNumber} updated successfully!`)
    }
  }

  const handleDeleteFlight = (id: string, flightNumber: string) => {
    deleteFlight(id)
    showSuccess(`Flight ${flightNumber} deleted successfully!`)
  }

  const getStatusColor = (status: any) => {
    switch (status) {
      case "On Time":
        return "bg-green-100 text-green-800"
      case "Delayed":
        return "bg-red-100 text-red-800"
      case "Cancelled":
        return "bg-gray-100 text-gray-800"
      case "Boarding":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const availableTimes =
    newFlight.departure && newFlight.arrival ? getAvailableTimes(newFlight.departure, newFlight.arrival) : []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          {successMessage}
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
            Flight Management
          </h1>
          <p className="text-gray-600">Manage your airline fleet operations • Total Flights: {flights.length}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Flight
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Flight</DialogTitle>
              <DialogDescription>Create a new flight schedule with automatic pricing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="flightNumber">Flight Number</Label>
                <Input
                  id="flightNumber"
                  placeholder="e.g., KQ001"
                  value={newFlight.flightNumber}
                  onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departure">Departure Airport</Label>
                  <Select
                    value={newFlight.departure}
                    onValueChange={(value) => setNewFlight({ ...newFlight, departure: value, time: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select departure" />
                    </SelectTrigger>
                    <SelectContent>
                      {AIRPORTS.map((airport) => (
                        <SelectItem key={airport.code} value={`${airport.city} (${airport.code})`}>
                          {airport.city} ({airport.code}) - {airport.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="arrival">Arrival Airport</Label>
                  <Select
                    value={newFlight.arrival}
                    onValueChange={(value) => setNewFlight({ ...newFlight, arrival: value, time: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select arrival" />
                    </SelectTrigger>
                    <SelectContent>
                      {AIRPORTS.map((airport) => (
                        <SelectItem key={airport.code} value={`${airport.city} (${airport.code})`}>
                          {airport.city} ({airport.code}) - {airport.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newFlight.date}
                    onChange={(e) => setNewFlight({ ...newFlight, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Departure Time</Label>
                  <Select
                    value={newFlight.time}
                    onValueChange={(value) => setNewFlight({ ...newFlight, time: value })}
                    disabled={!newFlight.departure || !newFlight.arrival}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Aircraft Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 280"
                    value={newFlight.capacity}
                    onChange={(e) => setNewFlight({ ...newFlight, capacity: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Flight Status</Label>
                  <Select
                    value={newFlight.status}
                    onValueChange={(value) => setNewFlight({ ...newFlight, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On Time">On Time</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Boarding">Boarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Preview */}
              {newFlight.departure && newFlight.arrival && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Automatic Pricing (KSH)</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Economy:</span>
                      <div className="font-semibold">
                        KSH {calculatePrice(newFlight.departure, newFlight.arrival, "Economy").toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Business:</span>
                      <div className="font-semibold">
                        KSH {calculatePrice(newFlight.departure, newFlight.arrival, "Business").toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">First Class:</span>
                      <div className="font-semibold">
                        KSH {calculatePrice(newFlight.departure, newFlight.arrival, "First").toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={handleAddFlight} className="w-full bg-gradient-to-r from-red-600 to-red-700">
                Add Flight
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
          placeholder="Search flights by number, departure, or arrival..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Flights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-red-800 flex items-center">
                    <Plane className="w-5 h-5 mr-2" />
                    {flight.flightNumber}
                  </CardTitle>
                  <Badge className={getStatusColor(flight.status)}>{flight.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">{flight.departure}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">{flight.arrival}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {flight.date} at {flight.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {flight.booked}/{flight.capacity} passengers
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.round((flight.booked / flight.capacity) * 100)}% full
                  </span>
                </div>

                {/* Pricing Information */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Ticket Prices (KSH)</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500">Economy</div>
                      <div className="font-semibold">{flight.economyPrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Business</div>
                      <div className="font-semibold">{flight.businessPrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">First</div>
                      <div className="font-semibold">{flight.firstPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEditFlight(flight)} className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Flight</DialogTitle>
                        <DialogDescription>Update flight information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="editFlightNumber">Flight Number</Label>
                          <Input
                            id="editFlightNumber"
                            value={newFlight.flightNumber}
                            onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="editDeparture">Departure Airport</Label>
                            <Select
                              value={newFlight.departure}
                              onValueChange={(value) => setNewFlight({ ...newFlight, departure: value, time: "" })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {AIRPORTS.map((airport) => (
                                  <SelectItem key={airport.code} value={`${airport.city} (${airport.code})`}>
                                    {airport.city} ({airport.code}) - {airport.country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="editArrival">Arrival Airport</Label>
                            <Select
                              value={newFlight.arrival}
                              onValueChange={(value) => setNewFlight({ ...newFlight, arrival: value, time: "" })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {AIRPORTS.map((airport) => (
                                  <SelectItem key={airport.code} value={`${airport.city} (${airport.code})`}>
                                    {airport.city} ({airport.code}) - {airport.country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="editDate">Date</Label>
                            <Input
                              id="editDate"
                              type="date"
                              value={newFlight.date}
                              onChange={(e) => setNewFlight({ ...newFlight, date: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="editTime">Departure Time</Label>
                            <Select
                              value={newFlight.time}
                              onValueChange={(value) => setNewFlight({ ...newFlight, time: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableTimes(newFlight.departure, newFlight.arrival).map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="editCapacity">Aircraft Capacity</Label>
                            <Input
                              id="editCapacity"
                              type="number"
                              value={newFlight.capacity}
                              onChange={(e) => setNewFlight({ ...newFlight, capacity: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="editStatus">Flight Status</Label>
                            <Select
                              value={newFlight.status}
                              onValueChange={(value) => setNewFlight({ ...newFlight, status: value as any })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="On Time">On Time</SelectItem>
                                <SelectItem value="Delayed">Delayed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="Boarding">Boarding</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Price Preview for Edit */}
                        {newFlight.departure && newFlight.arrival && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Updated Pricing (KSH)</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Economy:</span>
                                <div className="font-semibold">
                                  KSH{" "}
                                  {calculatePrice(newFlight.departure, newFlight.arrival, "Economy").toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">Business:</span>
                                <div className="font-semibold">
                                  KSH{" "}
                                  {calculatePrice(newFlight.departure, newFlight.arrival, "Business").toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">First Class:</span>
                                <div className="font-semibold">
                                  KSH {calculatePrice(newFlight.departure, newFlight.arrival, "First").toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={handleUpdateFlight}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700"
                        >
                          Update Flight
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFlight(flight.id, flight.flightNumber)}
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

      {filteredFlights.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
          <p className="text-gray-500">Try adjusting your search or add a new flight.</p>
        </motion.div>
      )}
    </div>
  )
}
