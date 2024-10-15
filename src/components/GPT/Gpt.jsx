import React, { useState } from "react";

export default function GPT({ categoryValue }) {
  const [response, setResponse] = useState(""); // 응답한 내용 저장하는 state
  const [loading, setLoading] = useState(false); // 대기 중인 것을 알려주는 변수

  // 버튼 클릭시 실행할 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 카테고리 값이 없다면 return 실행
    if (!categoryValue) return;

    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="gpt">
      <h1>GPT-3.5 Chat</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          {loading ? "보내는 중..." : "보내기"}
        </button>
      </form>
      <div className="gpt-res">
        <h2>답변</h2>
        <p>{response}</p>
      </div>
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
2. 별점과 상품 추천 개수 변수 가져오기
3. 프롬프트에 카테고리, 별점, 상품 추천 개수 전달하기 (카테고리 완료)
(
  전달하면서 프롬프트에게 질문하는 방식 지정해두기 -> 출력 형식 지정 v
  e.g. 카테고리 변수 category, 별점 변수 star, 상품 추천 select라고 가정
  내가 지금 구매하려는 상품을 추천 받고 싶은데 추천을 해줘. 상세한 내용은 다음과 같아.
  카테고리는 category안에서 추천해주고, 별점은 star인 것을 추천해줘. 그리고, 상품 추천을 할 때는 selcet개수만 띄워줘.
)

*/
