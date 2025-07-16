"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define interfaces
interface Flight {
  id: string
  flightNumber: string
  departure: string
  arrival: string
  date: string
  time: string
  capacity: number
  booked: number
  status: "On Time" | "Delayed" | "Cancelled" | "Boarding"
  economyPrice: number
  businessPrice: number
  firstPrice: number
}

interface Passenger {
  id: string
  name: string
  email: string
  phone: string
  nationality: string
  passportNumber: string
  dateOfBirth: string
  totalFlights: number
  memberSince: string
  frequentFlyerNumber: string
}

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

interface SharedDataContextType {
  flights: Flight[]
  passengers: Passenger[]
  bookings: Booking[]
  addFlight: (flight: Flight) => void
  addPassenger: (passenger: Passenger) => void
  addBooking: (booking: Booking) => void
  updateFlight: (id: string, flight: Partial<Flight>) => void
  updatePassenger: (id: string, passenger: Partial<Passenger>) => void
  deleteFlight: (id: string) => void
  deletePassenger: (id: string) => void
  deleteBooking: (id: string) => void
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined)

export function SharedDataProvider({ children }: { children: ReactNode }) {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: "1",
      flightNumber: "KQ100",
      departure: "Nairobi (NBO)",
      arrival: "London (LHR)",
      date: "2024-01-15",
      time: "23:45",
      capacity: 280,
      booked: 245,
      status: "On Time",
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
      capacity: 250,
      booked: 198,
      status: "Delayed",
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
      capacity: 320,
      booked: 276,
      status: "Boarding",
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
      capacity: 180,
      booked: 156,
      status: "On Time",
      economyPrice: 35000,
      businessPrice: 105000,
      firstPrice: 195000,
    },
  ])

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: "1",
      name: "James Mwangi",
      email: "james.mwangi@email.com",
      phone: "+254 712 345 678",
      nationality: "Kenyan",
      passportNumber: "A1234567",
      dateOfBirth: "1985-03-15",
      totalFlights: 12,
      memberSince: "2023-01-15",
      frequentFlyerNumber: "KQ001234567",
    },
    {
      id: "2",
      name: "Grace Wanjiku",
      email: "grace.wanjiku@email.com",
      phone: "+254 722 987 654",
      nationality: "Kenyan",
      passportNumber: "A2345678",
      dateOfBirth: "1990-07-22",
      totalFlights: 8,
      memberSince: "2023-03-22",
      frequentFlyerNumber: "KQ002345678",
    },
    {
      id: "3",
      name: "David Kipchoge",
      email: "david.kipchoge@email.com",
      phone: "+254 733 456 789",
      nationality: "Kenyan",
      passportNumber: "A3456789",
      dateOfBirth: "1982-11-08",
      totalFlights: 15,
      memberSince: "2022-11-08",
      frequentFlyerNumber: "KQ003456789",
    },
    {
      id: "4",
      name: "Mary Akinyi",
      email: "mary.akinyi@email.com",
      phone: "+254 701 234 567",
      nationality: "Kenyan",
      passportNumber: "A4567890",
      dateOfBirth: "1988-05-10",
      totalFlights: 6,
      memberSince: "2023-05-10",
      frequentFlyerNumber: "KQ004567890",
    },
  ])

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

  const addFlight = (flight: Flight) => {
    setFlights((prev) => [flight, ...prev])
  }

  const addPassenger = (passenger: Passenger) => {
    setPassengers((prev) => [passenger, ...prev])
  }

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev])

    // Update passenger's total flights count
    setPassengers((prev) =>
      prev.map((p) => (p.name === booking.passengerName ? { ...p, totalFlights: p.totalFlights + 1 } : p)),
    )

    // Update flight's booked count
    setFlights((prev) =>
      prev.map((f) => (f.flightNumber === booking.flightNumber ? { ...f, booked: f.booked + 1 } : f)),
    )
  }

  const updateFlight = (id: string, updatedFlight: Partial<Flight>) => {
    setFlights((prev) => prev.map((f) => (f.id === id ? { ...f, ...updatedFlight } : f)))
  }

  const updatePassenger = (id: string, updatedPassenger: Partial<Passenger>) => {
    setPassengers((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedPassenger } : p)))
  }

  const deleteFlight = (id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id))
  }

  const deletePassenger = (id: string) => {
    setPassengers((prev) => prev.filter((p) => p.id !== id))
  }

  const deleteBooking = (id: string) => {
    const booking = bookings.find((b) => b.id === id)
    if (booking) {
      // Update flight's booked count
      setFlights((prev) =>
        prev.map((f) => (f.flightNumber === booking.flightNumber ? { ...f, booked: Math.max(0, f.booked - 1) } : f)),
      )

      // Update passenger's total flights count
      setPassengers((prev) =>
        prev.map((p) =>
          p.name === booking.passengerName ? { ...p, totalFlights: Math.max(0, p.totalFlights - 1) } : p,
        ),
      )
    }

    setBookings((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <SharedDataContext.Provider
      value={{
        flights,
        passengers,
        bookings,
        addFlight,
        addPassenger,
        addBooking,
        updateFlight,
        updatePassenger,
        deleteFlight,
        deletePassenger,
        deleteBooking,
      }}
    >
      {children}
    </SharedDataContext.Provider>
  )
}

export function useSharedData() {
  const context = useContext(SharedDataContext)
  if (context === undefined) {
    throw new Error("useSharedData must be used within a SharedDataProvider")
  }
  return context
}
