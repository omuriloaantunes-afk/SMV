"use client"

import { useMemo } from "react"
import { Check, Sparkles, Zap, Bot } from 'lucide-react'
import { GlassCard, Section, PriorityTag } from "@/components/mobile/containers"
import { ChatComposer } from "@/components/mobile/chat-composer"
import { RED } from "@/lib/constants"
import { useTasks } from "@/hooks/use-tasks"

export default function TarefasPage() {
  const { tasks, isLoading, addTask, toggleTask } = useTasks()

  const completedPct = useMemo(() => {
    const total = tasks.length || 1
    const done = tasks.filter((t) => t.done).length
    return Math.round((done / total) * 100)
  }, [tasks])

  async function handleAddTask(text: string) {
    await addTask(text)
  }

  return (
    <div className="flex flex-col space-y-6 pt-6">
      {/* Card Tarefas concluídas */}
      <Section>
        <GlassCard glass="red" className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Tarefas concluídas</p>
            <p className="text-2xl font-semibold">{completedPct}%</p>
            <p className="text-sm mt-1 opacity-90">Disciplina acima de conforto.</p>
          </div>
          <div className="relative">
            <Sparkles className="size-8 text-white animate-pulse" />
          </div>
        </GlassCard>
      </Section>

      {/* Lista de tarefas com espaço para a barra de digitação */}
      <Section className="pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-neutral-400">
              <div className="w-4 h-4 border-2 border-neutral-400 border-t-red-500 rounded-full animate-spin" />
              <span className="text-sm">Carregando tarefas...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <GlassCard glass="dark" className="p-6 text-center">
                <Bot className="size-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-sm text-neutral-400 mb-2">Nenhuma tarefa ainda</p>
                <p className="text-xs text-neutral-500">
                  Converse com o SMV no chat para criar tarefas automaticamente!
                </p>
              </GlassCard>
            ) : (
              tasks.map((t) => (
                <GlassCard key={t.id} glass="dark" className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(t.id)}
                      aria-label={t.done ? "Desmarcar" : "Concluir"}
                      className="size-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <Check
                        className={`transition-transform ${t.done ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                      />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`text-sm ${t.done ? "line-through text-neutral-400" : ""}`}>
                          {t.name}
                        </p>
                        {(t as any).createdBy === 'ai' && (
                          <Bot className="size-3 text-red-500" title="Criada pela IA" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">
                          {new Date(t.due).toLocaleDateString("pt-BR")}
                        </span>
                        <PriorityTag level={t.priority} />
                      </div>
                    </div>
                    <Zap className="text-neutral-400" />
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        )}
      </Section>

      {/* Barra de digitação fixa na parte inferior com espaçamento da barra de menu */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pb-[120px] pt-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="mx-auto max-w-md px-4">
          <ChatComposer onSend={handleAddTask} placeholder="Adicionar nova tarefa..." />
        </div>
      </div>
    </div>
  )
}
