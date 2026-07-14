import type { ContentTypeOption } from '@/types'

export const contentTypes: ContentTypeOption[] = [
  {
    id: 'video',
    label: '영상 만들기',
    emoji: '🎬',
    description: '장면을 이어 붙여 하나의 영상 스토리를 만들어요.',
  },
  {
    id: 'poster',
    label: '포스터 만들기',
    emoji: '🖼',
    description: '한 장의 그림에 담을 이야기의 흐름을 정리해요.',
  },
  {
    id: 'story',
    label: '이야기 만들기',
    emoji: '📖',
    description: '글로 풀어낼 이야기의 장면을 차례로 구성해요.',
  },
  {
    id: 'presentation',
    label: '발표 만들기',
    emoji: '🎤',
    description: '전달하고 싶은 내용을 발표 순서에 맞게 정리해요.',
  },
]
