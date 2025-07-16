"use client"

import { motion } from "framer-motion"
import { Plane, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 max-w-4xl mx-auto px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="bg-white rounded-full p-4 shadow-2xl">
            <Plane className="w-12 h-12 text-red-600" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider"
        >
          AIRTRACK
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-2xl md:text-3xl text-amber-100 mb-8 font-light italic"
        >
          Your Sky, Your Way
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Experience the future of airline operations management. Streamline your flights, passengers, and bookings with
          our comprehensive dashboard solution.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-red-900 font-semibold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane className="w-8 h-8" />
            </div>
            <h3 className="font-semibold mb-2">Flight Management</h3>
            <p className="text-sm">Comprehensive flight scheduling and tracking</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <h3 className="font-semibold mb-2">Passenger Care</h3>
            <p className="text-sm">Advanced passenger management system</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded"></div>
            </div>
            <h3 className="font-semibold mb-2">Smart Analytics</h3>
            <p className="text-sm">Real-time reports and insights</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
