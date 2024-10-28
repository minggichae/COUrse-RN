import { useState } from 'react';

export default function Dropdown({setPrintCount}) {
    const [view, setView] = useState(false);
    const [recommendItem, setRecommendItem] = useState("추천 품목 개수 선택")
   

    const handlePrintcount = (item, num) => {
      setRecommendItem(item);
      setPrintCount(num); 
      setView(false); 
      console.log(num);
    }
    
    return (
      <>
      <div className='Dropdown__container'>
          <div className="Dropdown" onClick={() => {setView(!view)}}> {/*click시 view 상태 반대로*/}
	        {recommendItem}
	        {view ? ' ▲' : ' ▼'}       
            <div className={`Dropdown__detail ${view ? 'show' : ''}`}>      
              <div onClick={() => handlePrintcount("10개 추천 받기", 10)}>10개</div>
                <div onClick={() => handlePrintcount("20개 추천 받기", 20)}>20개</div>
                <div onClick={() => handlePrintcount("30개 추천 받기", 30)}>30개</div>
                <div onClick={() => handlePrintcount("40개 추천 받기", 40)}>40개</div>
            </div> {/* true일 때만 Dropdown 컴포넌트 렌더링 */}
          </div>
      </div> 
      </>
    );
  }


  
  
