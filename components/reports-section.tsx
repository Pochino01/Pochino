"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, MapPin, DollarSign, Calendar, Users, Plane } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ReportsSection() {
  const topDestinations = [
    { city: "Dubai", country: "United Arab Emirates", flights: 35, revenue: 8500000, growth: 12 },
    { city: "London", country: "United Kingdom", flights: 28, revenue: 12800000, growth: 8 },
    { city: "Johannesburg", country: "South Africa", flights: 32, revenue: 6200000, growth: 15 },
    { city: "Amsterdam", country: "Netherlands", flights: 24, revenue: 9800000, growth: 5 },
    { city: "Mumbai", country: "India", flights: 20, revenue: 5400000, growth: -2 },
  ]

  const dailyBookings = [
    { date: "Jan 10", bookings: 35, revenue: 8500000 },
    { date: "Jan 11", bookings: 42, revenue: 9200000 },
    { date: "Jan 12", bookings: 28, revenue: 6800000 },
    { date: "Jan 13", bookings: 51, revenue: 11800000 },
    { date: "Jan 14", bookings: 37, revenue: 8900000 },
    { date: "Jan 15", bookings: 45, revenue: 10200000 },
    { date: "Jan 16", bookings: 39, revenue: 9400000 },
  ]

  const monthlyRevenue = [
    { month: "Aug", revenue: 180000000, target: 170000000 },
    { month: "Sep", revenue: 195000000, target: 185000000 },
    { month: "Oct", revenue: 172000000, target: 180000000 },
    { month: "Nov", revenue: 208000000, target: 200000000 },
    { month: "Dec", revenue: 235000000, target: 220000000 },
    { month: "Jan", revenue: 285000000, target: 260000000 },
  ]

  const fleetUtilization = [
    { aircraft: "A380-800", utilization: 85, flights: 156 },
    { aircraft: "Boeing 777", utilization: 92, flights: 184 },
    { aircraft: "A350-900", utilization: 78, flights: 142 },
    { aircraft: "Boeing 787", utilization: 88, flights: 167 },
  ]

  const maxBookings = Math.max(...dailyBookings.map((d) => d.bookings))
  const maxRevenue = Math.max(...monthlyRevenue.map((r) => r.revenue))

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
          Analytics & Reports
        </h1>
        <p className="text-gray-600">Comprehensive insights into your airline operations</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: "KSH 285M",
            change: "+12.5%",
            icon: DollarSign,
            color: "from-green-500 to-green-600",
          },
          {
            title: "Monthly Flights",
            value: "1,247",
            change: "+8.2%",
            icon: Plane,
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Passengers",
            value: "89,432",
            change: "+15.3%",
            icon: Users,
            color: "from-purple-500 to-purple-600",
          },
          {
            title: "Load Factor",
            value: "87.5%",
            change: "+3.1%",
            icon: BarChart3,
            color: "from-amber-500 to-amber-600",
          },
        ].map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color} bg-opacity-10`}>
                    <Icon className={`w-4 h-4 bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.change} from last month
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Destinations */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <MapPin className="w-5 h-5 mr-2" />
                Top Destinations
              </CardTitle>
              <CardDescription>Most popular routes by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.city}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-gray-900">{destination.city}</div>
                        <div className="text-sm text-gray-600">{destination.flights} flights</div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{destination.country}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-800">
                          KSH {destination.revenue.toLocaleString()}
                        </span>
                        <Badge variant={destination.growth >= 0 ? "default" : "destructive"} className="text-xs">
                          {destination.growth >= 0 ? "+" : ""}
                          {destination.growth}%
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Bookings Trend */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Calendar className="w-5 h-5 mr-2" />
                Daily Bookings Trend
              </CardTitle>
              <CardDescription>Last 7 days booking activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyBookings.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">{day.date}</div>
                      <div className="text-sm text-gray-600">{day.bookings} bookings</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={(day.bookings / maxBookings) * 100} className="flex-1 h-2" />
                      <span className="text-xs text-red-800 font-medium">KSH {day.revenue.toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <DollarSign className="w-5 h-5 mr-2" />
                Monthly Revenue vs Target
              </CardTitle>
              <CardDescription>Revenue performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((month, index) => (
                  <motion.div
                    key={month.month}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">{month.month}</div>
                      <div className="text-sm text-gray-600">
                        KSH {month.revenue.toLocaleString()} / KSH {month.target.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={(month.revenue / maxRevenue) * 100} className="h-3" />
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Target: KSH {month.target.toLocaleString()}</span>
                        <span className={month.revenue >= month.target ? "text-green-600" : "text-red-600"}>
                          {month.revenue >= month.target ? "✓ Target Met" : "Below Target"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fleet Utilization */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Plane className="w-5 h-5 mr-2" />
                Fleet Utilization
              </CardTitle>
              <CardDescription>Aircraft efficiency and usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fleetUtilization.map((aircraft, index) => (
                  <motion.div
                    key={aircraft.aircraft}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{aircraft.aircraft}</div>
                      <div className="text-sm text-gray-600">{aircraft.flights} flights</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={aircraft.utilization} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-red-800">{aircraft.utilization}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
