const express = require("express"); // express 모듈
const app = express(); // express 모듈 관련 객체 생성 (Node.js의 createServer()와 비슷)
const cors = require("cors"); // cors 모듈
const multer = require("multer"); // 이미지 저장을 위한 multer 모듈
const mysql = require("mysql"); // mysql 모듈
const path = require("path"); // path(경로) 모듈
const port = 3000; // 포트 번호

const db = mysql.createConnection({
  hos: "localhost", // 서버 주소
  user: "사용자 이름 입력란", // 사용자 이름
  password: "비밀번호 입력란", // 비밀번호
  database: "course", // DB 이름
});

db.connect((err) => {
  if (err) {
    console.log("Database Error:", err);
    return;
  }
  console.log("Connection Success");
});

// JSON 형식의 요청 본문을 파싱할 수 있도록 설정
app.use(express.json());

/*
app.METHOD(PATH, HANDLER)
- app: express의 인스턴스
- METHOD: HTTP 요청 메소드(GET, POST 등)
- PATH: 서버에서의 경로
- HANDLER: 라우트(Route)가 일치할 때 실행되는 함수 -> 콜백 함수
 */

// 미들웨어 역할을 하는 함수. (요청과 응답 사이에 실행되는 함수)
// URL을 지정하지 않아도 사용 가능. 앱이 요청을 수신할 때마다 매번 실행
// CORS(Cross-Origin Resource Sharing)란? 도메인이 다른 서버끼리 리소스를 주고 받을 때 보안을 위해 설정된 정책
// 쉽게 말해 우리가 정해둔 곳에서만 데이터를 요청할 수 있게 하는 작업
app.use(cors());

// 정적 파일 제공을 위한 경로 설정
app.use(express.static(path.join(__dirname, "../..", "build")));

// URL에 데이터를 붙여 웹서버에 요청을 보내는 방식 => .get()
// 기본 라우트 설정, 요청과 응답을 파라미터로 갖는 콜백함수
// "/"경로로 get 방식을 요청
// 클라이언트 -> 서버 요청 데이터 = req 인자값을 통해 받음
// 웹서버에 응답 = res 인자값을 통해 응답과 관련된 데이터를 웹브라우저에게 보냄

// sendFile을 통해 index.html 파일을 전송
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "build", "index.html"));
});

// 서버 포트를 통해 사용자의 요청을 받는 작업
app.listen(port, () => {
  console.log("Server On Port:", port); // 서버가 정상적으로 실행 됐을 때 출력
});
