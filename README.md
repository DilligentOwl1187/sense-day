# ✨ SENSE YOUR DAY: 오늘의 나를 보듬는 다정한 길잡이

> "불확실한 내일이 아닌, 온전한 오늘을 감각하는 시간."

**SENSE YOUR DAY**는 당신의 가장 가까운 접점에서 매일의 불안을 다정함으로 치유하는 서비스입니다. **Taste Tree**가 당신의 고유한 취향을 인양하는 정원이라면, **SENSE YOUR DAY**는 그 정원을 가꾸는 당신의 마음과 시간을 보듬는 지도가 되어줍니다.

### 🌟 Project Vision
- **운명을 넘어서는 성찰**: 단순히 길흉을 점치는 도구가 아닙니다. 사용자가 자신의 내면을 깊이 들여다보게 함으로써, 삶의 불확실성 속에서도 흔들리지 않는 정서적 안정감을 찾는 '감정적 동반자' 역할을 수행합니다.
- **데이터의 따뜻한 조립**: AI 정원사가 당신에게 묻습니다. *"오늘 기분은 좀 어때요?"* 당신의 실시간 상태(Soft Data)와 우주의 거대한 흐름(Hard Data)을 결합하여 오직 당신만을 위한 위로를 조립합니다.
- **영혼의 각인(SBT)**: 당신의 탄생이라는 고유한 우주적 정보를 **SBT(Soulbound Token)**로 발행합니다. 당신의 데이터 주권이 온전히 당신에게 귀속되는 Web3의 가치를 실현합니다.

## 🛠 핵심 기능 및 기술 구조 (Technical Architecture)

### 1. � 인터렉티브 체크인: 마음을 묻는 기술
- **Mechanism**: 접속 시 AI가 건네는 *"오늘 기분은 어때요?"*라는 질문을 통해 사용자의 상태 정보를 수집합니다.
- **Logic**: 수집된 텍스트(Soft Data)를 LLM 프롬프트의 컨텍스트로 주입하여, 천문 데이터가 차가운 수치가 아닌 따뜻한 조언으로 변환되도록 합니다.

### 2. 🌌 하이브리드 분석 엔진: 동서양의 조화
- **Hard Data**: **Swiss Ephemeris**(서양)와 **만세력 알고리즘**(동양)을 교차 분석하여 입체적인 에너지 지표를 산출합니다.
- **Persona**: **GPT-4o** 기반의 '점성가이자 심리 상담가' 페르소나를 통해 [오늘의 한마디], [궁금한 한가지], [시간의 감각]의 3단계 맞춤 조언을 생성합니다.

### 3. � Web3 Identity: 데이터의 주인은 당신입니다
- **SBT 발행**: 평생 변하지 않는 탄생 정보를 전송 불가능한 토큰(Soulbound Token)으로 발행하여 디지털 상의 고유한 아이덴티티를 확립합니다.
- **Value**: 지갑 연결만으로 자신의 데이터를 안전하게 통제하며, 타 서비스와의 연동 시에도 주권적인 데이터 활용을 보장합니다.

## 🧱 기술 스택 (Tech Stack)

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (Emotional Gradient Aesthetic)
- **Database**: Supabase
- **AI Engine**: GPT-4o / Gemini API (Emotion Analysis)
- **Blockchain**: SBT (ERC-5192 Standard)

## 🚀 시작하기 (Getting Started)

1. **환경 변수 설정**: root 디렉토리에 `.env.local` 파일을 생성하고 필수 키를 입력하세요.
   ```bash
   GEMINI_API_KEY=your_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

2. **의존성 설치**:
   ```bash
   npm install
   ```

3. **개발 서버 실행**:
   ```bash
   npm run dev
   ```

## 🗺 로드맵 (Roadmap)

- [x] 프로젝트 초기 설정 (Next.js + Tailwind)
- [x] 기본 UI 구현 (Check-in, 3-Step Output)
- [x] Hybrid Engine 목업 구현
- [x] AI 페르소나(GPT-4o/Gemini) 실시간 연동
- [ ] Supabase 데이터베이스 연동
- [ ] Web3 지갑 연결 및 SBT 스마트 컨트랙트 개발

---
Developed by **Antigravity Team** for the Sense Your Day Project.
