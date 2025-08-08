"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/mobile/containers"
import { Button } from "@/components/ui/button"
import { RED } from "@/lib/constants"
import { Plus, X, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Listener para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Mostrar prompt após 3 segundos se não estiver instalado
      setTimeout(() => {
        if (!window.matchMedia('(display-mode: standalone)').matches) {
          setShowPrompt(true)
        }
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Para iOS, mostrar prompt manual após 5 segundos
    if (iOS && !window.navigator.standalone) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        setShowPrompt(false)
      }
    }
  }

  const handleClose = () => {
    setShowPrompt(false)
    // Não mostrar novamente por 24 horas
    localStorage.setItem('installPromptDismissed', Date.now().toString())
  }

  // Verificar se foi dispensado recentemente
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (now - dismissedTime < twentyFourHours) {
        setShowPrompt(false)
        return
      }
    }
  }, [])

  if (!showPrompt) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassCard className="p-6 max-w-sm w-full relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${RED}20` }}
          >
            <Smartphone className="size-8" style={{ color: RED }} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Adicionar à Tela Inicial
          </h3>
          <p className="text-sm text-neutral-400">
            Instale o AI Discipline para acesso rápido e uma experiência melhor
          </p>
        </div>

        {/* Instructions for iOS */}
        {isIOS && (
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-neutral-400 text-center">
              Para instalar no iOS:
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-neutral-300">
              <span>Toque em</span>
              <div className="w-4 h-4 border border-neutral-400 rounded flex items-center justify-center">
                <Plus className="size-2" />
              </div>
              <span>e depois "Adicionar à Tela de Início"</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          {!isIOS && deferredPrompt && (
            <Button
              onClick={handleInstall}
              className="w-full h-12 text-white font-semibold rounded-2xl border-0"
              style={{ 
                backgroundColor: RED,
                boxShadow: `0 8px 24px ${RED}35`
              }}
            >
              Instalar App
            </Button>
          )}
          
          <Button
            onClick={handleClose}
            className="w-full h-10 text-neutral-400 font-medium rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Agora não
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}