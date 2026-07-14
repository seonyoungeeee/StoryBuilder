import { useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { useProjectStore } from '@/store/useProjectStore'
import { getTemplateById } from '@/templates'

export function QuestionWizard() {
  const goTo = useProjectStore((s) => s.goTo)
  const templateId = useProjectStore((s) => s.templateId)
  const answers = useProjectStore((s) => s.answers)
  const currentQuestionIndex = useProjectStore((s) => s.currentQuestionIndex)
  const setAnswer = useProjectStore((s) => s.setAnswer)
  const nextQuestion = useProjectStore((s) => s.nextQuestion)
  const prevQuestion = useProjectStore((s) => s.prevQuestion)
  const buildScenesFromAnswers = useProjectStore((s) => s.buildScenesFromAnswers)

  const template = getTemplateById(templateId)

  // Guard: if someone lands here without a template selected, send them back.
  useEffect(() => {
    if (!template) goTo('template-selection')
  }, [template, goTo])

  if (!template) return null

  const total = template.questions.length
  const question = template.questions[currentQuestionIndex]
  const currentAnswer = answers.find((a) => a.questionId === question.id)?.value ?? ''
  const isLast = currentQuestionIndex === total - 1
  const isFirst = currentQuestionIndex === 0
  const canGoNext = currentAnswer.trim().length > 0

  function handleNext() {
    if (!canGoNext) return
    if (isLast) {
      buildScenesFromAnswers()
      goTo('storyboard-editor')
    } else {
      nextQuestion()
    }
  }

  function handlePrev() {
    if (isFirst) {
      goTo('project-setup')
    } else {
      prevQuestion()
    }
  }

  return (
    <Layout step={4} onBack={handlePrev}>
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs font-semibold tracking-widest text-slate">
          질문 {currentQuestionIndex + 1} / {total}
        </span>
        <span className="text-lg" aria-hidden>
          {template.emoji}
        </span>
      </div>

      <Progress value={((currentQuestionIndex + 1) / total) * 100} className="mb-8" />

      <h2 className="font-display text-2xl font-bold leading-snug text-ink md:text-3xl">
        {question.question}
      </h2>
      {question.helper && (
        <p className="mt-2 text-sm text-ink-faint">{question.helper}</p>
      )}

      <Textarea
        key={question.id}
        autoFocus
        value={currentAnswer}
        onChange={(e) => setAnswer(question.id, e.target.value)}
        placeholder="생각나는 대로 자유롭게 적어보세요."
        className="mt-6"
      />

      <div className="mt-8 flex items-center justify-between">
        <Button variant="outline" onClick={handlePrev}>
          &lt; 이전
        </Button>
        <Button variant={isLast ? 'accent' : 'primary'} disabled={!canGoNext} onClick={handleNext}>
          {isLast ? '스토리보드 만들기' : '다음 >'}
        </Button>
      </div>
    </Layout>
  )
}
