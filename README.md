# ✨ SENSE YOUR DAY: 오늘의 나를 보듬는 다정한 길잡이
"불확실한 내일이 아닌, 온전한 오늘을 온전히 감각하는 시간."

**SENSE YOUR DAY(SYD)**는 당신의 가장 가까운 접점에서 매일의 불안을 다정함으로 치유하는 서비스입니다. 단순히 운명을 점치는 도구가 아니라, 사용자가 자신의 내면을 깊이 들여다보게 함으로써 불확실성 속에서 정서적 안정감을 찾는 '감정적 동반자' 역할을 수행합니다.

## 🌙 Key Features

### 1. 🤖 인터렉티브 체크인 (Interactive Check-in)
- **다정한 페르소나**: 격식 있으면서도 따뜻한 어투를 유지하며 사용자의 현재 상태를 묻습니다.
- **Soft Data 수집**: "오늘 기분은 좀 어때요?"라는 질문을 통해 사용자의 실시간 감정과 상황 컨텍스트를 수집합니다.
- **맥락 인지**: 수집된 대화 데이터를 AI 프롬프트에 주입하여 개인화된 위로를 조립합니다.

### 2. 🔮 하이브리드 분석 엔진 (Hybrid Engine)
- **Hard Data 결합**: 동양의 **사주(만세력)**와 서양의 점성술(Swiss Ephemeris) 데이터를 정밀하게 결합합니다.
- **3단계 아웃풋 구성**:
    - **오늘의 한 줄**: 오늘의 에너지 흐름을 시적으로 함축한 문장.
    - **당신을 위한 갈무리**: 데이터 분석 결과를 다정하게 풀어낸 3문장 이내의 위로.
    - **오늘의 행동 지침**: 직설적이되 품격 있는 명확한 가이드 제공.

### 3. 🎨 예술 통합 처방 (Total Arts Remedy)
- **에너지 보완 큐레이션**: 사주와 점성술 데이터를 바탕으로 부족한 에너지를 보완할 예술 작품을 처방합니다.
- **시각적/청각적 리메디**:
    - 특정 기운이 필요한 날에 맞춘 명화 및 영화 장면 추천.
    - 평온함과 주파수 조율을 위한 음악(Spotify) 추천.
- **서사적 통합**: AI가 큐레이션된 예술 조각들을 하나의 이야기로 엮어 감각적인 안식을 선사합니다.

### 4. 🔐 영혼의 각인 (SBT Identity)
- **데이터 주권**: 사용자의 고유한 탄생 정보를 **SBT(Soulbound Token)**로 발행하여 디지털 자산화합니다.
- **영혼의 갤러리**: 처방받은 예술 작품과 문장은 SBT 메타데이터에 기록되어 개인의 영원한 인생 자산이 됩니다.

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Emotional Gradient UI)
- **Database**: Supabase (User & Chat History)
- **AI**: Gemini API / GPT-4o (via MCP)
- **Blockchain**: Soulbound Token (ERC-5192)

## 🚀 Getting Started

### Repository Clone
```bash
git clone https://github.com/Lolololotus/sense-day.git
cd sense-day
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env.local` file and add the following keys:
```bash
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Run Development Server
```bash
npm run dev
```

### Deployment (Vercel)
This project is optimized for deployment on [Vercel](https://vercel.com/new).

1. Clone this repository.
2. Import the project into Vercel.
3. Add the **Environment Variables** listed above in the Vercel Dashboard.
4. Click **Deploy**.

## 📂 Project Structure
```
src/
├── app/
│   ├── api/chat/           # AI Remedy Logic API
│   ├── check-in/           # Daily User Interaction Page
│   └── page.tsx            # Landing & Sacred Input
├── components/
│   ├── ui/
│   │   ├── RemedyCard.tsx  # Arts Curation Display
│   │   ├── OrbitBackground.tsx # Celestial Animation
│   │   └── WalletConnect.tsx # SBT Minting UI
├── lib/
│   ├── astrology.ts        # Swiss Ephemeris Engine
│   └── saju.ts             # Manseryeok Logic
└── types/
    └── index.ts            # Destiny_Identity Types
```

## 🗺 Roadmap
- [x] Phase 1: Project Vision & Sacred Input UI 
- [x] Phase 2: AI Interactive Check-in & Persona 
- [ ] Phase 3: Hybrid Analysis Engine (Saju + Astrology) <!-- In Progress --> 
- [ ] Phase 4: Total Arts Remedy Curation System 
- [ ] Phase 5: SBT Minting & Web3 Data Sovereignty 

---
*Developed with 🌙 by Antigravity Team*
