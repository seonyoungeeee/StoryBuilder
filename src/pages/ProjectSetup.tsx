import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectStore } from '@/store/useProjectStore'

export function ProjectSetup() {
  const goTo = useProjectStore((s) => s.goTo)
  const projectInfo = useProjectStore((s) => s.projectInfo)
  const setProjectInfo = useProjectStore((s) => s.setProjectInfo)

  const [title, setTitle] = useState(projectInfo.title)
  const [author, setAuthor] = useState(projectInfo.author)
  const [team, setTeam] = useState(projectInfo.team ?? '')

  const canProceed = title.trim().length > 0 && author.trim().length > 0

  function handleNext() {
    if (!canProceed) return
    setProjectInfo({ title: title.trim(), author: author.trim(), team: team.trim() })
    goTo('question-wizard')
  }

  return (
    <Layout step={3} onBack={() => goTo('template-selection')}>
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
        작품 정보를 알려주세요
      </h2>
      <p className="mt-2 text-sm text-ink-faint">
        스토리보드와 완성될 PDF에 표시될 정보예요.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">작품 제목 *</span>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 10년 후, 나의 하루"
            maxLength={60}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">이름 *</span>
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="예: 김민준"
            maxLength={30}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">팀명 (선택)</span>
          <Input
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            placeholder="예: 3모둠"
            maxLength={30}
          />
        </label>
      </div>

      <div className="mt-10 flex justify-end">
        <Button size="lg" disabled={!canProceed} onClick={handleNext}>
          질문 시작하기
        </Button>
      </div>
    </Layout>
  )
}
