import { useEffect } from 'react'
import { ChevronDown, ChevronUp, Clapperboard } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SketchPad } from '@/components/SketchPad'
import { useProjectStore } from '@/store/useProjectStore'

export function StoryboardEditor() {
  const goTo = useProjectStore((s) => s.goTo)
  const scenes = useProjectStore((s) => s.scenes)
  const updateScene = useProjectStore((s) => s.updateScene)
  const reorderScenes = useProjectStore((s) => s.reorderScenes)
  const buildScenesFromAnswers = useProjectStore((s) => s.buildScenesFromAnswers)

  // If someone arrives here directly (e.g. via "이어서 만들기") without scenes
  // built yet, derive them from whatever answers already exist.
  useEffect(() => {
    if (scenes.length === 0) buildScenesFromAnswers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout step={5} onBack={() => goTo('question-wizard')} wide>
      <div className="container max-w-5xl">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
          스토리보드를 다듬어보세요
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-faint">
          답변을 바탕으로 장면이 자동으로 만들어졌어요. 각 장면을 <b>화면(그림) · 대사/내레이션 ·
          연출 메모</b> 세 부분으로 나눠 채우면 진짜 촬영 대본처럼 완성돼요.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {scenes.map((scene, index) => (
            <Card key={scene.id} className="flex flex-col p-1">
              <div className="sprocket-strip mx-5 mt-4" />

              <div className="flex flex-col gap-4 p-5">
                {/* Panel header: scene number, shot type, reorder */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold tracking-widest text-slate">
                      SCENE {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate/10 px-2.5 py-0.5 text-[11px] font-semibold text-slate">
                      <Clapperboard className="h-3 w-3" />
                      {scene.shotType}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      disabled={index === 0}
                      onClick={() => reorderScenes(index, index - 1)}
                      className="rounded p-1 text-ink-faint hover:bg-ink/5 disabled:opacity-30"
                      aria-label="위로 이동"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      disabled={index === scenes.length - 1}
                      onClick={() => reorderScenes(index, index + 1)}
                      className="rounded p-1 text-ink-faint hover:bg-ink/5 disabled:opacity-30"
                      aria-label="아래로 이동"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Frame: the big sketch sits on top, like an actual film frame */}
                <SketchPad
                  value={scene.sketchDataUrl}
                  onChange={(dataUrl) => updateScene(scene.id, { sketchDataUrl: dataUrl })}
                />

                <Input
                  value={scene.title}
                  onChange={(e) => updateScene(scene.id, { title: e.target.value })}
                  className="font-display text-base font-bold"
                  placeholder="장면 제목"
                />

                <div>
                  <label className="mb-1 block font-mono text-[10px] font-semibold tracking-widest text-ink-faint">
                    화면 설명
                  </label>
                  <Textarea
                    value={scene.content}
                    onChange={(e) => updateScene(scene.id, { content: e.target.value })}
                    className="min-h-[90px]"
                    placeholder="화면에 무엇이 보이나요? (인물, 배경, 동작 등)"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-mono text-[10px] font-semibold tracking-widest text-ink-faint">
                    대사 · 내레이션
                  </label>
                  <Textarea
                    value={scene.dialogue}
                    onChange={(e) => updateScene(scene.id, { dialogue: e.target.value })}
                    className="min-h-[70px]"
                    placeholder="이 장면에서 나오는 말이 있다면 적어보세요"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-mono text-[10px] font-semibold tracking-widest text-ink-faint">
                    연출 메모
                  </label>
                  <Textarea
                    value={scene.direction}
                    onChange={(e) => updateScene(scene.id, { direction: e.target.value })}
                    className="min-h-[60px]"
                    placeholder="카메라 움직임, 효과음, 장면 전환 방식 등"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Button size="lg" variant="accent" onClick={() => goTo('complete')}>
            스토리보드 완성하기
          </Button>
        </div>
      </div>
    </Layout>
  )
}
