import React, { useEffect, useRef, useState } from 'react'
import { Eraser } from 'lucide-react'

interface SketchPadProps {
  value?: string | null
  onChange: (dataUrl: string | null) => void
}

// A small, dependency-free drawing surface. Students sketch a rough visual
// for the scene; the result is stored as a PNG data URL alongside the scene
// text so it can be dropped straight into the exported PDF.
export function SketchPad({ value, onChange }: SketchPadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [isEmpty, setIsEmpty] = useState(!value)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (value) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      img.src = value
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true
    setIsEmpty(false)
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = '#20242B'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function handlePointerUp() {
    if (!drawing.current) return
    drawing.current = false
    const canvas = canvasRef.current
    if (canvas) onChange(canvas.toDataURL('image/png'))
  }

  function handleClear() {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    onChange(null)
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={320}
        height={200}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full touch-none rounded-md border border-dashed border-ink/30 bg-white"
        style={{ aspectRatio: '16 / 10' }}
      />
      {isEmpty && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-ink-faint">
          장면을 간단히 스케치해보세요
        </span>
      )}
      {!isEmpty && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
          aria-label="스케치 지우기"
          type="button"
        >
          <Eraser className="h-3.5 w-3.5 text-ink-faint" />
        </button>
      )}
    </div>
  )
}
