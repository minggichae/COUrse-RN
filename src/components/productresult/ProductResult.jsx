import React, { useEffect, useState } from "react";

export default function ProductResult({ categoryValue, result }) {
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
          model: "gpt-3.5-turbo", // 사용할 AI 모델
          messages: [
            // 메세지 role과 content를 여러개 작성이 가능함.
            // 여러개를 작성하여 내가 원하는 형식의 ai로 커스텀 가능
            // 답변의 개수를 n이라는 파라미터를 사용해 원하는 개수로 조절이 가능
            {
              role: "system", // 메세지 역할 system로 설정
              content: `당신은 상품을 추천해주는 전문가이다. 상품의 카테고리를 입력받으면 그 카테고리에 알맞는 제품의 상품 정보를 생성하여 출력해라.
              입력받은 카테고리는 ${categoryValue}이고, 상품을 추천할 때 그 상품의 별점도 가져와라. 예를 들면 4.5/5 이런식으로 가져와라.
              그리고, 카테고리에 관련된 제품만 추천해주고 다른 제품은 추천하지 마라. 예를 들면 채소를 입력하면 상추, 깻잎 이런류만 알려주고 채소 다지는 기계 이런 답변은 하지마라.`,
              // content: `내가 지금 구매하려는 상품을 추천 받고 싶은데 추천을 해줘. 상세한 내용은 다음과 같아.
              // 카테고리는 ${categoryValue}안에서 추천해줘. 내가 정해둔 길이에 짤리지 않게 제품에 대한 설명을 할 때 간략하게 해줘.`, // 사용자가 입력한 메세지
              // 별점은 star인 것을 추천해줘. 그리고, 상품 추천을 할 때는 selcet개수만 띄워줘.
            },
            {
              role: "user",
              content: categoryValue,
            },
            {
              role: "assistant",
              content:
                "제품명, 가격, 별점 이 세가지 외의 답변은 하지마. 가격은 한국 환율을 기준으로 잡아줘. 별점은 3.5점 이상으로만 가져와줘. 제품 추천 수는 10개로 고정해서 추천해줘.",
              // 별점과 제품 추천 수는 변수로 바꿀 예정
            },
            // {
            //   role: "user",
            //   content: "라면",
            // },
            // {
            //   role: "assistant",
            //   content:
            //     "1. 제품명: 신라면 별점: 5/5\n 2. 제품명: 진라면 순한맛 별점: 4.8/5\n 3. 제품명: 삼양라면 별점: 4.7/5\n 4. 제품명: 너구리 별점: 4.9/5\n 5. 제품명: 불닭볶음면 별점: 4.8/5\n 6. 제품명: 짜파게티 별점: 4.6/5\n 7. 제품명: 안성탕면 별점: 4.7/5\n 8. 제품명: 왕뚜껑 별점: 4.5/5\n 9. 제품명: 육개장 사발면 별점: 4.6/5\n 10. 제품명: 비빔면 별점: 4.7/5",
            // },
          ],
          temperature: 0, // 모델의 출력 다양성
          max_tokens: 1000, // 응답받을 메세지 최대 토큰(단어) 수 설정
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
    <div className="test">
      <h1>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</h1>
      <h1>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</h1>
      <h1>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</h1>
      <h1>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</h1>
      <h1>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</h1>
      <h1>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</h1>
      <h1>하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이하이</h1>
      <h1>헬로우</h1>
    </div>
    </>
  );
}

/*
해야할 것 체크 리스트

0.
- 프롬프트 엔지니어링 학습
- 파인튜닝 학습 및 실행

1. 카테고리 입력 받은 변수 가져오기 - 완료
2. 별점과 상품 추천 개수 변수 가져오기 - 지훈이 파트에서 변수 설정에 따라 가져오는 방식이 틀려짐
3. 프롬프트에 카테고리, 별점, 상품 추천 개수 전달하기 (카테고리 완료)
(
  전달하면서 프롬프트에게 질문하는 방식 지정해두기 -> 출력 형식 지정 v
  e.g. 카테고리 변수 category, 별점 변수 star, 상품 추천 select라고 가정
  내가 지금 구매하려는 상품을 추천 받고 싶은데 추천을 해줘. 상세한 내용은 다음과 같아.
  카테고리는 category안에서 추천해주고, 별점은 star인 것을 추천해줘. 그리고, 상품 추천을 할 때는 selcet개수만 띄워줘.
)
4. 더미데이터 만들기 - 현재 진행 중
5. 만들어진 더미데이터를 기반으로 상품 추천 - 현재 진행 중에 있으나 파인 튜닝을 시작하는 과정에 있어 오류가 발생하여 진행을 못하는 상황.
6. 더미데이터에 이미지 삽입이 가능한지 체크 -> 불가
- 파인 튜닝을 할 때 GPT모델은 텍스트 데이터만 처리할 수 있어 이미지와 같은 비텍스트 데이터는 지원을 하지 않음.

대분류 소분류 나눠서 데이터 셋 제작 -> 카테고리 검색 시 유용한 정보

파일 건네주기 -> 막힘
학습 시간이 걸리든 별다른 문제 -> X
1차적 이미지 삽입을 해야함. -> 추가 안하고 임의로 테스트로 해서 파인튜닝해서 성공했다 -> 이미지 오류 뜨는 경우 귀찮아지니 미리 데이터 셋을 제대로 만들자.
카테고리 별로 대량의 데이터가 필요함. (40개는 적다.)
*/
