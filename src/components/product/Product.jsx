import React, {useState, useRef} from 'react';
import Star from '../sideoption/Star.jsx'
import Dropdown from '../sideoption/Dropdown.jsx';

export default function Product() {
    const [categoryValue, setCategoryValue] = useState("");
    const [view, setView] = useState(false);
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
        <div className='Product__default__screen'>
            <input 
            type="text" 
            placeholder='추천 받고 싶은 상품의 카테고리를 입력해주세요!'
            value={categoryValue}
            onChange={saveCategory}
            />
        </div>
        <button onClick={handleScroll}>
            검색 세부 정보 입력 페이지로 이동하기
        </button>

        <div className='Error__container'>{error}</div>
        <div ref={scrollRef}>
        <div className='Star__container'>별점 <Star /></div>
        <div className='Dropdown__container'>
            <ul onClick={() => {setView(!view)}}> {/*click시 view 상태 반대로*/}
	        추천 품목 출력 개수
	        {view ? '▲' : '▼'} 
	        {view && <Dropdown />} {/* true일 때만 Dropdown 컴포넌트 렌더링 */}
            </ul>
        </div>
        </div>
        <div>...</div> {/*성능 추가하기*/}
        <button onClick={handleResult}>추천 받기</button>
        </>
    )
}

//!! CSS 진행 - 별점, 카테고리 박스, 버튼, 드롭다운
//!! Framer motion 적용
//!! Header, Footer 수정
//!! Result page 제작 및 페이지 이동 handle 함수 완성
