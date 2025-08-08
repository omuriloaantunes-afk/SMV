"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RED } from "@/lib/constants"

export default function SplashPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Animação de entrada
    setIsVisible(true)
    
    // Redirecionar após 3 segundos
    const timer = setTimeout(() => {
      router.push("/login")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${RED}20 0%, transparent 70%)`,
        }}
      />
      
      {/* Logo container */}
      <div 
        className={`relative z-10 transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logoheader.png" 
              alt="Logo" 
              className="h-20 w-auto"
            />
          </div>
          
          {/* App name */}
          <h1 className="text-3xl font-bold text-white mb-2">
            AI Discipline
          </h1>
          
          {/* Tagline */}
          <p className="text-neutral-400 text-center max-w-xs">
            Produtividade com IA disciplinadora
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div 
        className={`absolute bottom-20 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex space-x-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: RED }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: RED,
              animationDelay: "0.2s"
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: RED,
              animationDelay: "0.4s"
            }}
          />
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20 animate-float"
            style={{
              backgroundColor: RED,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}