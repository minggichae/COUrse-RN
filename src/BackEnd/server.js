require("dotenv").config();
const express = require("express"); // express 모듈
const app = express(); // express 모듈 관련 객체 생성 (Node.js의 createServer()와 비슷)
const cors = require("cors"); // cors 모듈
const mysql = require("mysql"); // mysql 모듈
const path = require("path"); // path(경로) 모듈
const openai = require("openai"); // openai 모듈
const port = 8080; // 포트 번호

const db = mysql.createConnection({
  host: process.env.DB_HOST, // 서버 주소
  user: process.env.DB_USER, // 사용자 이름
  password: process.env.DB_PASSWORD, // 비밀번호
  database: process.env.DB_NAME, // DB 이름
});

db.connect((err) => {
  if (err) {
    console.log("Database Error:", err);
    return;
  }
  console.log("Connection Success");
});

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
// CORS 설정 추가
app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인
    methods: ["GET", "POST"], // 허용할 HTTP 메서드
    allowedHeaders: ["Content-Type", "Authorization"], // 허용할 헤더(전송 데이터 유형, 인증 관련 정보 헤더만 허용)
    credentials: true, // 쿠키 전송 허용 (Access-Control-Allow-Credentials)
  })
);

// JSON 형식의 요청 본문을 파싱할 수 있도록 설정
app.use(express.json());

// http://localhost:8080/image/폴더명/이미지.jpg와 같은 형식으로 입력하면 접근 가능
// -> db를 경유하지 않고, 서버에 해당하는 이미지 경로를 가져온것이다.
// 서버도 일종의 컴퓨터이기에 윈도우에 저장한거 마냥 서버에 이미지 폴더를 만든거다.
// 근데, 서버가 호스팅이 되다보니 주소도 저렇게 되어있는것이다.
// 정적 파일 접근을 위한 설정
app.use("/image", express.static(path.join(__dirname, "image")));

// 정적 파일 제공을 위한 경로 설정
app.use(express.static(path.join(__dirname, "../..", "build")));

// URL에 데이터를 붙여 웹서버에 요청을 보내는 방식 => .get()
// 기본 라우트 설정, 요청과 응답을 파라미터로 갖는 콜백함수
// ""안에 경로로 get 방식을 요청
// 클라이언트 -> 서버 요청 데이터 = req 인자값을 통해 받음
// 웹서버에 응답 = res 인자값을 통해 응답과 관련된 데이터를 웹브라우저에게 보냄

// 제품 목록을 가져오는 GET 요청 처리
app.get("/products", (req, res) => {
  const sql =
    "SELECT product_name, product_price, product_starrating, product_image FROM products"; // 쿼리 정의
  db.query(sql, (err, results) => {
    // 쿼리 실행
    if (err) {
      console.error("query error:", err);
      return res.status(500).json({ error: "server error" }); // 오류 응답
    }
    res.json(results); // 결과를 JSON 형식으로 클라이언트에 전송
  });
});

// 클라이언트가 보내는 요청에 대한 처리
app.post("/api/recommend", async (req, res) => {
  const apikey = process.env.GPT_API_KEY; // API 키
  console.log(process.env.GPT_API_KEY); // API 키 확인
  const { categoryValue, starScore, printCount } = req.body; // 프론트엔드에서 보낸 데이터 받기
  console.log(req.body); // 프론트엔드에서 보낸 데이터 확인

  try {
    // apikey가 없을 시 에러 호출 (500번은 서버측 에러를 뜻함.)
    if (!apikey) {
      return res.status(500).json({ error: "API key is missing" });
    }
    // GPT API를 호출
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", // 위 주소로 데이터를 전송
      headers: {
        "Content-Type": "application/json", // 서버가 JSON 형식의 데이터를 받는 것을 명시
        Authorization: `Bearer ${apikey}`, // Open API에 인증
      },
      body: JSON.stringify({
        model: "ft:gpt-4o-mini-2024-07-18:personal::AXlmPwSu",
        messages: [
          // 메세지 role과 content를 여러개 작성이 가능함.
          {
            role: "system", // 메세지 역할 system로 설정
            content: `당신은 상품을 추천해주는 전문가입니다. 저는 상품에 대해 하나도 모르는 입장입니다.
          상품의 카테고리를 입력받으면 그 카테고리에 알맞는 제품의 상품 정보를 생성하여 출력합니다.
          입력받은 카테고리는 ${categoryValue}이고, 별점은 ${starScore}점 이상, 제품 추천 수는 ${printCount}개입니다.
          제품 추천 개수는 ${printCount}개수 보다 적어서도 안되고 많아서도 안됩니다.
          예를 들어, ${printCount}가 30인 경우 길이는 0~29까지입니다.
          별점을 가져와서 나타낼땐 4 이런식으로 나타냅니다.
          카테고리에 관련된 제품만 추천해주고 다른 제품은 추천하면 안됩니다.
          예를 들면 채소를 입력하면 상추, 깻잎 이런류만 알려주고 채소 다지는 기계 이런 답변은 불필요합니다.
          그리고, 이미 한번 추천을 해준 제품은 제외하고 다른 제품을 추천하면 됩니다.`,
          },
          {
            role: "user",
            content: categoryValue,
          },
          {
            role: "assistant",
            content: `제품명, 가격, 별점 이 세가지 외의 답변은 하지마. 가격은 한국 환율을 기준으로 잡아줘. 제품의 추천 개수는 ${printCount}개와 정확하게 일치시켜야해`,
          },
        ],
        temperature: 0,
        max_tokens: 3000,
        top_p: 0,
      }),
    });

    const data = await response.json(); // 나온 답변을 JSON 형식으로 파싱 후 Javascript 객체로 변환
    console.log("API 응답 데이터:", data);
    console.log(data.choices[0].message.content);

    // 나온 답변에다가 db 이미지 경로 붙여서 클라이언트에 반환 해주면 이미지 문제가 해결될 것으로 보임.
    // 답변을 파싱하고 map 형태로 받아서 답변의 상품명과 db의 상품명이 일치하면 index마다 배열안에 추가해주면 될 것 같음.

    // 답변이 있을 시 응답 데이터를 클라이언트에 반환
    if (data && data.choices.length > 0) {
      const products = JSON.parse(data.choices[0].message.content); // GPT 응답 파싱

      // DB에서 제품명과 일치하는 제품 이미지 경로를 찾아서 응답에 추가
      const sql = "SELECT product_name, product_image FROM products";
      // results는 db에 있는 제품명과 이미지 경로를 가져온 배열
      db.query(sql, (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database query error" });
        }

        const productAddImage = products.map((product) => {
          // find = 배열에서 조건을 만족하는 첫 번째 요소를 찾아 반환하는 함수
          // dbProduct는 db 테이블에 존재하는 데이터를 뜻함
          const matchProductname = results.find(
            // db 제품명과 product의 제품명이 일치하는 경우 요소를 반환
            // 일치하지 않으면 undefined를 반환
            (dbProduct) => dbProduct.product_name === product.productname
          );
          return {
            ...product, // ...은 배열 자체를 복사하는 스프레드 연산자이다.(객체나 배열을 복사하는 역할)
            // 일치하는 제품이 존재하는 경우 이미지 경로 사용
            // 없는 경우 기본 이미지 error.jpg 사용
            // "product_image:"을 통해 product 객체 안에 product_image란 속성을 추가한다.
            product_image: matchProductname
              ? matchProductname.product_image
              : "error.jpg",
          };
        });

        res.json(productAddImage); // 이미지 경로를 추가한 제품 목록 반환
        console.log(productAddImage);
      });
    } else {
      // 답변이 없다면 500번 에러를 반환
      res.status(500).json({ error: "No choices found response" });
    }
  } catch (error) {
    // api 호출 오류 발생시 실행
    console.error("Error API", error);
    // 오류 메세지 세부 사항 확인
    res.status(500).json({ error: "Failed recommend", details: error.message });
  }
});

// sendFile을 통해 index.html 파일을 전송
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "build", "index.html"));
});

// 서버 포트를 통해 사용자의 요청을 받는 작업
app.listen(port, () => {
  console.log("Server On Port:", port); // 서버가 정상적으로 실행 됐을 때 출력
});
