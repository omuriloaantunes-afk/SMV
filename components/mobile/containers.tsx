"use client"

import { cn } from "@/lib/utils"
import { RED } from "@/lib/constants"

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  glass?: "default" | "red" | "dark"
}

export function GlassCard({ className, glass = "default", ...props }: CardProps) {
  const variants = {
    default:
      "bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
    red: `bg-[${RED}]/80 border border-white/20 backdrop-blur-md shadow-[0_8px_28px_rgba(255,25,41,0.35)]`,
    dark: "bg-neutral-900/70 border border-white/10 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
  } as const
  return (
    <div
      className={cn(
        "rounded-3xl",
        variants[glass],
        "text-white",
        className
      )}
      {...props}
    />
  )
}

type NeoProps = React.HTMLAttributes<HTMLDivElement>

export function NeoSurface({ className, ...props }: NeoProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-neutral-900 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.6),inset_-6px_-6px_12px_rgba(255,255,255,0.03)]",
        className
      )}
      {...props}
    />
  )
}

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <section className={cn("px-4", className)} {...props} />
}

export function PriorityTag({ level }: { level: "alta" | "média" | "baixa" }) {
  const color =
    level === "alta" ? "bg-red-600/30 text-red-300 border-red-500/30" :
    level === "média" ? "bg-yellow-600/20 text-yellow-200 border-yellow-400/30" :
    "bg-emerald-700/20 text-emerald-200 border-emerald-500/30"

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs border", color)}>
      {level.toUpperCase()}
    </span>
  )
}
