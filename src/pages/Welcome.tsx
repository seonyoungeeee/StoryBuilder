import { Button } from '@/components/ui/button'
import { useProjectStore } from '@/store/useProjectStore'

export function Welcome() {
  const goTo = useProjectStore((s) => s.goTo)
  const resetProject = useProjectStore((s) => s.resetProject)
  const projectInfo = useProjectStore((s) => s.projectInfo)
  const scenesCount = useProjectStore((s) => s.scenes.length)
  const hasProgress = Boolean(projectInfo.title) || scenesCount > 0

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 flex items-center gap-3 rounded-full border border-border bg-white/70 px-4 py-1.5 shadow-frame">
        <span className="h-2 w-2 rounded-full bg-coral" />
        <span className="font-mono text-xs tracking-widest text-ink-faint">
          FOR STUDENT STORYTELLERS
        </span>
      </div>

      <div className="mb-4 text-6xl" aria-hidden>
        🎬
      </div>

      <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
        Storyboard Builder
      </h1>

      <p className="mt-5 max-w-md font-display text-xl text-ink-light md:text-2xl">
        질문으로 시작하고, 이야기로 완성하다.
      </p>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-faint">
        AI가 대신 써주지 않아요. 질문에 답하는 건 오직 나. 이 앱은 그 생각을 스토리보드로
        정리해줄 뿐이에요.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Button
          size="lg"
          variant="accent"
          onClick={() => {
            if (hasProgress) resetProject()
            goTo('content-selection')
          }}
          className="min-w-[220px]"
        >
          {hasProgress ? '새 프로젝트 시작하기' : '시작하기'}
        </Button>

        {hasProgress && (
          <Button
            variant="outline"
            onClick={() => goTo('storyboard-editor')}
            className="min-w-[220px]"
          >
            이어서 만들기 — {projectInfo.title || '제목 없음'}
          </Button>
        )}
      </div>

      {hasProgress && (
        <button
          onClick={() => {
            if (confirm('저장된 프로젝트를 지우고 새로 시작할까요?')) {
              resetProject()
            }
          }}
          className="mt-6 text-xs text-ink-faint underline underline-offset-2 hover:text-coral"
        >
          저장된 내용 지우기
        </button>
      )}
    </div>
  )
}
