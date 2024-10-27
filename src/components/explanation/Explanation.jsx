import React from 'react';
import { ReactTyped,Typed } from "react-typed";

export default function Explanation() {
    return (
        <>
        <div className="Explain__container">
            <p className="Basic__explanation">        
            COUrse는 여러분들의 고민하는 시간을 줄여드립니다!
            원하는 요구 사항을 AI 기반으로 분석하고, 
            최적의 상품을 직관적으로 추천해드릴게요! 
            </p>
    
        </div>
        <div className="Explain__container">
            <p className="Usage__explanation">
            카테고리를 입력하고, 최소 별점 지정을 통해 필터링 해주세요. 
            예를 들어 3점을 눌렀다면, 별점이 3점 이상인 제품들을 볼 수 있어요. 
            마지막으로 추천 받고 싶은 아이템의 개수를 선택하고 버튼을 누르시면 완료입니다!
            그 뒤의 일은 COUrse에게 맡기세요 :)
            </p> 
        </div> 

        <div className="Explain__container">
            <p>카테고리 예시: 
                <ReactTyped
                    strings={['전자제품', ' 패션', ' 식품', '냉장', '냉동', '생활용품', '스포츠', '뷰티', '유아용품', '도서', 'DVD', '자동차 용품', '건강', '의료용품', '인테리어']}
                    typeSpeed={50}
                    backSpeed={50}
                    loop={true}
                /> 
            </p> 
        </div>    
        </> 
    )
}
//TODO: 전체 뷰 크기 수정
//TODO: 설명글 추가 및 css 수정 요망