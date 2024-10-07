import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ScrollAnimation() {
  const [scrollY, setScrollY] = useState(0); // 스크롤 위치 추적
  const controls = useAnimation(); // framer motion에서 제공하는 훅, 애니메이션 수동 제어
  
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollY > 100) {
      controls.start({
        opacity: 0,
        y: 0,
        transition: { duration: 0.5 }
      });
    } else {
      controls.start({
        opacity: 1,
        y: 50,
      });
    }
  }, [scrollY, controls]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "skyblue",
          margin: "100px auto",
        }}
      >
        안녕하세요. 쿠팡 물건 품목 추천 사이트입니다.
        현재 개발 구현 중에 있습니다. 조금만 기다려주세요!
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "skyblue",
          margin: "100px auto",
        }}
      >
        안녕하세요. 쿠팡 물건 품목 추천 사이트입니다.
        현재 개발 구현 중에 있습니다. 조금만 기다려주세요!
      </motion.div>

      
    </div>

    
  );
};
