"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/mobile/containers"
import { Button } from "@/components/ui/button"
import { RED } from "@/lib/constants"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação simples
    if (username === "123" && password === "123") {
      setIsLoading(true)
      
      // Simular loading
      setTimeout(() => {
        router.push("/chat")
      }, 1500)
    } else {
      alert("Credenciais inválidas. Use 123/123")
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${RED}15 0%, transparent 70%)`,
        }}
      />
      
      {/* Logo */}
      <div className="mb-8 z-10">
        <img 
          src="/logoheader.png" 
          alt="Logo" 
          className="h-16 w-auto mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-white text-center">
          Bem-vindo de volta
        </h1>
        <p className="text-neutral-400 text-center mt-2">
          Entre para continuar sua jornada
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm z-10">
        <GlassCard className="p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Usuário
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/30 transition-colors"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/30 transition-colors"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-white font-semibold rounded-2xl border-0 transition-all duration-300 disabled:opacity-50"
              style={{ 
                backgroundColor: RED,
                boxShadow: `0 8px 24px ${RED}35`
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-neutral-400 text-center">
              <strong>Demo:</strong> usuário: 123 | senha: 123
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center z-10">
        <p className="text-xs text-neutral-500">
          AI Discipline © 2025
        </p>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-10 animate-float"
            style={{
              backgroundColor: RED,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}