"use client"

import { GlassCard, Section, PriorityTag, NeoSurface } from "@/components/mobile/containers"
import { StoryPills } from "@/components/mobile/story-pills"
import { ChatComposer } from "@/components/mobile/chat-composer"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RED } from "@/lib/constants"
import { 
  Activity, 
  Zap, 
  BookOpen, 
  Moon, 
  Brain, 
  Share2, 
  Bookmark,
  Sparkles,
  Check,
  Mic,
  SendHorizontal
} from 'lucide-react'

export default function DesignPage() {
  const stories = [
    { id: "academia", label: "Academia", icon: <Activity /> },
    { id: "foco", label: "Foco", icon: <Zap /> },
    { id: "leitura", label: "Leitura", icon: <BookOpen /> },
    { id: "sono", label: "Sono", icon: <Moon /> },
    { id: "mindset", label: "Mindset", icon: <Brain /> },
  ]

  return (
    <div className="flex flex-col space-y-8 pt-6 pb-6">
      {/* Header */}
      <Section>
        <div className="flex items-center gap-3 mb-6">
          <img src="/logoheader.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-semibold">Design System</h1>
        </div>
      </Section>

      {/* Cores */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Cores</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: RED }} />
            <div>
              <p className="text-sm font-medium">Primary Red</p>
              <p className="text-xs text-neutral-400">#FF1929</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-black border border-white/10" />
            <div>
              <p className="text-sm font-medium">Background</p>
              <p className="text-xs text-neutral-400">#000000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white" />
            <div>
              <p className="text-sm font-medium">Text Primary</p>
              <p className="text-xs text-neutral-400">#FFFFFF</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neutral-400" />
            <div>
              <p className="text-sm font-medium">Text Secondary</p>
              <p className="text-xs text-neutral-400">#A3A3A3</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Tipografia */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Tipografia</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Heading 1 - 24px Semibold</h1>
            <p className="text-xs text-neutral-400 mt-1">text-2xl font-semibold</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Heading 2 - 18px Semibold</h2>
            <p className="text-xs text-neutral-400 mt-1">text-lg font-semibold</p>
          </div>
          <div>
            <p className="text-base">Body Text - 16px Regular</p>
            <p className="text-xs text-neutral-400 mt-1">text-base</p>
          </div>
          <div>
            <p className="text-sm">Small Text - 14px Regular</p>
            <p className="text-xs text-neutral-400 mt-1">text-sm</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Caption - 12px Regular</p>
            <p className="text-xs text-neutral-400 mt-1">text-xs text-neutral-400</p>
          </div>
        </div>
      </Section>

      {/* Glass Cards */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Glass Cards</h2>
        <div className="space-y-4">
          <GlassCard className="p-4">
            <p className="text-sm font-medium mb-2">Default Glass Card</p>
            <p className="text-xs text-neutral-400">bg-white/5 border border-white/10 backdrop-blur-md</p>
          </GlassCard>
          
          <GlassCard glass="red" className="p-4">
            <p className="text-sm font-medium mb-2">Red Glass Card</p>
            <p className="text-xs text-neutral-400">bg-[#FF1929]/80 border border-white/20</p>
          </GlassCard>
          
          <GlassCard glass="dark" className="p-4">
            <p className="text-sm font-medium mb-2">Dark Glass Card</p>
            <p className="text-xs text-neutral-400">bg-neutral-900/70 border border-white/10</p>
          </GlassCard>
        </div>
      </Section>

      {/* Neo Surface */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Neo Surface</h2>
        <NeoSurface className="p-4">
          <p className="text-sm font-medium mb-2">Neumorphism Surface</p>
          <p className="text-xs text-neutral-400">Inset shadows para efeito pressionado</p>
        </NeoSurface>
      </Section>

      {/* Story Pills */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Story Pills</h2>
        <StoryPills
          stories={stories}
          selectedId="foco"
          onSelect={() => {}}
        />
      </Section>

      {/* Botões */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Botões</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Share2 className="size-4 text-neutral-400" />
              <span className="text-sm text-neutral-400">Secondary Button</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 shadow-[0_10px_30px_rgba(255,25,41,0.35)]"
              style={{ backgroundColor: RED }}
            >
              <Mic className="text-white size-4" />
              <span className="text-sm text-white">Primary Button</span>
            </button>
          </div>

          <Button className="w-full h-12 text-white font-semibold rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10">
            Neutral Button
          </Button>
        </div>
      </Section>

      {/* Priority Tags */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Priority Tags</h2>
        <div className="flex gap-3">
          <PriorityTag level="alta" />
          <PriorityTag level="média" />
          <PriorityTag level="baixa" />
        </div>
      </Section>

      {/* Badges */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Badges</h2>
        <div className="flex gap-2 flex-wrap">
          <Badge className="rounded-full bg-white/10 text-white border border-white/10">7 dias sem falhar</Badge>
          <Badge className="rounded-full bg-white/10 text-white border border-white/10">3h Deep Work</Badge>
          <Badge className="rounded-full bg-white/10 text-white border border-white/10">2 treinos</Badge>
        </div>
      </Section>

      {/* Switch */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Switch</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm">Toggle Switch</span>
          <Switch className="data-[state=checked]:bg-[#FF1929]" />
        </div>
      </Section>

      {/* Chat Composer */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Chat Composer</h2>
        <ChatComposer onSend={() => {}} placeholder="Digite sua mensagem..." />
      </Section>

      {/* Mensagens de Chat */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Chat Messages</h2>
        <div className="space-y-3">
          <div className="self-start">
            <div
              className="rounded-3xl px-4 py-2.5 max-w-[75vw] text-sm text-white break-words"
              style={{
                background: "rgba(15,15,15,0.9)",
                boxShadow: "inset 6px 6px 12px rgba(0,0,0,0.6), inset -6px -6px 12px rgba(255,255,255,0.03)",
              }}
            >
              Mensagem da IA
            </div>
          </div>
          <div className="self-end flex justify-end">
            <div
              className="rounded-3xl px-4 py-2.5 max-w-[75vw] text-sm text-white break-words"
              style={{
                backgroundColor: RED,
                boxShadow: "inset 3px 3px 8px rgba(0,0,0,0.35), inset -3px -3px 8px rgba(255,255,255,0.08)",
              }}
            >
              Mensagem do usuário
            </div>
          </div>
        </div>
      </Section>

      {/* Ícones */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Ícones</h2>
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col items-center gap-2">
            <Activity className="size-6" />
            <span className="text-xs">Activity</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="size-6" />
            <span className="text-xs">Zap</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="size-6" />
            <span className="text-xs">BookOpen</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Moon className="size-6" />
            <span className="text-xs">Moon</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Brain className="size-6" />
            <span className="text-xs">Brain</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="size-6" />
            <span className="text-xs">Sparkles</span>
          </div>
        </div>
      </Section>

      {/* Espaçamentos */}
      <Section>
        <h2 className="text-lg font-semibold mb-4">Espaçamentos</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Section Padding</p>
            <p className="text-xs text-neutral-400">px-4 (16px lateral)</p>
          </div>
          <div>
            <p className="text-sm font-medium">Vertical Gap</p>
            <p className="text-xs text-neutral-400">space-y-6 (24px entre seções)</p>
          </div>
          <div>
            <p className="text-sm font-medium">Card Padding</p>
            <p className="text-xs text-neutral-400">p-4 (16px interno)</p>
          </div>
        </div>
      </Section>
    </div>
  )
}