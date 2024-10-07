import React, {useState, useRef} from 'react';
import Star from '../sideoption/Star.jsx'
import Dropdown from '../sideoption/Dropdown.jsx';

export default function Product() {
    const [categoryValue, setCategoryValue] = useState("");
    const [view, setView] = useState(false);
    const scrollRef = useRef(null); 

    const saveCategory = (e) => { {/*카테고리 value 값 가져오기*/}
        setCategoryValue(e.target.value);
        console.log(e.target.value);
    }
 

    const handleScroll = () => {
        // Scroll to the detail information section
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // const handleScroll = () => {
    //     //데이터 저장 후 세부 정보 기입란으로 스크롤하는 로직 넣기
    // }
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
        {/*페이지 스크롤 로직 필요, 대신 렌더링 하는 것처럼은 X */}

        <div ref={scrollRef} className='Detail__section'>
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