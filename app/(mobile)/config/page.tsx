"use client"

import { useState, useEffect } from "react"
import { GlassCard, Section } from "@/components/mobile/containers"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useNotifications } from "@/hooks/use-notifications"
import { Bell, BellOff } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"

export default function ConfigPage() {
  const [tone, setTone] = useState<"leve" | "direto" | "foco">("foco")
  const [sound, setSound] = useState(true)
  const [darkTheme, setDarkTheme] = useState(true)
  
  const {
    isSupported,
    permission,
    isSubscribed,
    subscribe,
    unsubscribe,
    showLocalNotification
  } = useNotifications()

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const success = await subscribe()
      if (success) {
        showLocalNotification('🔥 Notificações ativadas!', {
          body: 'Agora você receberá lembretes do SMV para manter a disciplina!'
        })
      }
    } else {
      await unsubscribe()
    }
  }

  return (
    <div className="flex flex-col space-y-6 pt-6 pb-6">
      {/* Perfil */}
      <Section>
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-white/10" />
            <div>
              <p className="text-base font-semibold">Lucas</p>
              <p className="text-xs text-neutral-300">28 • M • Objetivo: Alta performance</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            <Badge className="rounded-full bg-white/10 text-white border border-white/10">7 dias sem falhar</Badge>
            <Badge className="rounded-full bg-white/10 text-white border border-white/10">3h Deep Work</Badge>
            <Badge className="rounded-full bg-white/10 text-white border border-white/10">2 treinos</Badge>
          </div>
        </GlassCard>
      </Section>

      {/* Ajustes */}
      <Section>
        <GlassCard className="p-4 space-y-4">
          <p className="text-sm font-medium">Ajustes do sistema</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="notif" className="text-sm">Notificações Push</Label>
              {isSupported ? (
                isSubscribed ? (
                  <Bell className="size-4 text-green-500" />
                ) : (
                  <BellOff className="size-4 text-neutral-400" />
                )
              ) : (
                <span className="text-xs text-neutral-500">(Não suportado)</span>
              )}
            </div>
            <Switch 
              id="notif" 
              checked={isSubscribed}
              onCheckedChange={handleNotificationToggle}
              disabled={!isSupported}
              className="data-[state=checked]:bg-[#FF1929]"
            />
          </div>
          {isSupported && permission === 'denied' && (
            <div className="text-xs text-orange-400 mt-1">
              ⚠️ Permissão negada. Ative nas configurações do navegador.
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label htmlFor="som" className="text-sm">Som</Label>
            <Switch 
              id="som" 
              checked={sound}
              onCheckedChange={setSound}
              className="data-[state=checked]:bg-[#FF1929]"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="tema" className="text-sm">Tema escuro</Label>
            <Switch 
              id="tema" 
              checked={darkTheme}
              onCheckedChange={setDarkTheme}
              className="data-[state=checked]:bg-[#FF1929]"
            />
          </div>
        </GlassCard>
      </Section>

      {/* Tom da IA — bolinha vermelha dentro quando selecionado */}
      <Section>
        <GlassCard className="p-4">
          <p className="text-sm font-medium mb-3">Tom da IA</p>
          <RadioGroup
            value={tone}
            onValueChange={(v) => setTone(v as any)}
            className="grid grid-cols-3 gap-3"
          >
            <div className="flex flex-col items-center">
              <RadioGroupItem
                id="leve"
                value="leve"
                className="border-white/30 text-[#FF1929] data-[state=checked]:border-[#FF1929]"
              />
              <Label htmlFor="leve" className="text-xs mt-1 cursor-pointer">Leve</Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem
                id="direto"
                value="direto"
                className="border-white/30 text-[#FF1929] data-[state=checked]:border-[#FF1929]"
              />
              <Label htmlFor="direto" className="text-xs mt-1 cursor-pointer">Direto</Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem
                id="foco"
                value="foco"
                className="border-white/30 text-[#FF1929] data-[state=checked]:border-[#FF1929]"
              />
              <Label htmlFor="foco" className="text-xs mt-1 cursor-pointer">Foco Máximo</Label>
            </div>
          </RadioGroup>
        </GlassCard>
      </Section>

      {/* Ações críticas — botão neutro */}
      <Section>
        <GlassCard className="p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full h-12 text-white font-semibold rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10"
              >
                Resetar metas
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-neutral-900 text-white border border-white/10">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar reset</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação limpará seu progresso. Tem certeza?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </GlassCard>
      </Section>
    </div>
  )
}
