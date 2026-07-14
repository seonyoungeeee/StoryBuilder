import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Answer,
  ContentTypeId,
  ProjectInfo,
  Scene,
  Screen,
} from '@/types'
import { getTemplateById } from '@/templates'

// Cycled in as a default when a template's sceneMapping doesn't specify its
// own `shot` hint — gives every scene a plausible camera framing suggestion
// instead of leaving the field blank.
const DEFAULT_SHOT_CYCLE = [
  '설정 샷 (와이드)',
  '미디엄 샷',
  '클로즈업',
  '투 샷',
  '오버 더 숄더',
  '디테일 샷',
  '풀 샷',
]

interface ProjectStore {
  screen: Screen
  contentType: ContentTypeId | null
  templateId: string | null
  projectInfo: ProjectInfo
  answers: Answer[]
  scenes: Scene[]
  currentQuestionIndex: number
  introduction: string

  // navigation
  goTo: (screen: Screen) => void

  // step 2
  setContentType: (id: ContentTypeId) => void

  // step 3
  setTemplateId: (id: string) => void

  // step 4
  setProjectInfo: (info: ProjectInfo) => void

  // step 5 - question wizard
  setAnswer: (questionId: number, value: string) => void
  goToQuestion: (index: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  buildScenesFromAnswers: () => void

  // step 6 - storyboard editor
  updateScene: (
    id: string,
    patch: Partial<Pick<Scene, 'title' | 'content' | 'dialogue' | 'direction' | 'sketchDataUrl'>>,
  ) => void
  reorderScenes: (fromIndex: number, toIndex: number) => void

  // step 7
  setIntroduction: (text: string) => void

  // utility
  resetProject: () => void
}

const initialState = {
  screen: 'welcome' as Screen,
  contentType: null as ContentTypeId | null,
  templateId: null as string | null,
  projectInfo: { title: '', author: '', team: '' } as ProjectInfo,
  answers: [] as Answer[],
  scenes: [] as Scene[],
  currentQuestionIndex: 0,
  introduction: '',
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      goTo: (screen) => set({ screen }),

      setContentType: (id) => set({ contentType: id }),

      setTemplateId: (id) => set({ templateId: id }),

      setProjectInfo: (info) => set({ projectInfo: info }),

      setAnswer: (questionId, value) =>
        set((state) => {
          const existing = state.answers.find((a) => a.questionId === questionId)
          if (existing) {
            return {
              answers: state.answers.map((a) =>
                a.questionId === questionId ? { ...a, value } : a,
              ),
            }
          }
          return { answers: [...state.answers, { questionId, value }] }
        }),

      goToQuestion: (index) => set({ currentQuestionIndex: index }),

      nextQuestion: () => {
        const template = getTemplateById(get().templateId)
        if (!template) return
        const next = get().currentQuestionIndex + 1
        if (next < template.questions.length) {
          set({ currentQuestionIndex: next })
        }
      },

      prevQuestion: () => {
        const prev = get().currentQuestionIndex - 1
        if (prev >= 0) {
          set({ currentQuestionIndex: prev })
        }
      },

      buildScenesFromAnswers: () => {
        const template = getTemplateById(get().templateId)
        if (!template) return
        const { answers, scenes: existingScenes } = get()

        const scenes: Scene[] = template.sceneMapping.map((mapping, index) => {
          const previous = existingScenes.find((s) => s.questionId === mapping.questionId)
          const answer = answers.find((a) => a.questionId === mapping.questionId)
          return {
            id: previous?.id ?? `scene-${mapping.questionId}`,
            order: previous?.order ?? index,
            title: previous?.title ?? mapping.scene,
            content: answer?.value ?? previous?.content ?? '',
            dialogue: previous?.dialogue ?? '',
            direction: previous?.direction ?? '',
            shotType: previous?.shotType ?? mapping.shot ?? DEFAULT_SHOT_CYCLE[index % DEFAULT_SHOT_CYCLE.length],
            questionId: mapping.questionId,
            sketchDataUrl: previous?.sketchDataUrl ?? null,
          }
        })

        scenes.sort((a, b) => a.order - b.order)
        set({ scenes })
      },

      updateScene: (id, patch) =>
        set((state) => ({
          scenes: state.scenes.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        })),

      reorderScenes: (fromIndex, toIndex) =>
        set((state) => {
          const next = [...state.scenes]
          const [moved] = next.splice(fromIndex, 1)
          next.splice(toIndex, 0, moved)
          return { scenes: next.map((s, i) => ({ ...s, order: i })) }
        }),

      setIntroduction: (text) => set({ introduction: text }),

      resetProject: () => set({ ...initialState, screen: 'welcome' }),
    }),
    {
      name: 'storyboard-builder-project', // localStorage key
      version: 2,
      migrate: (persisted: any, version) => {
        if (version < 2 && persisted?.scenes) {
          persisted.scenes = persisted.scenes.map((s: any, i: number) => ({
            dialogue: '',
            direction: '',
            shotType: DEFAULT_SHOT_CYCLE[i % DEFAULT_SHOT_CYCLE.length],
            ...s,
          }))
        }
        return persisted
      },
    },
  ),
)
