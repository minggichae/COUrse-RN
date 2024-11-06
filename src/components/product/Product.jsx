import React, { useState, useRef } from "react";
import Star from "../sideoption/Star.jsx";
import Dropdown from "../sideoption/Dropdown.jsx";
import Layout from "../layout/Layout.jsx";
import ProductResult from "../productresult/ProductResult.jsx";
import { ReactTyped } from "react-typed";

export default function Product( {scrollRef} ) {

  const [categoryValue, setCategoryValue] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [starScoreError, setStarScoreError] = useState("");
  const [printCountError, setPrintCountError] = useState("");
  const [printCount, setPrintCount] = useState(null); //AI한테 전해줄 품목 개수를 담은 변수
  const [starScore, setStarScore] = useState(0); //AI한테 전해줄 별점 개수를 담은 변수
  const [result, setResult] = useState(""); // 추천 받기 버튼 활성화 여부 State


  const saveCategory = (e) => {
    setCategoryValue(e.target.value);
    console.log(e.target.value);
  };

  const handleResult = () => {
    if (categoryValue) {
      console.log("전달된 카테고리 값:", categoryValue);
      setCategoryError("");
    } else {
      setCategoryError("카테고리를 입력해주세요!");
    }

    if (starScore) {
      console.log("별점:", starScore);
      setStarScoreError("");
    } else {
      setStarScoreError("별점을 입력해주세요!");
    }

    if (printCount) {
      console.log("출력 개수:", printCount);
      setPrintCountError("");
    } else {
      setPrintCountError("출력 개수를 입력해주세요!");
    }
    
    if(categoryValue && starScore && printCount) {
      setResult(true);
    }
  };
  return (
    <>
      <div ref={scrollRef}>
      <div className="Product__main">
      <p>카테고리 예시: 
            <ReactTyped
                strings={['전자제품', ' 패션', ' 식품', '냉장', '냉동', '생활용품', '스포츠', '뷰티', '유아용품', '도서', 'DVD', '자동차 용품', '건강', '의료용품', '인테리어']}
                typeSpeed={120}
                backSpeed={50}
                loop={true}
            /> 
      </p> 
        <div>
          <input
            type="text"
            placeholder="추천 받고 싶은 상품의 카테고리를 입력해주세요!"
            value={categoryValue}
            onChange={saveCategory}
            className="Category__container"
          />
        </div>
        <div className="Error__container">{categoryError}</div>
          <Star  
            starScore = {starScore}
            setStarScore = {setStarScore}
          />
        <div className="Error__container">{starScoreError}</div>
          <Dropdown 
            printCount = {printCount}
            setPrintCount = {setPrintCount}
          />
        <div className="Error__container">{printCountError}</div>    
        <div> {/* <div>추가 할 성능 고려하기, 가격 높은 순 낮은 순 필터링</div>*/} </div> 
        <button className="Custom-btn Scroll__button" onClick={handleResult}>
          추천 받기
        </button> 
        {result && (
          <ProductResult
            categoryValue={categoryValue}
            result={result}
            starScore={starScore}
            printCount={printCount}
          />
        )}
      </div>
      </div>
    </>
  ); 
}
