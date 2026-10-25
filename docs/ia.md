제공해주신 서비스 개요 및 페이지 구성을 바탕으로 작성한 **HobbyFind 웹서비스 정보 구조(Information Architecture, IA)** 문서입니다.

---

# 🏗️ HobbyFind 정보 구조 (Information Architecture)

## 1. 전체 사이트맵 구조 (Sitemap Tree)

```text
HobbyFind (Root)
│
├── 🏠 홈 (/)
│    ├── Top Bar
│    ├── Hero Section
│    └── Main Content (전체/필터링 취미 카드 그리드)
│
├── 📂 카테고리별 페이지 (/category/[type])
│    ├── /category/sports (운동형)
│    ├── /category/intelligence (지능형)
│    └── /category/art (예술형)
│
├── 🔑 로그인 (/login)
├── 📝 회원가입 (/signup)
│
└── 👤 마이페이지 (/mypage) [Auth Guard]
     ├── 북마크 목록
     └── 카테고리별 통계 차트

```

---

## 2. URL 구조 (URL Structure)

| 페이지명 | URL 경로 | 접근 권한 | 비고 |
| --- | --- | --- | --- |
| **홈 (루트)** | `/` | All (비회원/회원) | 전체 취미 탐색 및 필터링 |
| **카테고리별 페이지** | `/category/sports`<br>

<br>`/category/intelligence`<br>

<br>`/category/art` | All (비회원/회원) | `sports`, `intelligence`, `art` 3개 카테고리 고정 |
| **로그인** | `/login` | Guest Only | 로그인 후 기존 페이지 또는 `/` 이동 |
| **회원가입** | `/signup` | Guest Only | 회원가입 완료 후 `/login` 이동 |
| **마이페이지** | `/mypage` | User Only | 비회원 접근 시 `/login`으로 리다이렉트 (Auth Guard) |

---

## 3. 내비게이션 및 Top Bar 상태 관리 (Navigation)

### 3.1 Top Bar & Footer 포함 여부

* **상단바 (Top Bar):** 전역(Global) 배치
* **하단바 (Footer):** 전역(Global) 배치 (카피라이트 및 기본 안내 링크)

### 3.2 상태별 Top Bar UI 및 동작 사양

| 구분 | 요소 | 비로그인 (Guest) 상태 | 로그인 (User) 상태 |
| --- | --- | --- | --- |
| **좌측** | **Logo** | `HobbyFind` 클릭 시 `/` 이동 | `HobbyFind` 클릭 시 `/` 이동 |
| **중앙** | **Category Menu** | `운동형`, `지능형`, `예술형` 링크 | `운동형`, `지능형`, `예술형` 링크 |
| **우측** | **Auth Actions** | `로그인` (`/login`), `회원가입` (`/signup`) 버튼 | `마이페이지` (`/mypage`), `로그아웃` 버튼 |

---

## 4. 사용자 흐름 (User Flow)

### 4.1 비회원 (Guest) 플로우

1. **탐색:** `/` 또는 `/category/[type]` 접속 ➔ 전체/카테고리별 취미 카드 둘러보기
2. **북마크 시도:** 카드 내 북마크(하트) 아이콘 클릭 ➔ **로그인 필요 안내 Modal/Toast** 노출 ➔ `/login` 페이지로 이동
3. **가입 및 로그인:** `/signup`에서 회원가입 완료 ➔ `/login`에서 아이디/비밀번호 로그인 ➔ 로그인 상태로 전환

### 4.2 회원 (User) 플로우

1. **탐색 및 북마크:** `/` 또는 `/category/[type]` 탐색 ➔ 북마크 아이콘 클릭 ➔ 실시간 토글 (DB 저장/삭제)
2. **마이페이지 이동:** Top Bar의 `마이페이지` 클릭 ➔ `/mypage` 진입
3. **관리 및 통계 확인:** 저장한 북마크 리스트 조회/해제 ➔ 카테고리별 분포 통계 차트 확인 ➔ Top Bar의 `로그아웃` 클릭 시 비회원 상태 전환

---

## 5. 페이지 계층 구조 및 주요 콘텐츠 구성 (Page Hierarchy & Content)

| 페이지 | 섹션 (Page Hierarchy) | 주요 UI 및 콘텐츠 구성 (Content Organization) |
| --- | --- | --- |
| **홈 (`/`)** | 1. Header (Top Bar)<br>

<br>2. Hero Section<br>

<br>3. Filter Section<br>

<br>4. Main Grid<br>

<br>5. Footer | • Top Bar (로고, 메뉴, Auth)<br>

<br>• 헤드라인 문구 ("나만의 취미를 찾아보세요")<br>

<br>• 대분류 필터 토글 버튼 (`전체`, `운동형`, `지능형`, `예술형`)<br>

<br>• 취미 카드 그리드 (18개 고정 취미)<br>

<br>• 카드의 북마크 버튼 |
| **카테고리별 (`/category/[type]`)** | 1. Header (Top Bar)<br>

<br>2. Category Banner<br>

<br>3. Category Grid<br>

<br>4. Footer | • 선택된 카테고리 타이틀 및 소개 문구<br>

<br>• 해당 카테고리에 속한 6개 취미 카드 그리드<br>

<br>• 카드의 북마크 버튼 |
| **로그인 (`/login`)** | 1. Header (Top Bar)<br>

<br>2. Login Form<br>

<br>3. Footer | • 아이디 / 비밀번호 입력 폼<br>

<br>• 로그인 제출 버튼<br>

<br>• 에러 메시지 출력 영역 (비밀번호 불일치 등)<br>

<br>• 회원가입 페이지 이동 링크 (`/signup`) |
| **회원가입 (`/signup`)** | 1. Header (Top Bar)<br>

<br>2. Signup Form<br>

<br>3. Footer | • 아이디 / 비밀번호 / 비밀번호 확인 입력 폼<br>

<br>• 약관 동의 체크박스<br>

<br>• 가입하기 제출 버튼<br>

<br>• 로그인 페이지 이동 링크 (`/login`) |
| **마이페이지 (`/mypage`)** | 1. Header (Top Bar)<br>

<br>2. Bookmark List<br>

<br>3. Stats Section<br>

<br>4. Footer | • **북마크 영역:** 사용자가 저장한 취미 카드 그리드 및 삭제(해제) 버튼<br>

<br>• **통계 영역:** 북마크 총 개수 텍스트 + 카테고리별 비율 통계 차트 (Recharts/Chart.js) |

---

## 6. 컴포넌트 계층 구조 (Component Hierarchy - Next.js)

```text
app/
├── layout.tsx                     # RootLayout
│   ├── Topbar                     # 전역 상단바
│   │   ├── Logo                   # 로고 컴포넌트
│   │   ├── CategoryMenu           # 카테고리 링크 메뉴
│   │   └── AuthButtons            # 로그인/회원가입 또는 마이페이지/로그아웃
│   ├── {children}                 # 페이지별 콘텐츠
│   └── Footer                     # 전역 하단바
│
├── page.tsx                       # Home Page (/)
│   ├── HeroSection                # 서비스 소개 텍스트
│   ├── CategoryFilter             # 클라이언트 필터 토글 버튼
│   └── HobbyCardGrid              # 취미 카드 그리드 레이아웃
│       └── HobbyCard              # 단일 취미 카드
│           └── BookmarkButton     # 북마크 토글 버튼
│
├── category/[type]/page.tsx       # Category Page (/category/[type])
│   ├── CategoryBanner             # 카테고리 타이틀 & 설명
│   └── HobbyCardGrid
│       └── HobbyCard
│           └── BookmarkButton
│
├── login/page.tsx                 # Login Page
│   └── LoginForm                  # ID/PW 입력 및 Validation
│
├── signup/page.tsx                # Signup Page
│   └── SignupForm                 # ID/PW/약관 동의 Form
│
└── mypage/page.tsx                # My Page (/mypage) [Protected]
    ├── BookmarkList               # 저장된 HobbyCardGrid
    └── StatsChart                 # 카테고리별 비율 시각화 차트

```

---

## 7. 상호작용 패턴 (Interaction Patterns)

| 요소 | 이벤트/동작 | 상태 변화 및 반응 (UI/UX Reaction) |
| --- | --- | --- |
| **카테고리 필터** | 홈(`/`)에서 카테고리 버튼 클릭 | • 선택된 버튼 활성화 (Style active)<br>

<br>• 해당 카테고리 취미 카드만 그리드에 즉시 재배치 (Client-side filtering) |
| **북마크 토글** | `BookmarkButton` 클릭 | • **비회원:** Toast/Modal 안내창 노출 후 `/login` 이동 유도<br>

<br>• **회원:** 아이콘 Fill 상태 즉시 변경 ➔ DB 업데이트 ➔ 마이페이지 차트 반영 |
| **로그인 폼** | 유효하지 않은 정보로 제출 | • 폼 하단에 Red 텍스트 에러 메시지 노출 (`아이디 또는 비밀번호가 일치하지 않습니다.`) |
| **마이페이지 진입** | 비회원 상태에서 `/mypage` 접속 | • Next.js Middleware 또는 Auth Guard 작동 ➔ `/login?redirect=/mypage`로 차단 및 리다이렉트 |
| **북마크 해제** | 마이페이지에서 북마크 해제 | • 해당 카드가 목록에서 즉시 제거(Fade-out)되며, 통계 차트 수치 및 비율 즉시 재계산 반영 |

---

## 8. 고정 취미 데이터 매핑 사양 (18종)

| 카테고리 (Type) | slug | 고정 취미 항목 (6종씩) |
| --- | --- | --- |
| **운동형** | `sports` | 조깅/러닝, 요가, 수영, 자전거, 클라이밍, 댄스 |
| **지능형** | `intelligence` | 독서, 퍼즐, 체스, 프로그래밍, 외국어 학습, 사진 촬영 |
| **예술형** | `art` | 그림 그리기, 악기 연주, 요리, 서예, 도자기 만들기, 정원 가꾸기 |