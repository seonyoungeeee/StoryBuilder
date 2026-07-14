import { forwardRef } from 'react'
import { Clapperboard } from 'lucide-react'
import { useProjectStore } from '@/store/useProjectStore'
import { contentTypes } from '@/config/contentTypes'
import { getTemplateById } from '@/templates'

export const StoryboardDocument = forwardRef<HTMLDivElement>((_props, ref) => {
  const projectInfo = useProjectStore((s) => s.projectInfo)
  const scenes = useProjectStore((s) => s.scenes)
  const contentType = useProjectStore((s) => s.contentType)
  const templateId = useProjectStore((s) => s.templateId)
  const introduction = useProjectStore((s) => s.introduction)

  const contentTypeLabel = contentTypes.find((c) => c.id === contentType)?.label ?? ''
  const template = getTemplateById(templateId)

  return (
    <div ref={ref} className="mx-auto w-full max-w-[794px] bg-paper p-8 md:p-12">
      <div className="sprocket-strip mb-6" />

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-widest text-slate">STORYBOARD</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink">
            {projectInfo.title || '제목 없음'}
          </h1>
        </div>
        <div className="text-right text-sm text-ink-faint">
          <p>{projectInfo.author}</p>
          {projectInfo.team && <p>{projectInfo.team}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {contentTypeLabel && (
          <span className="rounded-full bg-slate/10 px-3 py-1 text-xs font-semibold text-slate">
            {contentTypeLabel}
          </span>
        )}
        {template && (
          <span className="rounded-full bg-amber/20 px-3 py-1 text-xs font-semibold text-amber-dark">
            {template.emoji} {template.title}
          </span>
        )}
      </div>

      {introduction && (
        <div className="mt-6 rounded-card border border-border bg-white/60 p-4">
          <p className="mb-1 font-mono text-[10px] tracking-widest text-ink-faint">
            작품 소개
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{introduction}</p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            className="break-inside-avoid overflow-hidden rounded-card border border-border bg-white/70"
          >
            <div className="sprocket-strip mx-4 mt-3" />

            <div className="flex items-center justify-between px-4 pt-2">
              <p className="font-mono text-xs font-semibold tracking-widest text-slate">
                SCENE {String(index + 1).padStart(2, '0')}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate/10 px-2 py-0.5 text-[10px] font-semibold text-slate">
                <Clapperboard className="h-3 w-3" />
                {scene.shotType}
              </span>
            </div>

            <div className="flex items-center justify-center border-y border-dashed border-ink/20 bg-white p-2">
              {scene.sketchDataUrl ? (
                <img
                  src={scene.sketchDataUrl}
                  alt={`${scene.title} 스케치`}
                  className="max-h-[150px] w-full object-contain"
                />
              ) : (
                <span className="p-8 text-center text-xs text-ink-faint">스케치 없음</span>
              )}
            </div>

            <div className="p-4">
              <h2 className="font-display text-base font-bold text-ink">{scene.title}</h2>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-light">
                {scene.content || '(화면 설명 없음)'}
              </p>

              {scene.dialogue && (
                <p className="mt-3 whitespace-pre-wrap border-l-2 border-amber pl-2 text-sm italic leading-relaxed text-ink">
                  “{scene.dialogue}”
                </p>
              )}

              {scene.direction && (
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-slate">
                  🎥 {scene.direction}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="sprocket-strip mt-8" />
    </div>
  )
})

StoryboardDocument.displayName = 'StoryboardDocument'
