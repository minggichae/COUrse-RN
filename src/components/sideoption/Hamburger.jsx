import React, {useState, useEffect} from "react";
import HamburgerMenu from "react-hamburger-menu";
import { useAnimate, stagger, motion } from "framer-motion";

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverVar, setHoverVar] = useState(null); 
    const [scope, animate] = useAnimate();
    const items = [
        "패션의류/잡화", 
        "뷰티",
        "식품", 
        "주방용품",
        "생활용품", 
        "가전디지털", 
        "스포츠/레저", 
        "도서"];

    const descriptions = [
        "여성/남성",
        "스킨케어/클렌징/필링, 메이크업/향수/네일",
        "과일, 채소, 냉장, 냉동, 축산, 계란, 수산물, 건어물, 음료",
        "주방가전, 주방조리도구, 그릇, 수저, 컵, 텀블러",
        "헤어, 바디, 세안, 구강, 면도, 청소, 주방, 세탁세제, 욕실용품, 탈취, 방향, 살충, 건강, 의료용품",
        "TV, 냉장고, 세탁기, 건조기, 청소기, 관리기, 데스크탑, 노트북, 테블릿, PC, 휴대폰",
        "수영, 수상, 낚시, 골프, 자전거, 헬스, 캠핑, 등산, 아웃도어",
        "소설, 에세이, 시, 과학, 공학, 역사, 예술"
      ];

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const staggerList = stagger(0.1, { startDelay: 0.25 });

    useEffect(() => {
        animate(
          "ul",
          {
            width: isOpen ? 150 : 0,
            height: isOpen ? 200 : 0,
            opacity: isOpen ? 1 : 0
          },
          {
            type: "spring",
            bounce: 0,
            duration: 0.4
          }
        );
        animate(
          "li",
          isOpen
            ? { opacity: 1, scale: 1, x: 0 }
            : { opacity: 0, scale: 0.3, x: -50 },
          {
            duration: 0.2,
            delay: isOpen ? staggerList : 0
          }
        );
      }, [isOpen]);
    

    return (
        <div className="Hamburger__container" ref={scope}>    
            <motion.button className="Hamburger__button" onClick={handleOpen} whileTap={{ scale: 0.85 }}>
              <HamburgerMenu
                isOpen={isOpen}
                height={25}
                strokeWidth={4}
                className="HamburgerMenu"
              />
              카테고리 종류
            </motion.button>

            <ul className="Hamburger__list">
                {items.map((item, index) => (
                <motion.li 
                key={index}
                onMouseEnter={() => setHoverVar(index)}
                onMouseLeave={() => setHoverVar(null)}
                >{item}
                {hoverVar === index && (
                    <motion.div
                    className="description__box"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    >
                    {descriptions[index]}   
                    </motion.div>   
                ) }
                </motion.li>
                ))}
            </ul>
        </div> 
      );      
}


