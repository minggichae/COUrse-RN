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
      <p>추천 품목 개수를 선택해주세요!</p>
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


  
  

//   import "./styles.css";
// import { useState, useEffect } from "react";
// import { useAnimate, stagger, motion } from "framer-motion";

// export default function App() {
//   const [open, setOpen] = useState(false);
//   const [scope, animate] = useAnimate();
//   const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

//   // the stagger effect
//   const staggerList = stagger(0.1, { startDelay: 0.25 });

//   // create the animations that will be applied
//   // whenever the open state is toggled

//   useEffect(() => {
//     animate(
//       "ul",
//       {
//         width: open ? 150 : 0,
//         height: open ? 200 : 0,
//         opacity: open ? 1 : 0
//       },
//       {
//         type: "spring",
//         bounce: 0,
//         duration: 0.4
//       }
//     );
//     animate(
//       "li",
//       open
//         ? { opacity: 1, scale: 1, x: 0 }
//         : { opacity: 0, scale: 0.3, x: -50 },
//       {
//         duration: 0.2,
//         delay: open ? staggerList : 0
//       }
//     );
//   }, [open]);

//   return (
//     <div className="App" ref={scope}>
//       <motion.button onClick={() => setOpen(!open)} whileTap={{ scale: 0.95 }}>
//         Click Me!
//       </motion.button>
//       <ul>
//         {items.map((item, index) => (
//           <motion.li key={index}>{item}</motion.li>
//         ))}
//       </ul>
//     </div>
//   );
// }
