"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { GlassCard, Section } from "@/components/mobile/containers"
import { ChatComposer } from "@/components/mobile/chat-composer"
import { formatTodayLongPT } from "@/lib/date"
import { RED } from "@/lib/constants"
import { Activity, Zap, BookOpen, Moon, Brain, Share2, Bookmark, Bot, User } from 'lucide-react'
import { StoryPills } from "@/components/mobile/story-pills"
import { useTasks } from "@/hooks/use-tasks"
import { TypingAnimation } from "@/components/ui/typing-animation"

type Msg = { 
  id: string; 
  role: "user" | "ai"; 
  text: string;
  isTyping?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { 
      id: "m0", 
      role: "ai", 
      text: "Fala, guerreiro! SMV aqui. Pronto para dominar mais um dia? Me conta o que temos pela frente hoje que eu vou te ajudar a organizar essa parada e transformar você numa máquina de resultados! Qual é a sua prioridade número 1 agora?",
      isTyping: false // Mensagem inicial já aparece completa
    },
  ])
  const [selectedStory, setSelectedStory] = useState<string | undefined>("foco")
  const [isLoading, setIsLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const { addTasksFromAI } = useTasks()

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const today = useMemo(() => formatTodayLongPT(), [])

  const stories = [
    { id: "academia", label: "Academia", icon: <Activity /> },
    { id: "foco", label: "Foco", icon: <Zap /> },
    { id: "leitura", label: "Leitura", icon: <BookOpen /> },
    { id: "sono", label: "Sono", icon: <Moon /> },
    { id: "mindset", label: "Mindset", icon: <Brain /> }, // 5ª categoria
  ]

  async function handleSend(text: string) {
    const userMessageId = `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    
    // Adicionar mensagem do usuário
    setMessages((m) => [...m, { id: userMessageId, role: "user", text }])
    setIsLoading(true)

    try {
      // Enviar para API da OpenAI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          conversationHistory: messages.slice(-8) // Últimas 8 mensagens para contexto
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Adicionar resposta da IA com animação de digitação
      const aiMessageId = `ai-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      
      // Primeiro adiciona uma mensagem vazia que vai ser "digitada"
      setMessages((m) => [...m, { 
        id: aiMessageId, 
        role: "ai", 
        text: data.response,
        isTyping: true
      }])

      // Se a IA identificou tarefas, adicionar ao sistema
      if (data.tasks && data.tasks.length > 0) {
        console.log('Tarefas identificadas pela IA:', data.tasks)
        
        // Aguardar um pouco para a animação de digitação
        setTimeout(async () => {
          await addTasksFromAI(data.tasks)
          
          // Mostrar notificação de tarefas criadas
          const taskCount = data.tasks.length
          const taskNotification = `✅ Criei ${taskCount} tarefa${taskCount > 1 ? 's' : ''} para você na aba Tarefas!`
          
          setTimeout(() => {
            setMessages((m) => [...m, { 
              id: `notification-${Date.now()}`, 
              role: "ai", 
              text: taskNotification,
              isTyping: true
            }])
          }, 500)
        }, 2000)
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      
      // Mensagem de erro
      setMessages((m) => [...m, { 
        id: `error-${Date.now()}`, 
        role: "ai", 
        text: "Eita, guerreiro! Deu um problema aqui. Tenta de novo que eu vou te responder na lata!",
        isTyping: true
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh-96px)] overflow-hidden">
      {/* Top red glow — maior e animação mais perceptível */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-56 z-30 animate-red-glow-strong"
        style={{
          background:
            "radial-gradient(100% 80% at 50% 0%, rgba(255,25,41,0.45) 0%, rgba(255,25,41,0.30) 45%, rgba(255,25,41,0.00) 100%)",
          mixBlendMode: "screen",
          left: "128px",
          right: "0px",
          top: "-415px",
          filter: "blur(12px)",
          opacity: "0.550247",
          transform: "matrix(1.00003, 0, 0, 1.00003, -112.002, 0)"
        }}
      />

      {/* Header com espaçamento otimizado */}
      <Section className="pt-8 pb-4 flex-shrink-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]">Bom dia, Lucas.</h1>
          <span className="text-sm text-neutral-300">{today}</span>
        </div>
      </Section>

      {/* Inspiração do dia - design clean e neutro */}
      <Section className="pb-6 flex-shrink-0">
        <div className="flex flex-col items-center text-center py-2.5">
          <p className="text-sm text-neutral-400 mb-2">Inspiração do dia</p>
          <p className="text-base text-white/90 leading-relaxed max-w-[280px] mb-4 italic">
            "Disciplina é liberdade. Foque no processo, não no resultado."
          </p>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Compartilhar inspiração"
            >
              <Share2 className="size-4 text-neutral-400" />
              <span className="text-sm text-neutral-400">Compartilhar</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Salvar inspiração"
            >
              <Bookmark className="size-4 text-neutral-400" />
              <span className="text-sm text-neutral-400">Salvar</span>
            </button>
          </div>
        </div>
      </Section>

      {/* Stories com espaçamento ajustado */}
      <Section className="pb-6 flex-shrink-0">
        <StoryPills
          stories={stories}
          selectedId={selectedStory}
          onSelect={setSelectedStory}
        />
      </Section>

      {/* Chat frame menor com espaçamento adequado */}
      <Section className="flex-shrink-0 pb-8">
        <GlassCard glass="dark" className="pt-2.5 px-3 pb-3 flex flex-col h-[35vh]">
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto pr-1 min-h-0 px-1"
          >
            <div className="flex flex-col gap-3">
              {messages.map((m) => {
                const isUser = m.role === "user"
                return (
                  <div key={m.id} className={isUser ? "self-end" : "self-start"}>
                    <div className="flex items-start gap-2 max-w-[85vw]">
                      {!isUser && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mt-1">
                          <Bot className="size-4 text-white" />
                        </div>
                      )}
                      <div
                        className={"rounded-3xl px-4 py-2.5 text-sm text-white break-words flex-1"}
                        style={
                          isUser
                            ? {
                                backgroundColor: RED,
                                boxShadow:
                                  "inset 3px 3px 8px rgba(0,0,0,0.35), inset -3px -3px 8px rgba(255,255,255,0.08)",
                              }
                            : {
                                background: "rgba(15,15,15,0.9)",
                                boxShadow:
                                  "inset 6px 6px 12px rgba(0,0,0,0.6), inset -6px -6px 12px rgba(255,255,255,0.03)",
                              }
                        }
                      >
                        {m.isTyping && !isUser ? (
                          <TypingAnimation 
                            text={m.text} 
                            speed={30}
                            onComplete={() => {
                              // Marcar como não digitando quando completar
                              setMessages(prev => prev.map(msg => 
                                msg.id === m.id ? { ...msg, isTyping: false } : msg
                              ))
                            }}
                          />
                        ) : (
                          m.text
                        )}
                      </div>
                      {isUser && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-1">
                          <User className="size-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="self-start">
                  <div className="flex items-start gap-2 max-w-[85vw]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mt-1">
                      <Bot className="size-4 text-white" />
                    </div>
                    <div
                      className="rounded-3xl px-4 py-2.5 text-sm text-white break-words flex-1"
                      style={{
                        background: "rgba(15,15,15,0.9)",
                        boxShadow: "inset 6px 6px 12px rgba(0,0,0,0.6), inset -6px -6px 12px rgba(255,255,255,0.03)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-neutral-400">SMV está pensando...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Composer inside the card */}
          <div className="mt-3 pb-2 px-1 flex-shrink-0">
            <ChatComposer onSend={handleSend} />
          </div>
        </GlassCard>
      </Section>
    </div>
  )
}
