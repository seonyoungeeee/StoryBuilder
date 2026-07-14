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
  /** Optional cinematography hint (e.g. "와이드 샷"). If omitted, a sensible
   *  default is cycled in based on the scene's position. */
  shot?: string
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
  /** 화면 설명 — what's visible in the frame */
  content: string
  /** 대사·내레이션 */
  dialogue: string
  /** 연출 메모 — camera, transition, sound notes */
  direction: string
  /** 카메라/샷 종류, e.g. "클로즈업" */
  shotType: string
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
