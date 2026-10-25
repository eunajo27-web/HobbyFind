
#  HobbyFind 웹서비스 디자인 가이드 (Airbnb Style)

## 1. 디자인 시스템 개요 (Design System Overview)

* **브랜드 아이덴티티:** 사용자가 일상 속에서 자신에게 알맞은 취미를 부담 없이 탐색하고 발견하는 따뜻하고 친근한 플랫폼.
* **톤앤매너 (Tone & Manner):**
* **미니멀리즘과 여백:** 과도한 장식을 배제하고 콘텐츠(취미 카드)에 시선이 집중되도록 충분한 여백 확보.
* **직관성과 친근함:** 둥근 모서리(`rounded-2xl`)와 부드러운 그림자(`shadow-sm`, `shadow-md`)를 사용하여 물리적 터치감을 주는 UI.


* **UI 키 비주얼:**
* 에어비앤비 특유의 코랄 레드(Coral Red)를 포인트 컬러로 활용하여 주목도를 높이고, 핵심 액션(북마크, 주요 버튼)에 직관적인 피드백 제공.



---

## 2. TailwindCSS 색상 팔레트 (Color Palette for TailwindCSS)

Airbnb 디자인 시스템의 뉴트럴 톤과 강렬한 브랜드 포인트를 조합한 색상 변수 정의입니다.

| 역할 | 색상 이름 | Hex 코드 | Tailwind 클래스 예시 | 용도 |
| --- | --- | --- | --- | --- |
| **Brand (Primary)** | Airbnb Coral | `#FF385C` | `bg-rose-500` / `text-rose-500` | 로고, 북마크 활성화, 주요 CTA 버튼 |
| **Neutral Dark** | Charcoal Text | `#222222` | `text-neutral-900` | 메인 타이틀, 주요 본문 텍스트 |
| **Neutral Medium** | Gray Label | `#717171` | `text-neutral-500` | 서브 텍스트, 설명 문구, 비활성 아이콘 |
| **Neutral Light** | Off White | `#F7F7F7` | `bg-neutral-50` | 페이지 배경, 카드 내부 보조 배경 |
| **Border / Line** | Divider Gray | `#DDDDDD` | `border-neutral-200` | 카드 테두리, 구분선, 인풋 필드 테두리 |

---

## 3. 페이지 구현 가이드 (Page Implementations)

### ① 루트 페이지 (`/`)

* **Top Bar:** 상단 고정(`sticky top-0`), 좌측 로고, 중앙 카테고리 필터, 우측 인증 상태별 버튼(비회원: 로그인/회원가입, 회원: 마이페이지/로그아웃).
* **Hero 섹션:** 화면 중앙 정렬, 간결하고 매력적인 소개 문구(`"나만의 일상을 채워줄 새로운 취미를 발견하세요"`).
* **메인 콘텐츠 그리드:** 전체 고정 취미 18종을 카드 그리드로 노출하며, 대분류(운동형·지능형·예술형) 필터 탭 제공.

### ② 카테고리별 전용 페이지 (`/category/[type]`)

* **상단 배너:** 선택된 카테고리명(예: `운동형`)과 해당 카테고리의 특징을 담은 간단한 소개 문구 노출.
* **본문 그리드:** 해당 카테고리에 속한 6개의 고정 취미 카드만 그리드 형태로 나열.
* **인터랙션:** 로그인 상태인 경우 카드 우측 상단에 북마크(하트) 버튼 상시 노출.

### ③ 로그인 페이지 (`/login`) & 회원가입 페이지 (`/signup`)

* **레이아웃:** 화면 중앙에 위치한 모달 형태의 카드 컨테이너 (`max-w-md mx-auto my-20 p-8 rounded-2xl border shadow-xl`).
* **폼 요소:** 아이디/비밀번호 입력 폼, 둥근 입력 필터(`rounded-lg border-neutral-300 focus:ring-rose-500`), 하단 전환 링크.

### ④ 마이페이지 (`/mypage`) — *로그인 필수*

* **상단:** 회원이 북마크한 취미 카드 리스트를 그리드로 노출 (카드 내 즉시 북마크 해제 버튼 제공).
* **하단/사이드 통계 영역:** 카테고리별 북마크 분포 비율을 직관적인 바 차트(Bar Chart) 또는 파이 차트(Pie Chart)로 시각화.

---

## 4. 레이아웃 컴포넌트 (Layout Components)

### 1) Top Bar 컴포넌트

```tsx
<header className="sticky top-0 z-50 bg-white border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
  <div className="font-bold text-xl text-rose-500 cursor-pointer">HobbyFind</div>
  <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-700">
    <a href="/category/sports" className="hover:text-black">운동형</a>
    <a href="/category/intelligence" className="hover:text-black">지능형</a>
    <a href="/category/art" className="hover:text-black">예술형</a>
  </nav>
  <div className="flex items-center gap-4">
    {/* 로그인 상태에 따른 조건부 렌더링 */}
    <a href="/login" className="text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-100">로그인</a>
  </div>
</header>

```

### 2) 취미 카드 컴포넌트 (Hobby Card)

```tsx
<div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-all duration-300">
  <div className="aspect-square bg-neutral-100 relative overflow-hidden">
    {/* 북마크 버튼 (회원 전용) */}
    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:scale-110 transition-transform">
      <svg className="w-5 h-5 text-neutral-600 hover:text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  </div>
  <div className="p-4">
    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">운동형</span>
    <h3 className="text-base font-bold text-neutral-900 mt-1">조깅/러닝</h3>
  </div>
</div>

```

### 3) 필터 탭 UI (Pill Navigation)

```tsx
<div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
  <button className="px-5 py-2.5 rounded-full border border-black bg-black text-white text-sm font-semibold transition">전체</button>
  <button className="px-5 py-2.5 rounded-full border border-neutral-300 bg-white text-neutral-700 text-sm font-semibold hover:border-black transition">운동형</button>
  <button className="px-5 py-2.5 rounded-full border border-neutral-300 bg-white text-neutral-700 text-sm font-semibold hover:border-black transition">지능형</button>
</div>

```

---

## 5. 상호작용 패턴 (Interaction Patterns)

* **버튼 및 인터랙션:** 모든 클릭 가능한 요소는 `transition` 효과를 주어 부드러운 피드백 제공 (예: `active:scale-95 duration-150`).
* **카드 호버 효과:** 마우스 오버 시 카드가 미세하게 떠오르는 효과 적용 (`hover:-translate-y-1 hover:shadow-lg transition-all`).
* **북마크 토글:** 하트 아이콘 클릭 시 즉시 채워진 빨간색(`text-rose-500 fill-rose-500`)으로 전환되며 상태 반영.
* **데스크톱 vs 모바일 동작 차이:**
* **데스크톱:** 상단바 고정, 카드 3~4열 그리드 레이아웃, 마우스 호버 시 툴팁 및 서브 효과 활성화.
* **모바일:** 상단 카테고리 필터 가로 스크롤 가능 처리, 카드 1~2열 그리드 배치를 통해 터치 편의성 극대화.



---

## 6. 반응형 브레이크포인트 (Breakpoints)

TailwindCSS 표준 기준에 맞춘 해상도별 레이아웃 변화 가이드입니다.

| 브레이크포인트 | 화면 너비 (Width) | 대상 기기 | 그리드 컬럼 수 (카드 목록) | 레이아웃 특징 |
| --- | --- | --- | --- | --- |
| **`sm`** | `640px 이상` | 소형 태블릿 / 대화면 스마트폰 | **2열 (Cols-2)** | 좌우 여백을 줄이고 카드가 두 개씩 배치됨 |
| **`md`** | `768px 이상` | 태블릿 (iPad 등) | **3열 (Cols-3)** | 상단 네비게이션 메뉴 정식 노출 시작 |
| **`lg`** | `1024px 이상` | 소형 노트북 / 데스크톱 | **4열 (Cols-4)** | 가장 최적화된 데스크톱 그리드 레이아웃 |
| **`xl` 이상** | `1280px 이상` | 대형 데스크톱 | **4열 (최대 폭 제한)** | 콘텐츠 영역에 최대 너비(`max-w-7xl mx-auto`) 적용하여 가독성 유지 |