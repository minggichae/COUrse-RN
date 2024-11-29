import React, { useEffect, useState } from "react";
import ProductUrls from "./ProductUrls";
import { motion, transform } from "framer-motion";

export default function ProductResult({
  categoryValue,
  result,
  result2,
  starScore,
  printCount,
  showResult,
  scrollRef,
}) {
  const [response, setResponse] = useState(""); // 응답한 내용 저장하는 state
  const [loading, setLoading] = useState(false); // 추천 상품이 나오기 전 로딩중이라는 문구를 띄우기 위한 state

  const ErrorImageHandler = (e) => {
    e.target.onerror = null; // 무한 루프 방지
    e.target.src = "http://localhost:8080/image/error.jpg";
  };
  // 버튼 클릭시 실행할 함수
  const CallGPT = async (e) => {
    setLoading(true); // 로딩 상태를 true로 설정

    try {
      // /api/recommend 엔드 포인트로 서버와 통신
      const res = await fetch("http://localhost:8080/api/recommend", {
        method: "POST", // 엔드 포인트로 데이터를 전송하겠다.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryValue, starScore, printCount }), // 서버에 데이터 전송
      });

      // API 요청 후 응답 처리
      const data = await res.json();
      console.log(data);

      // 내용이 있는 경우 응답 처리 실행
      if (data) {
        // 응답이 올바른 경우 처리
        setResponse(data);
      } else {
        setResponse("추천 데이터가 없습니다.");
      }
      // 에러 구문 처리
    } catch (error) {
      console.error("Error:", error);
      setResponse(`에러 발생: ${error.message}`);
    }
    setLoading(false); // 로딩 상태 종료
  };

  // 초과된 배열 필터링 함수
  const filterProducts = (products, printCount) => {
    if (products.length > printCount) {
      return products.slice(0, printCount);
    }
    return products;
  };

  useEffect(() => {
    CallGPT();
  }, [result, result2]);

  useEffect(() => {
    if (showResult && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showResult, scrollRef]);

  return (
    <>
      <div ref={scrollRef}>
        <div className="Response__container">
          <p>아래의 상품을 추천 드릴게요! 클릭하면 구매 사이트로 이동해요.</p>
          {loading ? (
            <div className="Loading__Spinner"></div>
          ) : (
            <div className="Product__Result__Container">
              {response &&
                (() => {
                  try {
                    const products = filterProducts(response, printCount);
                    console.log(products);

                    // 파싱된 데이터가 배열 형태일 경우 처리
                    return products.map((product, index) => {
                      // ProductUrls.js에서 제품명에 해당되는 변수 가져오기
                      const productUrl = ProductUrls[product.productname];
                      console.log(productUrl);

                      // div 영역 클릭 시 호출되는 함수(링크 바로가기)
                      const OpenUrl = () => {
                        if (productUrl) {
                          // productUrl이 있는 경우 링크 바로가기
                          window.open(`https://url.kr/${productUrl}`);
                        } else {
                          // productUrl이 없는 경우 에러 처리
                          alert("쿠팡 api 사용시 작동합니다.");
                        }
                      };
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="Product__Result"
                          key={index}
                          onClick={OpenUrl} // div 영역 클릭시 링크 바로가기 처리
                        >
                          <img
                            src={`http://localhost:8080/image/${product.product_image}`}
                            alt={product.productname}
                            onError={ErrorImageHandler}
                            width={100}
                            height={100}
                          />
                          <p>제품명: {product.productname}</p>
                          <p>가격: {product.price.toLocaleString()}원</p>
                          <p>별점: {product.starrating}/5</p>
                        </motion.div>
                      );
                    });
                  } catch (err) {
                    return (
                      <p>추천 데이터를 처리하는 중 오류가 발생했습니다.</p>
                    );
                  }
                })()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
