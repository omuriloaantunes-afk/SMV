"use client"

import { useMemo, useState, useEffect } from "react"
import { GlassCard, Section, PriorityTag } from "@/components/mobile/containers"
import { getMonthMatrix, isSameDay } from "@/lib/date"
import { RED } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { RefreshCw, Calendar, Clock } from "lucide-react"

type DayStatus = "green" | "yellow" | "red"

type Task = {
  id: string
  name: string
  date: Date
  priority: "alta" | "média" | "baixa"
  done?: boolean
}

// Use datas fixas para evitar problemas de hidratação
const sampleTasks: Task[] = [
  { id: "c1", name: "Deep work", date: new Date(2025, 7, 3), priority: "alta", done: true },
  { id: "c2", name: "Treino", date: new Date(2025, 7, 3), priority: "média", done: true },
  { id: "c3", name: "Leitura", date: new Date(2025, 7, 5), priority: "baixa", done: false },
  { id: "c4", name: "Revisão", date: new Date(2025, 7, 12), priority: "alta", done: false },
  { id: "c5", name: "Planejamento", date: new Date(2025, 7, 12), priority: "média", done: true },
  { id: "c6", name: "Cardio", date: new Date(2025, 7, 18), priority: "média", done: true },
]

function computeStatus(date: Date, tasks: Task[]): DayStatus {
  const dayTasks = tasks.filter((t) => isSameDay(t.date, date))
  if (dayTasks.length === 0) return "red"
  const done = dayTasks.filter((t) => t.done).length
  if (done === dayTasks.length) return "green"
  if (done > 0) return "yellow"
  return "red"
}

export default function CalendarioPage() {
  // Use uma data fixa inicial para evitar problemas de hidratação
  const [today] = useState(() => new Date(2025, 7, 8)) // 8 de agosto de 2025
  const [selected, setSelected] = useState<Date>(today)
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  
  const cells = useMemo(() => getMonthMatrix(today.getFullYear(), today.getMonth()), [today])

  // Carregar eventos do calendário
  useEffect(() => {
    loadCalendarEvents()
  }, [])

  const loadCalendarEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/calendar')
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncWithTasks = async () => {
    try {
      setIsSyncing(true)
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync-from-tasks' })
      })

      const data = await response.json()
      
      if (data.success) {
        await loadCalendarEvents() // Recarregar eventos
        
        // Mostrar notificação
        if (data.syncedEvents > 0) {
          alert(`✅ ${data.syncedEvents} tarefa${data.syncedEvents > 1 ? 's' : ''} sincronizada${data.syncedEvents > 1 ? 's' : ''} com o calendário!`)
        } else {
          alert('📅 Calendário já está sincronizado com as tarefas!')
        }
      }
    } catch (error) {
      console.error('Erro ao sincronizar:', error)
      alert('❌ Erro ao sincronizar com tarefas')
    } finally {
      setIsSyncing(false)
    }
  }

  const dayEvents = useMemo(() => {
    const selectedDateStr = selected.toISOString().split('T')[0]
    return events.filter((event) => event.date === selectedDateStr)
  }, [events, selected])

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-blue-600/30 text-blue-300 border-blue-500/30'
      case 'exercise': return 'bg-green-600/30 text-green-300 border-green-500/30'
      case 'learning': return 'bg-purple-600/30 text-purple-300 border-purple-500/30'
      case 'meeting': return 'bg-orange-600/30 text-orange-300 border-orange-500/30'
      default: return 'bg-neutral-600/30 text-neutral-300 border-neutral-500/30'
    }
  }

  return (
    <div className="flex flex-col space-y-6 pt-6 pb-6">
      <Section>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Calendário</h1>
          <Button
            onClick={syncWithTasks}
            disabled={isSyncing}
            className="h-9 px-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white"
          >
            {isSyncing ? (
              <RefreshCw className="size-4 animate-spin" />
            ) : (
              <RefreshCw className="size-4" />
            )}
            <span className="ml-2 text-xs">Sync</span>
          </Button>
        </div>
      </Section>

      <Section>
        <GlassCard className="p-3">
          {/* Header weekdays */}
          <div className="grid grid-cols-7 text-center text-xs text-neutral-400 py-2">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1 pb-2">
            {cells.map((d, i) => {
              if (!d) return <div key={i} className="h-10" />
              const isToday = isSameDay(d, today)
              const isSelected = isSameDay(d, selected)
              const status = computeStatus(d, sampleTasks)
              const ring = isToday ? `2px solid ${RED}` : isSelected ? `2px solid rgba(255,255,255,0.3)` : "1px solid rgba(255,255,255,0.1)"
              const statusColor = status === "green" ? "bg-emerald-500" : status === "yellow" ? "bg-yellow-400" : "bg-red-500"

              return (
                <button
                  key={i}
                  onClick={() => setSelected(d)}
                  className="h-10 rounded-xl flex items-center justify-center relative"
                  style={{ border: ring, background: "rgba(255,255,255,0.03)" }}
                >
                  <span className="text-sm">{d.getDate()}</span>
                  <span className={`absolute -bottom-1 h-1.5 w-1.5 rounded-full ${statusColor}`} />
                </button>
              )
            })}
          </div>
        </GlassCard>
      </Section>



      {/* Eventos do dia */}
      <Section className="pb-6">
        <div className="space-y-3">
          {isLoading ? (
            <GlassCard glass="dark" className="p-4 text-center">
              <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-neutral-400" />
              <p className="text-sm text-neutral-400">Carregando eventos...</p>
            </GlassCard>
          ) : dayEvents.length === 0 ? (
            <GlassCard glass="dark" className="p-4 text-center">
              <Calendar className="size-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-300 mb-2">Nenhum evento para este dia</p>
              <p className="text-xs text-neutral-500">
                Use o botão "Sync" para sincronizar com suas tarefas
              </p>
            </GlassCard>
          ) : (
            dayEvents.map((event: any) => (
              <GlassCard key={event.id} glass="dark" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="size-3 text-neutral-400" />
                      <span className="text-xs text-neutral-400">{event.time}</span>
                      <span className="text-xs text-neutral-500">({event.duration}min)</span>
                    </div>
                    <p className="text-sm font-medium">{event.title}</p>
                    {event.createdFrom === 'task' && (
                      <p className="text-xs text-neutral-500 mt-1">📋 Sincronizado das tarefas</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getEventTypeColor(event.type)}`}>
                      {event.type.toUpperCase()}
                    </span>
                    {event.priority && (
                      <PriorityTag level={event.priority} />
                    )}
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </Section>
    </div>
  )
}
