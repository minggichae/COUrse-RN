import React, { useEffect, useState } from "react";

export default function ProductResult({ categoryValue, result, setResult }) {
  const [response, setResponse] = useState(""); // 응답한 내용 저장하는 state

  // 버튼 클릭시 실행할 함수
  const CallGPT = async (e) => {
    // 카테고리 값이 없으면 return 실행
    if (!categoryValue) return;

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
          model: "gpt-3.5-turbo", // 사용할 AI 모델
          messages: [
            {
              role: "system", // 메세지 역할 system로 설정
              content: `내가 지금 구매하려는 상품을 추천 받고 싶은데 추천을 해줘. 상세한 내용은 다음과 같아.
              카테고리는 ${categoryValue}안에서 추천해줘.`, // 사용자가 입력한 메세지
              // 별점은 star인 것을 추천해줘. 그리고, 상품 추천을 할 때는 selcet개수만 띄워줘.
            },
          ],
          temperature: 0, // 모델의 출력 다양성
          max_tokens: 200, // 응답받을 메세지 최대 토큰(단어) 수 설정
        }),
      });

      // API 요청 후 응답 처리
      const data = await res.json();
      // 내용이 있는 경우 응답 처리 실행
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
  };

  useEffect(() => {
    if (result) {
      CallGPT();
      //   setResult(false);
    }
  }, [result, categoryValue]);

  return (
    <div className="gpt-res">
      <h2>추천된 상품 목록</h2>
      {response && <p>{response}</p>}
    </div>
  );
}

/*
해야할 것 체크 리스트
0. 
- 프롬프트 엔지니어링 학습
- LangChain 학습
- RAG 학습

1. 카테고리 입력 받은 변수 가져오기 v
2. 별점과 상품 추천 개수 변수 가져오기 - 지훈이 파트에서 변수 설정에 따라 가져오는 방식이 틀려짐
3. 프롬프트에 카테고리, 별점, 상품 추천 개수 전달하기 (카테고리 완료) - 별점과 상품 개수는 월요일 회의 후 결정
(
  전달하면서 프롬프트에게 질문하는 방식 지정해두기 -> 출력 형식 지정 v
  e.g. 카테고리 변수 category, 별점 변수 star, 상품 추천 select라고 가정
  내가 지금 구매하려는 상품을 추천 받고 싶은데 추천을 해줘. 상세한 내용은 다음과 같아.
  카테고리는 category안에서 추천해주고, 별점은 star인 것을 추천해줘. 그리고, 상품 추천을 할 때는 selcet개수만 띄워줘.
)
4. 더미데이터 만들기
5. 만들어진 더미데이터를 기반으로 상품 추천

*/
