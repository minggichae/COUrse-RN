import React, { useEffect, useState } from "react";

export default function ProductResult({
  categoryValue,
  result,
  starScore,
  printCount,
}) {
  const [response, setResponse] = useState(""); // 응답한 내용 저장하는 state
  const [loading, setLoading] = useState(false); // 추천 상품이 나오기 전 로딩중이라는 문구를 띄우기 위한 state

  // 버튼 클릭시 실행할 함수
  const CallGPT = async (e) => {
    // 카테고리 값이 없으면 return 실행
    if (!categoryValue) return;

    setLoading(true); // 로딩 상태를 true로 설정

    try {
      // .env에 저장한 API Key 불러오기
      const apiKey = process.env.REACT_APP_GPT_API_KEY;
      // OpenAI API 엔드포인트 주소를 변수로 저장
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        // API 요청에 사용할 옵션 정의
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "ft:gpt-4o-mini-2024-07-18:personal::AQDLvkFG", // 사용할 AI 모델
          messages: [
            // 메세지 role과 content를 여러개 작성이 가능함.
            // 여러개를 작성하여 내가 원하는 형식의 ai로 커스텀 가능
            // 답변의 개수를 n이라는 파라미터를 사용해 원하는 개수로 조절이 가능
            {
              role: "system", // 메세지 역할 system로 설정
              content: `당신은 상품을 추천해주는 전문가이다. 상품의 카테고리를 입력받으면 그 카테고리에 알맞는 제품의 상품 정보를 생성하여 출력해라.
              입력받은 카테고리는 ${categoryValue}이고, 별점은 ${starScore}점 이상, 제품 추천 수는 ${printCount}개로 고정해라.
              별점을 가져와서 나타낼땐 4/5 이런식으로 나타내라.
              그리고, 카테고리에 관련된 제품만 추천해주고 다른 제품은 추천하지 마라. 예를 들면 채소를 입력하면 상추, 깻잎 이런류만 알려주고 채소 다지는 기계 이런 답변은 하지마라.`,
            },
            {
              role: "user",
              content: categoryValue,
            },
            {
              role: "assistant",
              content: `제품명, 가격, 별점 이 세가지 외의 답변은 하지마. 가격은 한국 환율을 기준으로 잡아줘.`,
            },
          ],
          temperature: 0, // 모델의 출력 다양성
          max_tokens: 3000, // 응답받을 메세지 최대 토큰(단어) 수 설정
        }),
      });

      // API 요청 후 응답 처리
      const data = await res.json();
      // 내용이 있는 경우 응답 처리 실행
      // choices 배열안에 답변이 저장되는 방식
      if (data.choices && data.choices.length > 0) {
        setResponse(data.choices[0].message.content);
      }
      // 내용이 없을 경우 응답 처리 실행 X
      else {
        setResponse("응답을 받지 못함");
      }
      // 에러 구문 처리
    } catch (error) {
      console.error("Error:", error);
      setResponse(`에러 발생: ${error.message}`);
    }
    setLoading(false); // 로딩 상태 종료
  };

  useEffect(() => {
    if (result) {
      CallGPT();
    }
  }, [result]);

  return (
    <div className="GPT-Response-List">
      <h2 className="Product-List-Header">추천 상품 목록</h2>

      {loading ? (
        <p>상품 추천 중...</p>
      ) : (
        <div className="Product-Result-Container">
          {response &&
            response.split("\n").map((product, index) => {
              console.log(`${index}번:`, product);
              return (
                <div className="Product-Result" key={index}>
                  <p>{product}</p>
                </div>
              );
              /*
        response를 불러와서 결과값을 가져옴.
        .split("\n")을 통해 줄바꿈으로 배열을 나눔. => 여기서 split은 문자열을 나눌 때 사용되는 JavaScript의 문자열 메서드이다.
        그래서 문자열을 특정 구분으로 기준을 나누어 배열로 변환한다.
        지금과 같은 경우는 \n을 기준으로 문자열을 나눈다는 뜻이다.
        map 형식을 사용하여 product는 배열의 각 요소(상품 정보), index는 순서(유일한 식별 key)를 저장 후 출력
        e.g. index = 0, product = 첫번째 배열의 상품 내용

        css 작업을 할 때 
        Container는 상품 목록의 전체 영역 div
        Result는 상품 하나의 영역 div
        */
            })}
        </div>
      )}
    </div>
  );
}

/* 
체크 리스트

1. 대분류 -> 소분류 카테고리 만들기
2. 더미데이터 대량 제작
3. 이미지 api 테스트(부적절할 시 파일로 대체 -> Node 서버가 필요하며, 이미지 파일을 가져올 때 저작권도 알아봐야함.)
4. 재추천 기능 추가(단, 중복 제거도 필요)

jsonl 파일에 주석이 들어가면 학습을 못하는 오류로 인해 밑에다가 메모를 진행함.
대분류에 따른 소분류 내용 정리

앞에 적는 것은 대분류, -> 표시를 한 후 적는 것은 소분류
(소분류에는 쿠팡 기준으로 작성을 하였으며, 더 많은 종류가 있지만 일부 축약을 한 뒤 적은 상태이다.)

패션의류/잡화 -> 여성, 남성 (gpt가 종류를 추천해줄 때 여성과 남성의 차이점은 있으나 공용의 경우 차이점이 없어 제거) - 완료
뷰티 -> 스킨케어/클렌징/필링, 메이크업/향수/네일 - 완료
식품 -> 과일, 채소, 냉장, 냉동, 축산/계란 수산물/건어물, 음료 - 완료
주방용품 -> 주방가전/주방조리도구, 그릇/수저/컵/텀블러 - 완료
생활용품 -> 헤어/바디/세안/구강/면도, 청소/주방/세탁세제/욕실용품, 탈취/방향/살충/건강/의료용품 - 완료
가전디지털 -> TV/냉장고, 세탁기/건조기/청소기/관리기, 데스크탑/노트북, 테블릿 PC/휴대폰 - 데스크탑/노트북, 테블릿pc, 휴대폰 남음
스포츠/레저 -> 캠핑, 수영/수상, 골프, 자전거, 등산/아웃도어, 낚시, 헬스
도서/음반/DVD -> 유아/어린이, 소설/에세이/시, 과학/공학, 국어/외국어/사전, 역사, 예술
*/
