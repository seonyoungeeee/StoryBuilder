import { useProjectStore } from '@/store/useProjectStore'
import { Welcome } from '@/pages/Welcome'
import { ContentSelection } from '@/pages/ContentSelection'
import { TemplateSelection } from '@/pages/TemplateSelection'
import { ProjectSetup } from '@/pages/ProjectSetup'
import { QuestionWizard } from '@/pages/QuestionWizard'
import { StoryboardEditor } from '@/pages/StoryboardEditor'
import { Complete } from '@/pages/Complete'
import { IntroWriting } from '@/pages/IntroWriting'

function App() {
  const screen = useProjectStore((s) => s.screen)

  switch (screen) {
    case 'welcome':
      return <Welcome />
    case 'content-selection':
      return <ContentSelection />
    case 'template-selection':
      return <TemplateSelection />
    case 'project-setup':
      return <ProjectSetup />
    case 'question-wizard':
      return <QuestionWizard />
    case 'storyboard-editor':
      return <StoryboardEditor />
    case 'complete':
      return <Complete />
    case 'intro-writing':
      return <IntroWriting />
    default:
      return <Welcome />
  }
}

export default App
