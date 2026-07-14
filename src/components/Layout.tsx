import * as React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LayoutProps {
  step?: number // 1-7, omit to hide the scene counter
  totalSteps?: number
  onBack?: () => void
  children: React.ReactNode
  wide?: boolean
}

export function Layout({ step, totalSteps = 7, onBack, children, wide = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="no-print border-b border-border/70">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {onBack ? (
              <Button variant="ghost" size="icon" onClick={onBack} aria-label="이전 화면으로">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <span className="text-xl" aria-hidden>
                🎬
              </span>
            )}
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-ink-faint">
              STORYBOARD BUILDER
            </span>
          </div>
          {step ? (
            <span className="font-mono text-xs font-semibold tracking-widest text-slate">
              SCENE {String(step).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </span>
          ) : null}
        </div>
        {step ? (
          <div className="flex w-full">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 ${i < step ? 'bg-amber' : 'bg-ink/10'} ${
                  i > 0 ? 'border-l border-paper' : ''
                }`}
              />
            ))}
          </div>
        ) : null}
      </header>
      <main className={`flex-1 ${wide ? '' : 'container max-w-3xl'} py-10 md:py-14`}>
        {children}
      </main>
    </div>
  )
}
