# Storyboard Builder

질문으로 생각을 정리하고, 이야기로 완성하는 학생용 스토리보드 빌더.

이 앱은 AI 생성기가 아닙니다. 학생이 질문에 답하면, 앱은 그 답변을 스토리보드 형태로
**정리**해줄 뿐 이야기를 대신 만들어주지 않습니다. (AI API를 전혀 호출하지 않습니다.)

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 로 접속하면 됩니다.

배포용 빌드:

```bash
npm run build
npm run preview
```

> 이 프로젝트는 네트워크가 차단된 샌드박스 환경에서 소스 코드만으로 작성되었습니다.
> `npm install` / 실제 빌드 실행은 로컬 환경에서 진행해주세요. 문법과 타입은 꼼꼼히
> 검토했지만, 실제 빌드 로그를 직접 확인하지는 못했으니 처음 실행 시 에러가 나오면
> 알려주세요 — 바로 고쳐드릴게요.

## 사용자 흐름

```
Welcome
 → 콘텐츠 유형 선택 (영상/포스터/이야기/발표)
 → 템플릿 선택 (미래의 나 / 영화 / 광고 / 뉴스 / 여행 / 동화 / 웹툰)
 → 프로젝트 정보 입력
 → 질문 위저드 (한 번에 하나씩, 이전/다음, 진행률 표시)
 → 스토리보드 에디터 (제목/내용/순서 수정, 장면별 스케치)
 → 완성 화면 (PDF 다운로드 / 작품 소개 작성)
 → 작품 소개 작성
```

## 기술 스택

- React 18 + TypeScript + Vite
- TailwindCSS (+ 커스텀 디자인 토큰: `tailwind.config.js`)
- shadcn/ui 스타일의 자체 제작 컴포넌트 (`src/components/ui`)
- 상태 관리: Zustand (`src/store/useProjectStore.ts`), `persist` 미들웨어로
  새로고침 후에도 진행 상황이 `localStorage`에 남습니다.
- PDF: `jsPDF` + `html2canvas`. 한글 폰트를 jsPDF에 직접 임베드하는 대신,
  화면에 렌더링된 결과물을 이미지로 캡처해 PDF 페이지로 나눠 넣는 방식이라
  한글이 깨지지 않습니다. (`src/utils/pdfExport.ts`)

## 새 템플릿 추가하기

`src/templates/`에 새 JSON 파일을 추가하고, `src/templates/index.ts`의 배열에
등록만 하면 됩니다. 다른 코드는 전혀 수정할 필요가 없습니다.

```json
{
  "id": "my-template",
  "title": "템플릿 이름",
  "emoji": "✨",
  "description": "한 줄 설명",
  "questions": [{ "id": 1, "question": "질문 내용" }],
  "sceneMapping": [{ "scene": "장면 이름", "questionId": 1 }]
}
```

## 폴더 구조

```
src/
 ├ components/     공용 UI 컴포넌트 (Layout, SketchPad, StoryboardDocument, ui/*)
 ├ pages/           7개 화면 (Welcome ~ IntroWriting)
 ├ templates/       템플릿 JSON + 레지스트리
 ├ store/           Zustand 전역 상태
 ├ config/          콘텐츠 유형 등 정적 설정
 ├ utils/           PDF 내보내기 로직
 ├ lib/             공용 헬퍼 (cn 등)
 └ types/           공용 타입 정의
```

## 개발 원칙 (지킨 것)

1. 학생의 생각을 대신 생성하지 않음 — AI API 미사용
2. 질문 → 답변 → 구조화 → 스토리보드로 이어지는 흐름만 제공
3. 템플릿 추가가 쉬운 구조 (JSON 한 개 + 레지스트리 등록)
4. 새로고침해도 진행 상황 유지 (localStorage)
5. 반응형 레이아웃 (모바일부터 데스크톱까지)
