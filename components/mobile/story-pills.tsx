"use client"

import { cn } from "@/lib/utils"

type Story = {
  id: string
  label: string
  icon: React.ReactNode
}

export function StoryPills({
  stories,
  selectedId,
  onSelect,
}: {
  stories: Story[]
  selectedId?: string
  onSelect?: (id: string) => void
}) {
  return (
    <div className="w-full flex items-center justify-center gap-3 overflow-x-auto no-scrollbar pt-1.5">
      {stories.map((s) => {
        const selected = s.id === selectedId
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect?.(s.id)}
            className="shrink-0 flex flex-col items-center gap-2"
          >
            <div
              className={cn(
                "size-14 rounded-full flex items-center justify-center relative",
                // base 3D look without background glow
                "bg-[linear-gradient(145deg,#1a1a1a,#0e0e0e)]",
                "shadow-[inset_6px_6px_12px_rgba(0,0,0,0.6),inset_-6px_-6px_12px_rgba(255,255,255,0.03),0_6px_12px_rgba(0,0,0,0.35)]",
                "backdrop-blur-md"
              )}
              // LED-like outline when selected: crisp ring + very small soft halo
              style={
                selected
                  ? { boxShadow: "0 0 0 2px #FF1929, 0 0 6px rgba(255,25,41,0.35), inset 6px 6px 12px rgba(0,0,0,0.6), inset -6px -6px 12px rgba(255,255,255,0.03)" }
                  : undefined
              }
              aria-pressed={selected}
            >
              {s.icon}
            </div>
            <span className="text-xs text-neutral-300">{s.label}</span>
          </button>
        )
      })}
    </div>
  )
}
