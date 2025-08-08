import { BottomNav } from "@/components/mobile/bottom-nav"
import { ErrorBoundary } from "@/components/error-boundary"
import { InstallPrompt } from "@/components/pwa/install-prompt"

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="relative mx-auto max-w-md min-h-svh overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,#1a1a1a_30%,#000000_70%)]"
        />
        <main className="relative z-10 pb-[96px] overflow-hidden">{children}</main>
        <BottomNav />
        <InstallPrompt />
      </div>
    </ErrorBoundary>
  )
}
