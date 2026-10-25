
# 🏗️ HobbyFind 정보 구조 (Information Architecture)

## 1. 전체 사이트맵 구조 (Sitemap Tree)

```text
HobbyFind (Root)
│
├── 🏠 홈 (/)
│    ├── Top Bar
│    ├── Hero Section
│    └── Main Content (취미 카드 그리드 + 대분류 필터 토글)
│
├── 📂 카테고리별 페이지 (/category/[type])
│    ├── /category/sports (운동형)
│    ├── /category/intelligence (지능형)
│    └── /category/art (예술형)
│
├── 🔑 로그인 (/login)
├── 📝 회원가입 (/signup)
│
└── 👤 마이페이지 (/mypage) [로그인 필요]
     ├── 북마크 목록
     └── 간단 통계 (북마크 총 개수, 카테고리별 분포 차트)

```

---

## 2. URL 구조 (URL Structure)

| 페이지명 | URL 경로 | 접근 권한 | 비고 |
| --- | --- | --- | --- |
| **홈 (루트)** | `/` | 비회원 / 회원 | 전체 취미 탐색 및 필터링 토글 |
| **카테고리별 페이지** | `/category/sports`<br>

<br>`/category/intelligence`<br>

<br>`/category/art` | 비회원 / 회원 | `type` 파라미터로 3개 고정 카테고리 구분 |
| **로그인** | `/login` | 비회원 전용 | 로그인 성공 시 기존 페이지 또는 `/` 이동 |
| **회원가입** | `/signup` | 비회원 전용 | 회원가입 성공 시 `/login` 이동 |
| **마이페이지** | `/mypage` | 회원 전용 | 비회원 접근 시 `/login`으로 리다이렉트 (Auth Guard) |

---

## 3. 내비게이션 및 Top Bar / Footer 구조

### 3.1 상단바/하단바 포함 여부 및 요소

* **상단바 (Top Bar):** 전역(Global) 상단 고정
* **요소:** 서비스 로고, 카테고리 메뉴 (`운동형`, `지능형`, `예술형`), 인증 관련 버튼


* **하단바 (Footer):** 전역(Global) 하단 배치
* **요소:** 서비스명 (`HobbyFind`), 저작권 표시(Copyright), 기본 가이드 링크



### 3.2 로그인 상태에 따른 Top Bar 내비게이션 표시

| 구분 | 요소 | 비로그인 (Guest) 상태 | 로그인 (User) 상태 |
| --- | --- | --- | --- |
| **좌측** | **로고 (Logo)** | 클릭 시 `/` 이동 | 클릭 시 `/` 이동 |
| **중앙** | **카테고리 메뉴** | `운동형` (`/category/sports`) <br>

<br>`지능형` (`/category/intelligence`) <br>

<br>`예술형` (`/category/art`) | `운동형` (`/category/sports`) <br>

<br>`지능형` (`/category/intelligence`) <br>

<br>`예술형` (`/category/art`) |
| **우측** | **인증 버튼** | `로그인` (`/login`), `회원가입` (`/signup`) | `마이페이지` (`/mypage`), `로그아웃` |

---

## 4. 사용자 흐름 (User Flow)

### 4.1 비회원 (Guest) 플로우

1. **진입 및 탐색:** `/` 또는 `/category/[type]` 접속 ➔ 취미 카드 그리드 둘러보기
2. **카테고리 필터링:** 메인 콘텐츠 토글 클릭 또는 Top Bar 카테고리 링크 이동
3. **북마크 시도:** 취미 카드의 `BookmarkButton` 클릭 ➔ **로그인 필요 에러/안내 메시지** 노출 ➔ `/login` 페이지로 이동
4. **가입 및 로그인:** `/signup`에서 회원가입 ➔ `/login`에서 아이디/비밀번호 입력 ➔ 로그인 완료 후 로그인 상태로 전환

### 4.2 회원 (User) 플로우

1. **탐색 및 북마크:** `/` 또는 `/category/[type]` 접속 ➔ `BookmarkButton` 클릭 ➔ **북마크 상태 실시간 저장/해제**
2. **마이페이지 진입:** Top Bar의 `마이페이지` 버튼 클릭 ➔ `/mypage` 이동
3. **북마크 관리 및 통계 확인:**
* 저장한 북마크 취미 리스트 확인 및 북마크 해제
* 카테고리별 분포 차트(StatsChart) 및 총 개수 확인


4. **로그아웃:** Top Bar의 `로그아웃` 버튼 클릭 ➔ 비로그인 상태로 전환되며 `/`로 이동

---

## 5. 페이지 계층 구조 및 주요 콘텐츠 구성 (Page Hierarchy & Content)

| 페이지 | 섹션 (Page Hierarchy) | 주요 콘텐츠 구성 (Content Organization) |
| --- | --- | --- |
| **홈 (`/`)** | 1. Top Bar<br>

<br>2. Hero 섹션<br>

<br>3. 메인 콘텐츠<br>

<br>4. Footer | • **Top Bar:** 로고, 카테고리 메뉴, 인증 버튼<br>

<br>• **Hero 섹션:** 사이트 소개 문구<br>

<br>• **메인 콘텐츠:** 대분류 필터 토글 (`전체`, `운동형`, `지능형`, `예술형`) + 취미 카드 그리드 (18종)<br>

<br>• **Footer:** 기본 정보 및 카피라이트 |
| **카테고리별 (`/category/[type]`)** | 1. Top Bar<br>

<br>2. 카테고리 상단<br>

<br>3. 본문 콘텐츠<br>

<br>4. Footer | • **카테고리 상단:** 선택된 카테고리명 + 간단 소개 문구<br>

<br>• **본문 콘텐츠:** 해당 카테고리에 속한 고정 취미 카드 그리드 (6종)<br>

<br>• **Footer:** 전역 하단바 |
| **로그인 (`/login`)** | 1. Top Bar<br>

<br>2. 로그인 폼 영역<br>

<br>3. Footer | • **로그인 폼:** 아이디 입력란, 비밀번호 입력란<br>

<br>• **에러 메시지 영역:** 로그인 실패 시 빨간색 안내 문구 표기<br>

<br>• **서브 링크:** 회원가입 페이지 이동 링크 (`/signup`) |
| **회원가입 (`/signup`)** | 1. Top Bar<br>

<br>2. 회원가입 폼 영역<br>

<br>3. Footer | • **회원가입 폼:** 아이디 입력란, 비밀번호 입력란<br>

<br>• **약관 동의:** 약관 동의 체크박스<br>

<br>• **서브 링크:** 로그인 페이지 이동 링크 (`/login`) |
| **마이페이지 (`/mypage`)** | 1. Top Bar<br>

<br>2. 북마크 목록 영역<br>

<br>3. 간단 통계 영역<br>

<br>4. Footer | • **북마크 목록:** 회원이 북마크한 취미 카드 그리드 및 북마크 해제 기능<br>

<br>• **간단 통계:** 북마크 총 개수 텍스트 + 카테고리별 분포 통계 차트 |

---

## 6. 상호작용 패턴 (Interaction Patterns)

| 구분 | 이벤트 / 동작 | 상태 변화 및 UX 반응 |
| --- | --- | --- |
| **카테고리 필터 토글** | 홈(`/`)에서 필터 토글 클릭 | • 선택된 필터 버튼 활성화 스타일 변경<br>

<br>• 선택한 카테고리에 속한 취미 카드만 메인 그리드에 즉시 노출 (클라이언트 필터링) |
| **북마크 토글** | `BookmarkButton` 클릭 | • **비회원:** "로그인이 필요한 기능입니다" 에러 메시지/알림 노출 후 `/login` 이동 유도<br>

<br>• **회원:** 북마크 아이콘 활성화/비활성화 토글 ➔ DB 반영 ➔ 마이페이지 차트/목록에 즉시 반영 |
| **로그인 에러** | 잘못된 ID/PW로 로그인 제출 | • 폼 하단에 에러 메시지 표기 ("아이디 또는 비밀번호가 올바르지 않습니다.") |
| **마이페이지 진입 차단** | 비회원 상태에서 `/mypage` URL 직접 입력 | • Next.js Middleware / Auth Guard에 의해 접근 차단 ➔ `/login` 페이지로 자동 리다이렉트 |

---

## 7. 컴포넌트 계층 구조 (Component Hierarchy - Next.js)

```text
app/
├── layout.tsx                      # RootLayout
│   ├── Topbar                      # 전역 상단바
│   │   ├── Logo                    # 로고 컴포넌트
│   │   ├── CategoryMenu            # 카테고리 메뉴 (운동형, 지능형, 예술형)
│   │   └── AuthButtons             # 로그인/회원가입 or 마이페이지/로그아웃
│   ├── {children}                  # 각 페이지 콘텐츠
│   └── Footer                      # 전역 하단바
│
├── page.tsx                        # 1. 홈 (/)
│   ├── HeroSection                 # 사이트 소개 문구
│   └── MainContent                 # 메인 콘텐츠
│       ├── CategoryToggle          # 대분류 필터 토글
│       └── HobbyCardGrid           # 취미 카드 그리드
│           └── HobbyCard           # 취미 카드 단일 항목
│               └── BookmarkButton  # 북마크 토글 버튼
│
├── category/[type]/page.tsx        # 2. 카테고리별 페이지 (/category/[type])
│   ├── CategoryHeader              # 선택된 카테고리명 + 간단 소개
│   └── HobbyCardGrid               # 해당 카테고리 취미 카드 그리드
│       └── HobbyCard
│           └── BookmarkButton
│
├── login/page.tsx                  # 3. 로그인 (/login)
│   └── LoginForm                   # 아이디/비밀번호 폼, 에러 메시지, 회원가입 링크
│
├── signup/page.tsx                 # 4. 회원가입 (/signup)
│   └── SignupForm                  # 아이디/비밀번호 폼, 약관 동의, 로그인 링크
│
└── mypage/page.tsx                 # 5. 마이페이지 (/mypage) [로그인 필요]
    ├── BookmarkList                # 북마크 목록 (HobbyCardGrid 재사용)
    └── StatsChart                  # 간단 통계 (총 개수, 카테고리별 분포 차트)

```

---

## 8. 고정 취미 데이터 매핑 (18종 고정)

| 카테고리 | URL type | 고정 취미 항목 (변경·확장 불가) |
| --- | --- | --- |
| **운동형** | `sports` | 조깅/러닝, 요가, 수영, 자전거, 클라이밍, 댄스 |
| **지능형** | `intelligence` | 독서, 퍼즐, 체스, 프로그래밍, 외국어 학습, 사진 촬영 |
| **예술형** | `art` | 그림 그리기, 악기 연주, 요리, 서예, 도자기 만들기, 정원 가꾸기 |