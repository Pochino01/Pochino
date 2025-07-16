"use client"

import { motion } from "framer-motion"
import { Plane, Users, Calendar, DollarSign, TrendingUp, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface DashboardProps {
  onNavigate?: (screen: "flights" | "passengers" | "bookings" | "reports") => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: "Total Flights",
      value: "847",
      change: "+8%",
      icon: Plane,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Passengers",
      value: "45,230",
      change: "+12%",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Bookings",
      value: "1,456",
      change: "+15%",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Revenue",
      value: "KSH 285M",
      change: "+18%",
      icon: DollarSign,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  const recentFlights = [
    { id: "KQ100", route: "NBO → LHR", status: "On Time", passengers: 280, departure: "23:45" },
    { id: "KQ310", route: "NBO → DXB", status: "Delayed", passengers: 250, departure: "14:30" },
    { id: "KQ003", route: "NBO → CDG", status: "Boarding", passengers: 320, departure: "21:15" },
    { id: "KQ117", route: "NBO → JNB", status: "On Time", passengers: 180, departure: "16:20" },
  ]

  const topDestinations = [
    { city: "Dubai", flights: 35, percentage: 85 },
    { city: "London", flights: 28, percentage: 68 },
    { city: "Johannesburg", flights: 32, percentage: 78 },
    { city: "Amsterdam", flights: 24, percentage: 58 },
    { city: "Mumbai", flights: 20, percentage: 48 },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
          AIRTRACK Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, Administrator</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Flights */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Plane className="w-5 h-5 mr-2" />
                Recent Flights
              </CardTitle>
              <CardDescription>Latest flight operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFlights.map((flight, index) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="font-semibold text-red-800">{flight.id}</div>
                      <div className="text-sm text-gray-600">{flight.route}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          flight.status === "On Time"
                            ? "default"
                            : flight.status === "Delayed"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {flight.status}
                      </Badge>
                      <div className="text-xs text-gray-500">{flight.departure}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Destinations */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <MapPin className="w-5 h-5 mr-2" />
                Top Destinations
              </CardTitle>
              <CardDescription>Most popular routes this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.city}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{destination.city}</div>
                      <div className="text-sm text-gray-600">{destination.flights} flights</div>
                    </div>
                    <Progress value={destination.percentage} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-red-800 text-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription className="text-red-100">Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Add Flight", icon: Plane, action: "flights" },
                { label: "New Passenger", icon: Users, action: "passengers" },
                { label: "Create Booking", icon: Calendar, action: "bookings" },
                { label: "View Reports", icon: TrendingUp, action: "reports" },
              ].map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    onClick={() => onNavigate?.(action.action as any)}
                    className="flex flex-col items-center p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
