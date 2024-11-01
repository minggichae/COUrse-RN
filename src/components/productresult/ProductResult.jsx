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
          model: "ft:gpt-4o-mini-2024-07-18:personal::AOKRehme", // 사용할 AI 모델
          messages: [
            // 메세지 role과 content를 여러개 작성이 가능함.
            // 여러개를 작성하여 내가 원하는 형식의 ai로 커스텀 가능
            // 답변의 개수를 n이라는 파라미터를 사용해 원하는 개수로 조절이 가능
            {
              role: "system", // 메세지 역할 system로 설정
              content: `당신은 상품을 추천해주는 전문가이다. 상품의 카테고리를 입력받으면 그 카테고리에 알맞는 제품의 상품 정보를 생성하여 출력해라.
              입력받은 카테고리는 ${categoryValue}이고, 별점은 ${starScore}점 이상, 제품 추천 수는 ${printCount}개로 고정해라.
              별점을 가져와서 나타낼땐 4.5/5 이런식으로 나타내라.
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
    <div className="GPT-Response">
      <h2>추천 상품 목록</h2>
      {/*줄바꿈을 위해 GPT를 사용하였음.*/}
      {loading ? (
        <p>상품 추천 중...</p>
      ) : (
        response &&
        response.split("\n").map((line, index) => <p key={index}>{line}</p>)
      )}
    </div>
  );
}

/*
해야할 것 체크 리스트

0.
- 프롬프트 엔지니어링 학습
- 파인튜닝 학습 및 실행

1. 카테고리 입력 받은 변수 가져오기 - 완료
2. 별점과 상품 추천 개수 변수 가져오기 - 완료
3. 프롬프트에 카테고리, 별점, 상품 추천 개수 전달하기 - 완료
4. 더미데이터 만들기 - 현재 진행 중
5. 만들어진 더미데이터를 기반으로 상품 추천 - 현재 진행 중(학습되지 않은 데이터도 나오는 문제 발견)
6. 더미데이터에 이미지 삽입이 가능한지 체크 
- 파인 튜닝을 할 때 GPT모델은 텍스트 데이터만 처리할 수 있어 이미지와 같은 비텍스트 데이터는 지원을 하지 않음.
- 4o의 경우 가능한거 같음 (4o-mini의 경우 되는지도 확인하기 -> 1차적으로 되는걸로 확인이 됨.(기사 확인을 하였음))

대분류 소분류 나눠서 데이터 셋 제작 -> 카테고리 검색 시 유용한 정보

파일 건네주기 -> 해결완료

1차적 이미지 삽입을 해야함. -> 추가 안하고 임의로 테스트로 해서 파인튜닝해서 성공했다 -> 이미지 오류 뜨는 경우 귀찮아지니 미리 데이터 셋을 제대로 만들자.
카테고리 별로 대량의 데이터가 필요함. (40개는 적다.)
*/
