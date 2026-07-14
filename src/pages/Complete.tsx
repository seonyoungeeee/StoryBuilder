import { useRef, useState } from 'react'
import { Download, PenLine } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { StoryboardDocument } from '@/components/StoryboardDocument'
import { useProjectStore } from '@/store/useProjectStore'
import { exportNodeToPdf } from '@/utils/pdfExport'

export function Complete() {
  const goTo = useProjectStore((s) => s.goTo)
  const projectInfo = useProjectStore((s) => s.projectInfo)
  const docRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  async function handleDownload() {
    if (!docRef.current) return
    setIsExporting(true)
    try {
      const filename = `${projectInfo.title || 'storyboard'}.pdf`
      await exportNodeToPdf(docRef.current, filename)
    } catch (err) {
      console.error(err)
      alert('PDF를 만드는 중 문제가 생겼어요. 다시 시도해주세요.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Layout step={6} onBack={() => goTo('storyboard-editor')} wide>
      <div className="container max-w-3xl text-center">
        <div className="text-5xl" aria-hidden>
          🎉
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
          스토리보드가 완성됐어요!
        </h2>
        <p className="mt-2 text-sm text-ink-faint">
          아래에서 결과물을 확인하고, PDF로 저장하거나 작품 소개를 이어서 작성해보세요.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 no-print">
          <Button size="lg" variant="accent" onClick={handleDownload} disabled={isExporting}>
            <Download className="h-4 w-4" />
            {isExporting ? 'PDF 만드는 중...' : '스토리보드 다운로드 (PDF)'}
          </Button>
          <Button size="lg" variant="outline" onClick={() => goTo('intro-writing')}>
            <PenLine className="h-4 w-4" />
            내 작품 소개하기
          </Button>
        </div>
      </div>

      <div className="mt-10 rounded-card border border-border bg-white/40 p-2 shadow-frame md:p-4">
        <StoryboardDocument ref={docRef} />
      </div>
    </Layout>
  )
}
