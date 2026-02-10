
# 🔑 Firebase 서비스 계정 키 발급 가이드 (왕초보용)

로터스님, 복잡한 말은 모두 잊으시고 아래 **그림을 보듯이 순서대로** 따라해주세요!

---

### 1단계: Firebase 콘솔 접속
1. 인터넷 브라우저를 켭니다.
2. 주소창에 `https://console.firebase.google.com` 을 입력하고 엔터를 칩니다.
3. 화면에 보이는 **"Sense Your Day"** 프로젝트 박스를 클릭합니다.

### 2단계: 프로젝트 설정 들어가기
1. 화면 왼쪽 맨 위의 **"Project Overview"** 글자 옆에 있는 **⚙️ 톱니바퀴 아이콘**을 클릭합니다.
2. 작은 메뉴가 나오면 **"Project settings (프로젝트 설정)"**을 클릭합니다.

### 3단계: 서비스 계정 탭 찾기
1. 화면 중앙 상단에 여러 탭 메뉴가 보입니다. (General, Cloud Messaging, Integrations...)
2. 그 중에서 **"Service accounts (서비스 계정)"** 탭을 클릭합니다.

### 4단계: 키 파일 생성하기 (가장 중요!)
1. 화면을 아래로 조금 내리면, 파란색 글씨로 **"Firebase Admin SDK"**라는 말이 보입니다.
2. 더 아래에 있는 **[Generate new private key (새 비공개 키 생성)]** 버튼을 클릭합니다.
3. 경고창이 나오면 **[Generate key]**를 다시 한번 클릭합니다.
4. **컴퓨터에 파일이 하나 다운로드** 됩니다. (이름은 `sense-your-day-xxxx.json` 처럼 생겼습니다.)

### 5단계: 키 내용 복사하기
1. 방금 다운로드 받은 파일을 찾습니다. (보통 '다운로드' 폴더에 있습니다.)
2. 그 파일을 **마우스 오른쪽 클릭** -> **연결 프로그램** -> **메모장**으로 엽니다.
3. 메모장에 알 수 없는 외계어(`{ "type": "service_account", ... }`)가 잔뜩 있을 겁니다.
4. **전체 선택(Ctrl+A)** 하고 **복사(Ctrl+C)** 하세요.

---

### 마지막: 깃허브에 붙여넣기
1. 깃허브 저장소(Github)의 **Settings > Secrets > Actions** 화면으로 돌아옵니다.
2. `FIREBASE_SERVICE_ACCOUNT_SENSE_YOUR_DAY_84898409` 라는 이름의 Secret을 만듭니다.
3. **Value** 칸에 아까 메모장에서 복사한 **전체 내용**을 붙여넣기(Ctrl+V) 합니다.
4. **Add secret** 버튼 클릭! 끝! 🎉
