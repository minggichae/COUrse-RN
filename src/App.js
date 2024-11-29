import React, {useRef, useState} from "react";
import Header from "./components/header/Header";
import Product from "./components/product/Product";
import Footer from "./components/footer/Footer";
import Layout from "./components/layout/Layout";
import Explanation from "./components/explanation/Explanation";

export default function App() {
  const scrollRef = useRef(null); {/*DOM 요소에 대한 참조 생성*/}
  const [showInfo, setShowInfo] = useState(false);

  return (
    <> 
      <Header />
      <Layout>
      <Explanation 
        scrollRef = {scrollRef}
        showInfo = {showInfo}
        setShowInfo = {setShowInfo}
      />
      <Product 
        scrollRef = {scrollRef} 
        showInfo = {showInfo}
      />
      </Layout>     
      <Footer />
    </>
  );
}
