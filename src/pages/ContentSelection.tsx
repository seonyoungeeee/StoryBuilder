import { Layout } from '@/components/Layout'
import { Card } from '@/components/ui/card'
import { contentTypes } from '@/config/contentTypes'
import { useProjectStore } from '@/store/useProjectStore'
import type { ContentTypeId } from '@/types'

export function ContentSelection() {
  const goTo = useProjectStore((s) => s.goTo)
  const setContentType = useProjectStore((s) => s.setContentType)
  const contentType = useProjectStore((s) => s.contentType)

  function handleSelect(id: ContentTypeId) {
    setContentType(id)
    goTo('template-selection')
  }

  return (
    <Layout step={1} onBack={() => goTo('welcome')}>
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
        무엇을 만들고 싶나요?
      </h2>
      <p className="mt-2 text-sm text-ink-faint">
        만들고 싶은 콘텐츠의 형태를 골라주세요. 이 선택에 따라 스토리보드가 쓰일 방식이
        달라져요.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contentTypes.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className="text-left"
          >
            <Card
              className={`h-full cursor-pointer p-1 transition-transform hover:-translate-y-0.5 hover:shadow-lg ${
                contentType === option.id ? 'ring-2 ring-slate' : ''
              }`}
            >
              <div className="p-5">
                <div className="text-3xl" aria-hidden>
                  {option.emoji}
                </div>
                <div className="mt-3 font-display text-lg font-bold text-ink">
                  {option.label}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-faint">
                  {option.description}
                </p>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </Layout>
  )
}
