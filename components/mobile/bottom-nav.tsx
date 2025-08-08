"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CalendarDays, CheckSquare, MessageCircle, BarChart3, Settings } from 'lucide-react'
import { GlassCard } from "./containers"
import { cn } from "@/lib/utils"
import { RED } from "@/lib/constants"
import { useCallback } from "react"

export function BottomNav() {
  const path = usePathname()
  const router = useRouter()
  const isActive = (href: string) => path?.startsWith(href)

  const handleNavigation = useCallback((href: string) => {
    try {
      if (path !== href) {
        router.push(href)
      }
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }, [path, router])

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-md px-4 pb-5">
        <GlassCard glass="dark" className="h-20 w-full flex items-center justify-between px-5 relative">
          {/* Calendar */}
          <NavItem href="/calendario" active={isActive("/calendario")} icon={<CalendarDays />} onClick={handleNavigation} />
          {/* Tasks */}
          <NavItem href="/tarefas" active={isActive("/tarefas")} icon={<CheckSquare />} onClick={handleNavigation} />
          {/* Center chat */}
          <div className="relative -mt-10">
            <div
              className={cn(
                "absolute -inset-2 rounded-full blur-md transition-opacity",
                isActive("/chat") ? "opacity-45" : "opacity-15"
              )}
              style={{ background: RED }}
            />
            <button
              onClick={() => handleNavigation("/chat")}
              aria-label="Chat IA"
              className={cn(
                "relative z-10 size-16 rounded-full flex items-center justify-center",
                "shadow-[0_8px_18px_rgba(255,25,41,0.28)]",
                "border border-white/20 transition-transform active:scale-95"
              )}
              style={{ backgroundColor: RED }}
            >
              <MessageCircle className="text-white" />
            </button>
          </div>
          {/* Dashboard */}
          <NavItem href="/dashboard" active={isActive("/dashboard")} icon={<BarChart3 />} onClick={handleNavigation} />
          {/* Settings */}
          <NavItem href="/config" active={isActive("/config")} icon={<Settings />} onClick={handleNavigation} />
        </GlassCard>
      </div>
    </nav>
  )
}

function NavItem({
  href,
  active,
  icon,
  onClick
}: {
  href: string;
  active?: boolean;
  icon: React.ReactNode;
  onClick: (href: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(href)}
      className={cn(
        "size-12 rounded-2xl flex items-center justify-center transition-all active:scale-95",
        active ? "text-[#FF1929]" : "text-white"
      )}
    >
      {icon}
      <span className="sr-only">{href.replace("/", "")}</span>
    </button>
  )
}
