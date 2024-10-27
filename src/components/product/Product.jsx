import React, {useState, useRef} from 'react';
import Star from '../sideoption/Star.jsx'
import Dropdown from '../sideoption/Dropdown.jsx';
import Layout from "../layout/Layout.jsx";

export default function Product() {
    const [categoryValue, setCategoryValue] = useState("");
    const [error, setError] = useState("");
    const scrollRef = useRef(null); {/*DOM 요소에 대한 참조 생성*/}


    const saveCategory = (e) => { {/*카테고리 value 값 가져오기*/}
        setCategoryValue(e.target.value);
        console.log(e.target.value);
    }
 

    const handleScroll = () => {
        if(categoryValue) {
        console.log("전달된 카테고리 값:", categoryValue);
        setError("");
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
                {/*
                    .current: DOM 요소의 값을 저장할 수 있는 프로퍼티 
                    scrollIntoView: 해당 요소로 이동, current 프로퍼티에 저장된 DOM 요소의
                    객체값으로 view 이동
                */}
        }
        //데이터 저장 후 세부 정보 기입란으로 스크롤하는 로직 넣기
        } else {
            setError("카테고리를 입력해주세요!");
        }
    };

    const handleResult = () => {
        //결과 화면으로 이동하는 로직 추가
    } 
    return (
        <>
        <div className='Product__main'>
        <div>
            <input 
            type="text" 
            placeholder='추천 받고 싶은 상품의 카테고리를 입력해주세요!'
            value={categoryValue}
            onChange={saveCategory}
            className='Category__container'
            />
        </div>
        <button className="Custom-btn Scroll__button" onClick={handleScroll}>
            검색 세부 정보 입력 페이지로 이동하기
        </button>
        <div className='Error__container'>{error}</div>
        <div ref={scrollRef}>
        <Star />
        <Dropdown />
        </div>
        {/* <div>추가 할 성능 고려하기</div>*/}
        <button className="Custom-btn Scroll__button" onClick={handleResult}>추천 받기</button>
        </div>
        </>     
    )
}

//!! Framer motion 적용 - 스크롤이 내려감에 따라 기능들이 하나씩 나오게 구조 개편 예정
//!! 기능들이 나오면서 background color도 변화 주기
//!! Result page 제작 및 페이지 이동 handle 함수 완성 - 전반적인 페이지 구조에 대한 재회의 요망

//TODO : dropdown css 처리 
//TODO : 전체적인 색상 수정
//TODO : 전체 뷰 크기 수정
//TODO : 설명글 추가 및 css 수정 요망
//TODO : background animation 끝까지 올라오게 만들기
