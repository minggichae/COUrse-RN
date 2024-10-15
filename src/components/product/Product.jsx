import React, {useState, useRef} from 'react';
import Star from '../sideoption/Star.jsx'
import Dropdown from '../sideoption/Dropdown.jsx';

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
        <div class="background" > {/*background css*/}
            <ul class="background__block__event"> {/*backgroud css*/}
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
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
        <div>...</div> {/*성능 추가하기*/}
        <button onClick={handleResult}>추천 받기</button>
        </div>
        </div>
        </>     
    )
}

//!! Framer motion 적용
//!! Result page 제작 및 페이지 이동 handle 함수 완성
//!! 버튼 입력 시 저장된 변수 데이터를 받아줄 변수 생성

//TODO : dropdown css 처리 
//TODO : 추천 받기 버튼 css 처리
//TODO : layout(background) 코드 컴포넌트화
//TODO : 전체적인 색상 수정
