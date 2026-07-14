import { useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
      <div className="container max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
          스토리보드를 다듬어보세요
        </h2>
        <p className="mt-2 text-sm text-ink-faint">
          답변을 바탕으로 장면이 자동으로 만들어졌어요. 제목, 내용, 순서를 자유롭게 고쳐보세요.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {scenes.map((scene, index) => (
            <Card key={scene.id} className="p-1">
              <div className="sprocket-strip mx-5 mt-4" />
              <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-[1fr_200px]">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-widest text-slate">
                      SCENE {String(index + 1).padStart(2, '0')}
                    </span>
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

                  <Input
                    value={scene.title}
                    onChange={(e) => updateScene(scene.id, { title: e.target.value })}
                    className="mb-3 font-display text-base font-bold"
                    placeholder="장면 제목"
                  />
                  <Textarea
                    value={scene.content}
                    onChange={(e) => updateScene(scene.id, { content: e.target.value })}
                    className="min-h-[110px]"
                    placeholder="장면 내용을 적어보세요"
                  />
                </div>

                <SketchPad
                  value={scene.sketchDataUrl}
                  onChange={(dataUrl) => updateScene(scene.id, { sketchDataUrl: dataUrl })}
                />
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
