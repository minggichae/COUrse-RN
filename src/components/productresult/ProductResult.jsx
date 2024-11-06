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
          model: "ft:gpt-4o-mini-2024-07-18:personal::AQZFej9V", // 사용할 AI 모델
          messages: [
            // 메세지 role과 content를 여러개 작성이 가능함.
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
              content: `제품명, 가격, 별점 이 세가지 외의 답변은 하지마. 가격은 한국 환율을 기준으로 잡아줘. 제품의 추천 개수는 ${printCount}를 절대 넘어가서는 안돼.`,
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
    <>
      <div className="Response__container">
        <h2>추천 상품 목록</h2>
        {loading ? (
          <p>상품 추천 중...</p>
        ) : (
          <div className="Product__Result__Container">
            {response &&
              response.split("\n").map((product, index) => {
                console.log(`${index}번:`, product);
                const [name, price, rating] = product.split(", ");
                /*
                name, price, rating에 각 제품명, 가격, 별점이 들어감 
                product.split(", ")을 통해 데이터를 가져와서 product 변수에 넣은 문장을 ","으로 구분후 저장
                e.g. "제품명: 감", "가격: 3,500원", "별점: 5"를 ,을 기준으로 나눈 다음
                name = 제품명: 감, price = 가격: 3,500원, rating = 별점: 5를 저장
                */
                console.log(name);
                console.log(price);
                console.log(rating);
                console.log(printCount);
                return (
                  <div className="Product__Result" key={index}>
                    <p>{name}</p>
                    <p>{price}</p>
                    <p>{rating}</p>
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
    </>
  );
}
