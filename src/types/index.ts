export type ContentTypeId = 'video' | 'poster' | 'story' | 'presentation'

export interface ContentTypeOption {
  id: ContentTypeId
  label: string
  emoji: string
  description: string
}

export interface TemplateQuestion {
  id: number
  question: string
  helper?: string
}

export interface SceneMapping {
  scene: string
  questionId: number
}

export interface Template {
  id: string
  title: string
  emoji: string
  description: string
  questions: TemplateQuestion[]
  sceneMapping: SceneMapping[]
}

export interface ProjectInfo {
  title: string
  author: string
  team?: string
}

export interface Answer {
  questionId: number
  value: string
}

export interface Scene {
  id: string
  order: number
  title: string
  content: string
  questionId: number
  sketchDataUrl?: string | null
}

export type Screen =
  | 'welcome'
  | 'content-selection'
  | 'template-selection'
  | 'project-setup'
  | 'question-wizard'
  | 'storyboard-editor'
  | 'complete'
  | 'intro-writing'

export interface ProjectState {
  screen: Screen
  contentType: ContentTypeId | null
  templateId: string | null
  projectInfo: ProjectInfo
  answers: Answer[]
  scenes: Scene[]
  currentQuestionIndex: number
  introduction: string
}
