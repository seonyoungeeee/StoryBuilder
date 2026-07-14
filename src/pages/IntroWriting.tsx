import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useProjectStore } from '@/store/useProjectStore'

export function IntroWriting() {
  const goTo = useProjectStore((s) => s.goTo)
  const introduction = useProjectStore((s) => s.introduction)
  const setIntroduction = useProjectStore((s) => s.setIntroduction)
  const [draft, setDraft] = useState(introduction)

  function handleSave() {
    setIntroduction(draft)
    goTo('complete')
  }

  return (
    <Layout step={7} onBack={() => goTo('complete')}>
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
        내 작품을 소개해보세요
      </h2>
      <p className="mt-2 text-sm text-ink-faint">
        이 작품을 왜 만들었는지, 무엇을 전하고 싶은지 짧게 적어보세요. PDF 첫 페이지에
        함께 담겨요.
      </p>

      <Textarea
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="예: 이 이야기는 미래의 나에게 지금의 내가 보내는 편지예요..."
        className="mt-6 min-h-[220px]"
        maxLength={600}
      />
      <p className="mt-1 text-right text-xs text-ink-faint">{draft.length} / 600</p>

      <div className="mt-6 flex justify-end">
        <Button size="lg" variant="accent" onClick={handleSave}>
          저장하고 돌아가기
        </Button>
      </div>
    </Layout>
  )
}
