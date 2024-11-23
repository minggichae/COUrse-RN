import React, { useState, useRef } from "react";
import Star from "../sideoption/Star.jsx";
import Dropdown from "../sideoption/Dropdown.jsx";
import Layout from "../layout/Layout.jsx";
import ProductResult from "../productresult/ProductResult.jsx";
import { ReactTyped } from "react-typed";
import { motion, useAnimation } from 'framer-motion';
import Hamburger from "../sideoption/Hamburger.jsx";


export default function Product( {scrollRef, showInfo} ) {

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
      console.log("추천 품목 개수:", printCount);
      setPrintCountError("");
    } else {
      setPrintCountError("추천 품목 개수를 선택해주세요!");
    }

    if (categoryValue && starScore && printCount) {
      setResult(true);
    }
  };
  return (
    <>
    {showInfo && (
      <div ref={scrollRef}>

      <div className="Product__main">
        <div>
          <motion.div
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{duration:3}}
          >
          <p>추천 받고 싶은 제품의 카테고리를 입력해주세요!</p> 
          <input
            type="text"
            placeholder="카테고리 입력란"
            value={categoryValue}
            onChange={saveCategory}
            className="Category__container"
          />
          </motion.div>
        </div>
        <div className="Error__container">{categoryError}</div>
          <motion.div
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{duration:5}}
          >
          <Star  
            starScore = {starScore}
            setStarScore = {setStarScore}
          />
        </motion.div>
        <div className="Error__container">{starScoreError}</div>
          <motion.div
            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}
            transition={{duration:8}}
            style={{position: 'relative', zIndex: 5}}
          >
          <Dropdown 
            printCount = {printCount}
            setPrintCount = {setPrintCount}
          />
          </motion.div>
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
    )}   
    </>
  );
}

//TODO Front
//todo: 시점 처리(스크롤 뷰에 따라서 배경 색 변환 및 요소 생성, 시점에서 벗어나면 다시 사라지게 하기)
//todo: useref를 이용해서 추천받기 버튼을 누르면 상품 리스트로 시점 변환
//todo: css - background, text color, button color, dropdown
//todo: background에 있는 animation(li) 정보 기입란이랑 추천 리스트에도 추가 해야함.

//TODO back
//todo: 데이터 서버로 넣기(Node로 서버 생성, DB 테이블 생성)
//todo: request, response 코드 작성(프론트한테 데이터 넘겨줘야 함)

//TODO AI
//todo: ??

//TODO 서류 
//todo: 캡스톤 디자인 대회 신청할건지?
//todo: 논문 초안 작성
//todo: 발표 준비 및 PPT 완성(FRONT, BACK, AI 알고리즘 정리 필요)
//todo: 논문 피드백

//TODO Feedback
//todo: UI/UX 검토
//todo: 기능 테스트 및 수정 or 개선


