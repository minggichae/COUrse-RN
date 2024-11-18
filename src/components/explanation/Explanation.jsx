import React, {useState, useRef, useEffect} from 'react';
import { ReactTyped } from 'react-typed';
import { motion, useAnimation } from "framer-motion";

export default function Explanation( {scrollRef, setShowInfo, showInfo} ) {

    const [showSecondTyped, setShowSecondTyped] = useState(false);
    const [showButton, setShowButton] = useState(false);


    useEffect(() => {
        if (showInfo && scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        } 
      }, [showInfo, scrollRef]);
      //current: DOM 요소의 값을 저장할 수 있는 프로퍼티 
      //scrollIntoView: 해당 요소로 이동, current 프로퍼티에 저장된 DOM 요소의
      //객체값으로 view 이동 

    return (
        <>
        <div className="Explain__container">
            <p className="Basic__explanation">        
            <ReactTyped
                strings={['쿠팡 구매, 가장 빠른 지름길 코스(COUrse)를 이용하세요!']}
                typeSpeed={80}
                loop={false}
                onComplete={() => setShowSecondTyped(true)}
            />           
            </p>
        </div>
     
            {showSecondTyped && (
                <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                onAnimationComplete={()=> setShowButton(true)}
                >
                <div className="Explain__container" >
                <p className="Usage__explanation">카테고리를 입력하고, 최소 별점 지정을 통해 필터링 해주세요.</p>
                <p className="Usage__explanation">예를 들어 3점을 눌렀다면, 별점이 3점 이상인 제품들을 볼 수 있어요.</p>
                <p className="Usage__explanation">마지막으로 추천 받고 싶은 아이템의 개수를 선택하고 버튼을 누르시면 완료입니다!</p>
                <p className="Usage__explanation">이용하고 싶다면, 아래의 버튼을 눌러주세요.</p>
                </div>
                </motion.div>
            
            )}
       
        
        {showButton && (
            <div className="Explain__container">
            <motion.div
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
            >
            <button className="Custom-btn Scroll__button" onClick={()=>setShowInfo(true)}>
                상품 추천 받으러 가기
            </button>
            </motion.div>
            </div>
        )}     
        </> 
    )
  }

