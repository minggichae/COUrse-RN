import React, { useRef } from "react";

export default function Explanation({ scrollRef }) {
  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      {
        /*
                        .current: DOM 요소의 값을 저장할 수 있는 프로퍼티 
                        scrollIntoView: 해당 요소로 이동, current 프로퍼티에 저장된 DOM 요소의
                        객체값으로 view 이동
                    */
      }
    }
  };
  return (
    <>
      <div className="Explain__container">
        <p className="Basic__explanation">
          COUrse는 여러분들의 고민하는 시간을 줄여드립니다! 원하는 요구 사항을
          AI 기반으로 분석하고, 최적의 상품을 직관적으로 추천해드릴게요!
        </p>
      </div>
      <div className="Explain__container">
        <p className="Usage__explanation">
          카테고리를 입력하고, 최소 별점 지정을 통해 필터링 해주세요. 예를 들어
          3점을 눌렀다면, 별점이 3점 이상인 제품들을 볼 수 있어요. 마지막으로
          추천 받고 싶은 아이템의 개수를 선택하고 버튼을 누르시면 완료입니다! 그
          뒤의 일은 COUrse에게 맡기세요 :)
        </p>
      </div>

      <div className="Explain__container">
        <button className="Custom-btn Scroll__button" onClick={handleScroll}>
          정보 기입 하러 가기!
        </button>
      </div>
    </>
  );
}
