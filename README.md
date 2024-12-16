# COUrse

## 🖌 Description

## 🔧 How to Run

❗ 본 프로젝트를 사용하기에 앞서 DB 데이터 저장 및 OpneAI API키가 필요합니다.

**Step 1.** 본 프로젝트를 git clone을 통하여 복제 합니다.

```bash
git clone https://github.com/minggichae/COUrse.git
```

**Step 2.** BackEnd 폴더안에 .env 파일을 만듭니다.

**Step 3.** .env 파일 안에 다음과 같이 작성합니다.

- ✨ .env 파일 안에 해당되는 변수들은 다음과 같이 확인 할 수 있습니다.
  - `GPT_API_KEY`
    - OpenAI 홈페이지에 접속 후 로그인을 합니다.
    - 우측 상단의 톱니바퀴 모양(Settings)를 누르고, API keys에 들어갑니다.
    - 초록색의 Create new sercret key를 클릭합니다.
    - Name에다가 API Key 이름을 적고 Create secret key를 클릭하여 다음 창에서 Copy 버튼을 통해 복사를 한 후 .env 파일에다가 옮겨 적습니다.
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
    - MySQL Workbench를 설치를 합니다.
      (참고: [MySQL Workbench 설치](https://giveme-happyending.tistory.com/203#article-3--%F0%9F%92%BB-mysql-%EC%84%A4%EC%B9%98) )
    - 설치 후 Local instance MySQL에 접속한 후 다음과 같이 입력합니다.
      (DB_README.md를 참고하시면 됩니다.)
    - 입력을 한 후 .env 파일에 옮겨 적으면 됩니다.

```env
GPT_API_KEY=복사한 OpenAI API 키
DB_HOST=localhost
DB_USER=사용자명
DB_PASSWORD=비밀번호
DB_NAME=DB명
```

**Step 4.** npm ci를 통하여 모듈을 다운받고, vscode 터미널 2개에서 다음과 같이 실행합니다.

- 첫번째 터미널(서버 실행)

```
npm ci
npm run build
cd src/BackEnd
node server.js
```

- 두번째 터미널(프로젝트 실행)
  - ❗ 첫번째 터미널을 먼저 실행한 후 실행해야합니다.

```
npm run start
```

## ⛓️ Service Architecture

아키텍처 사진 업로드

## 📱 APP Screenshot

### 이미지 1: 메인 페이지, 카테고리

![메인 페이지](메인 페이지 gif 넣기)
사이트를 실행 시 사이트의 이용 방법과 우측 상단의 카테고리 버튼을 통해 입력할 수 있는 카테고리의 종류(현재 과일, 채소만 입력가능)를 확인할 수 있고, 버튼을 통해 다음으로 이동합니다.

### 이미지 2: 상품 정보 입력

![상품 정보 입력](상품 정보 gif 넣기)
상품에 대한 정보를 입력 후 추천을 받습니다.

### 이미지 3: 상품 추천

![상품 추천](상품 추천 gif 넣기)
추천 받기 버튼을 통해 상품을 추천받고, 상품 이미지 클릭 시 쿠팡 구매 사이트로 연결됩니다.

## 🚨 R&R

- 채민기[BE/팀장]: ProductResult, ProductUrls, server
- 곽지훈[FR/팀원]:
