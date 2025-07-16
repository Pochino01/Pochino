"use client"

import { motion } from "framer-motion"
import { Plane, BarChart3, Users, Calendar, CreditCard, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavigationProps {
  currentScreen: string
  onNavigate: (screen: "dashboard" | "flights" | "passengers" | "bookings" | "reports") => void
  onLogout: () => void
}

export function Navigation({ currentScreen, onNavigate, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "flights", label: "Flights", icon: Plane },
    { id: "passengers", label: "Passengers", icon: Users },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "reports", label: "Reports", icon: CreditCard },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <Plane className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-white font-bold text-xl tracking-wider">AIRTRACK</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = currentScreen === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => onNavigate(item.id as any)}
                  className={`text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-white/20 shadow-lg" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
          </div>

          {/* Desktop Logout */}
          <div className="hidden md:flex">
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/20 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 py-4"
          >
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentScreen === item.id
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => {
                      onNavigate(item.id as any)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full justify-start text-white hover:bg-white/20 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-white/20" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
              <Button
                variant="ghost"
                onClick={onLogout}
                className="w-full justify-start text-white hover:bg-white/20 px-4 py-3 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
