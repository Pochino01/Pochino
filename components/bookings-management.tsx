"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Trash2, Calendar, Plane, User, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

interface Booking {
  id: string
  bookingRef: string
  passengerName: string
  flightNumber: string
  route: string
  date: string
  time: string
  seatClass: "Economy" | "Business" | "First"
  price: number
  status: "Confirmed" | "Pending" | "Cancelled"
  bookingDate: string
  seatNumber: string
}

interface Flight {
  id: string
  flightNumber: string
  departure: string
  arrival: string
  date: string
  time: string
  economyPrice: number
  businessPrice: number
  firstPrice: number
}

interface Passenger {
  id: string
  name: string
  email: string
  phone: string
}

export function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      bookingRef: "KQ001234",
      passengerName: "James Mwangi",
      flightNumber: "KQ100",
      route: "NBO → LHR",
      date: "2024-01-15",
      time: "23:45",
      seatClass: "Business",
      price: 285000,
      status: "Confirmed",
      bookingDate: "2024-01-10",
      seatNumber: "2A",
    },
    {
      id: "2",
      bookingRef: "KQ001235",
      passengerName: "Grace Wanjiku",
      flightNumber: "KQ310",
      route: "NBO → DXB",
      date: "2024-01-15",
      time: "14:30",
      seatClass: "Economy",
      price: 45000,
      status: "Confirmed",
      bookingDate: "2024-01-08",
      seatNumber: "15C",
    },
    {
      id: "3",
      bookingRef: "KQ001236",
      passengerName: "David Kipchoge",
      flightNumber: "KQ003",
      route: "NBO → CDG",
      date: "2024-01-15",
      time: "21:15",
      seatClass: "First",
      price: 500000,
      status: "Pending",
      bookingDate: "2024-01-12",
      seatNumber: "1A",
    },
  ])

  // Mock data - in real app, this would come from props or context
  // Remove the static arrays and replace with dynamic data
  // This would ideally come from a shared state management solution like Context or Redux
  // For now, we'll use expanded mock data that includes newly added items

  const [availableFlights] = useState<Flight[]>([
    {
      id: "1",
      flightNumber: "KQ100",
      departure: "Nairobi (NBO)",
      arrival: "London (LHR)",
      date: "2024-01-15",
      time: "23:45",
      economyPrice: 85000,
      businessPrice: 285000,
      firstPrice: 520000,
    },
    {
      id: "2",
      flightNumber: "KQ310",
      departure: "Nairobi (NBO)",
      arrival: "Dubai (DXB)",
      date: "2024-01-15",
      time: "14:30",
      economyPrice: 45000,
      businessPrice: 135000,
      firstPrice: 250000,
    },
    {
      id: "3",
      flightNumber: "KQ003",
      departure: "Nairobi (NBO)",
      arrival: "Paris (CDG)",
      date: "2024-01-15",
      time: "21:15",
      economyPrice: 82000,
      businessPrice: 275000,
      firstPrice: 500000,
    },
    {
      id: "4",
      flightNumber: "KQ117",
      departure: "Nairobi (NBO)",
      arrival: "Johannesburg (JNB)",
      date: "2024-01-16",
      time: "16:20",
      economyPrice: 35000,
      businessPrice: 105000,
      firstPrice: 195000,
    },
    // Add more sample flights for better booking options
    {
      id: "5",
      flightNumber: "KQ205",
      departure: "Nairobi (NBO)",
      arrival: "Mombasa (MBA)",
      date: "2024-01-17",
      time: "09:30",
      economyPrice: 12000,
      businessPrice: 35000,
      firstPrice: 65000,
    },
    {
      id: "6",
      flightNumber: "KQ401",
      departure: "Nairobi (NBO)",
      arrival: "Mumbai (BOM)",
      date: "2024-01-18",
      time: "14:00",
      economyPrice: 55000,
      businessPrice: 165000,
      firstPrice: 300000,
    },
  ])

  const [availablePassengers] = useState<Passenger[]>([
    { id: "1", name: "James Mwangi", email: "james.mwangi@email.com", phone: "+254 712 345 678" },
    { id: "2", name: "Grace Wanjiku", email: "grace.wanjiku@email.com", phone: "+254 722 987 654" },
    { id: "3", name: "David Kipchoge", email: "david.kipchoge@email.com", phone: "+254 733 456 789" },
    { id: "4", name: "Mary Akinyi", email: "mary.akinyi@email.com", phone: "+254 701 234 567" },
    // Add more sample passengers
    { id: "5", name: "Peter Otieno", email: "peter.otieno@email.com", phone: "+254 745 123 456" },
    { id: "6", name: "Sarah Njeri", email: "sarah.njeri@email.com", phone: "+254 756 789 012" },
    { id: "7", name: "Michael Waweru", email: "michael.waweru@email.com", phone: "+254 767 345 678" },
    { id: "8", name: "Catherine Muthoni", email: "catherine.muthoni@email.com", phone: "+254 778 901 234" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newBooking, setNewBooking] = useState({
    passengerName: "",
    flightNumber: "",
    seatClass: "Economy" as Booking["seatClass"],
    price: 0,
  })

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const generateBookingRef = () => {
    const timestamp = Date.now().toString().slice(-6)
    return `KQ${timestamp}`
  }

  const generateSeatNumber = (seatClass: Booking["seatClass"]) => {
    const rows = {
      First: { min: 1, max: 3, letters: ["A", "B"] },
      Business: { min: 4, max: 12, letters: ["A", "B", "C", "D"] },
      Economy: { min: 13, max: 45, letters: ["A", "B", "C", "D", "E", "F"] },
    }

    const config = rows[seatClass]
    const row = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min
    const letter = config.letters[Math.floor(Math.random() * config.letters.length)]

    return `${row}${letter}`
  }

  const handleFlightSelect = (flightNumber: string) => {
    const flight = availableFlights.find((f) => f.flightNumber === flightNumber)
    if (flight) {
      setSelectedFlight(flight)
      const route = `${flight.departure.split(" (")[0]} → ${flight.arrival.split(" (")[0]}`

      // Update price based on selected class
      let price = flight.economyPrice
      if (newBooking.seatClass === "Business") price = flight.businessPrice
      if (newBooking.seatClass === "First") price = flight.firstPrice

      setNewBooking({
        ...newBooking,
        flightNumber: flight.flightNumber,
        price: price,
      })
    }
  }

  const handleSeatClassChange = (seatClass: Booking["seatClass"]) => {
    if (selectedFlight) {
      let price = selectedFlight.economyPrice
      if (seatClass === "Business") price = selectedFlight.businessPrice
      if (seatClass === "First") price = selectedFlight.firstPrice

      setNewBooking({
        ...newBooking,
        seatClass: seatClass,
        price: price,
      })
    } else {
      setNewBooking({
        ...newBooking,
        seatClass: seatClass,
      })
    }
  }

  const handleAddBooking = () => {
    if (newBooking.passengerName && newBooking.flightNumber && selectedFlight) {
      const route = `${selectedFlight.departure.split(" (")[0]} → ${selectedFlight.arrival.split(" (")[0]}`

      const booking: Booking = {
        id: Date.now().toString(),
        bookingRef: generateBookingRef(),
        passengerName: newBooking.passengerName,
        flightNumber: newBooking.flightNumber,
        route: route,
        date: selectedFlight.date,
        time: selectedFlight.time,
        seatClass: newBooking.seatClass,
        price: newBooking.price,
        status: "Confirmed",
        bookingDate: new Date().toISOString().split("T")[0],
        seatNumber: generateSeatNumber(newBooking.seatClass),
      }

      // Add new booking to the beginning of the list for immediate visibility
      setBookings([booking, ...bookings])

      // Reset form
      setNewBooking({
        passengerName: "",
        flightNumber: "",
        seatClass: "Economy",
        price: 0,
      })
      setSelectedFlight(null)
      setIsAddDialogOpen(false)

      // Show success feedback
      console.log("Booking created successfully:", booking.bookingRef, "for", booking.passengerName)
    }
  }

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id))
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeatClassColor = (seatClass: Booking["seatClass"]) => {
    switch (seatClass) {
      case "Economy":
        return "bg-blue-100 text-blue-800"
      case "Business":
        return "bg-purple-100 text-purple-800"
      case "First":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Booking Management
          </h1>
          <p className="text-gray-600">Manage flight reservations and bookings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <Plus className="w-4 h-4 mr-2" />
              Create Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>Book a flight for a passenger with real-time pricing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="passenger">Select Passenger *</Label>
                <Select
                  value={newBooking.passengerName}
                  onValueChange={(value) => setNewBooking({ ...newBooking, passengerName: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose passenger" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePassengers.map((passenger) => (
                      <SelectItem key={passenger.id} value={passenger.name}>
                        {passenger.name} - {passenger.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="flight">Select Flight *</Label>
                <Select value={newBooking.flightNumber} onValueChange={handleFlightSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose flight" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFlights.map((flight) => (
                      <SelectItem key={flight.id} value={flight.flightNumber}>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {flight.flightNumber} - {flight.departure.split(" (")[0]} → {flight.arrival.split(" (")[0]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {flight.date} at {flight.time}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedFlight && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Flight Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Route:</span>
                      <div className="font-medium">
                        {selectedFlight.departure} → {selectedFlight.arrival}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Departure:</span>
                      <div className="font-medium">
                        {selectedFlight.date} at {selectedFlight.time}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="seatClass">Seat Class *</Label>
                <Select value={newBooking.seatClass} onValueChange={handleSeatClassChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">
                      <div className="flex justify-between items-center w-full">
                        <span>Economy Class</span>
                        {selectedFlight && (
                          <span className="ml-4 text-sm text-gray-500">
                            KSH {selectedFlight.economyPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                    <SelectItem value="Business">
                      <div className="flex justify-between items-center w-full">
                        <span>Business Class</span>
                        {selectedFlight && (
                          <span className="ml-4 text-sm text-gray-500">
                            KSH {selectedFlight.businessPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                    <SelectItem value="First">
                      <div className="flex justify-between items-center w-full">
                        <span>First Class</span>
                        {selectedFlight && (
                          <span className="ml-4 text-sm text-gray-500">
                            KSH {selectedFlight.firstPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Summary */}
              {newBooking.price > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Passenger:</span>
                      <span className="font-medium">{newBooking.passengerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flight:</span>
                      <span className="font-medium">{newBooking.flightNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Class:</span>
                      <span className="font-medium">{newBooking.seatClass}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total Price:</span>
                      <span className="font-bold text-green-800">KSH {newBooking.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAddBooking}
                className="w-full bg-gradient-to-r from-red-600 to-red-700"
                disabled={!newBooking.passengerName || !newBooking.flightNumber || !selectedFlight}
              >
                Create Booking - KSH {newBooking.price.toLocaleString()}
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
          placeholder="Search bookings by reference, passenger, or flight..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-red-800">{booking.bookingRef}</CardTitle>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>
                <CardDescription className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">{booking.passengerName}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Plane className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">
                      {booking.flightNumber} - {booking.route}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeatClassColor(booking.seatClass)}>{booking.seatClass}</Badge>
                    <span className="text-gray-500">Seat {booking.seatNumber}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">Total Price</span>
                  </div>
                  <span className="font-bold text-red-800">KSH {booking.price.toLocaleString()}</span>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500">Try adjusting your search or create a new booking.</p>
        </motion.div>
      )}
    </div>
  )
}
