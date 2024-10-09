import { useState } from 'react';

export default function Dropdown() {
    const [view, setView] = useState(false);
    const [recommendItem, setRecommendItem] = useState("추천 품목 개수 선택")
    const handlePrintcount = (item) => {
      setRecommendItem(item);
      setView(false); 
    }
    
    return (
      <>
      <div className='Dropdown__container'>
          <div className="Dropdown" onClick={() => {setView(!view)}}> {/*click시 view 상태 반대로*/}
	        {recommendItem}
	        {view ? ' ▲' : ' ▼'} 
          {view &&          
            <div className="Dropdown__detail">      
              <div onClick={() => handlePrintcount("10개 추천 받기")}>10개</div>
                <div onClick={() =>handlePrintcount("20개 추천 받기")}>20개</div>
                <div onClick={() =>handlePrintcount("30개 추천 받기")}>30개</div>
                <div onClick={() =>handlePrintcount("40개 추천 받기")}>40개</div>
            </div>} {/* true일 때만 Dropdown 컴포넌트 렌더링 */}
          </div>
      </div>
        
      </>
    );
  }


  
  
