"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Dashboard } from "@/components/dashboard"
import { FlightsManagement } from "@/components/flights-management"
import { PassengersManagement } from "@/components/passengers-management"
import { BookingsManagement } from "@/components/bookings-management"
import { ReportsSection } from "@/components/reports-section"
import { Navigation } from "@/components/navigation"
import { SharedDataProvider } from "@/components/shared-data-context"

export default function AirTrackApp() {
  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "login" | "dashboard" | "flights" | "passengers" | "bookings" | "reports"
  >("welcome")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true)
      setCurrentScreen("dashboard")
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("welcome")
  }

  if (currentScreen === "welcome") {
    return <WelcomeScreen onGetStarted={() => setCurrentScreen("login")} />
  }

  if (currentScreen === "login" || !isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <SharedDataProvider>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} onLogout={handleLogout} />
        <main className="pt-20">
          {currentScreen === "dashboard" && <Dashboard onNavigate={setCurrentScreen} />}
          {currentScreen === "flights" && <FlightsManagement />}
          {currentScreen === "passengers" && <PassengersManagement />}
          {currentScreen === "bookings" && <BookingsManagement />}
          {currentScreen === "reports" && <ReportsSection />}
        </main>
      </div>
    </SharedDataProvider>
  )
}
