import React from 'react';
import Star from '../star/Star'

export default function Product() {
    const handleScroll = () => {
        //데이터 저장 후 세부 정보 기입란으로 스크롤하는 로직 넣기
    }
    const handleResult = () => {
        //결과 화면으로 이동하는 로직 추가
    }
    return (
        <><div className='Product__default__screen'>
            <input type="text" placeholder='추천 받고 싶은 상품의 카테고리를 입력해주세요!'/>
        </div>
        <button onClick={handleScroll}>
            검색 세부 정보 입력 페이지로 이동하기
        </button>
        {/*페이지 이동 로직 필요, 대신 렌더링 하는 것처럼은 X */}

        
        <div>별점 <Star /></div>{/*별점 로직 구현하기*/}
        <div><input/>추천 아이템 개수</div> {/*dropdown 데이터로 선택할 수 있으면 좋겠음*/}
        <div>...</div>
        <button onClick={handleResult}>추천 받기</button>
        </>
    )
}