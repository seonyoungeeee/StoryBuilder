import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/card'
import { templates } from '@/templates'
import { useProjectStore } from '@/store/useProjectStore'

export function TemplateSelection() {
  const goTo = useProjectStore((s) => s.goTo)
  const setTemplateId = useProjectStore((s) => s.setTemplateId)
  const templateId = useProjectStore((s) => s.templateId)

  function handleSelect(id: string) {
    setTemplateId(id)
    goTo('project-setup')
  }

  return (
    <Layout step={2} onBack={() => goTo('content-selection')}>
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
        어떤 이야기 틀로 시작할까요?
      </h2>
      <p className="mt-2 text-sm text-ink-faint">
        템플릿마다 질문의 순서와 장면 구성이 달라요. 이야기의 성격에 맞는 것을 골라보세요.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {templates.map((template) => (
          <button key={template.id} onClick={() => handleSelect(template.id)} className="text-left">
            <Card
              className={`h-full cursor-pointer p-1 transition-transform hover:-translate-y-0.5 hover:shadow-lg ${
                templateId === template.id ? 'ring-2 ring-slate' : ''
              }`}
            >
              <div className="p-5">
                <div className="text-3xl" aria-hidden>
                  {template.emoji}
                </div>
                <div className="mt-3 font-display text-lg font-bold text-ink">
                  {template.title}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-faint">
                  {template.description}
                </p>
                <p className="mt-3 font-mono text-xs tracking-wide text-ink-faint">
                  질문 {template.questions.length}개 · 장면 {template.sceneMapping.length}개
                </p>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </Layout>
  )
}
