import React, {useRef} from "react";
import Header from "./components/header/Header";
import Product from "./components/product/Product";
import Footer from "./components/footer/Footer";
import Layout from "./components/layout/Layout";
import Explanation from "./components/explanation/Explanation";

export default function App() {
  const scrollRef = useRef(null); {/*DOM 요소에 대한 참조 생성*/}

  return (
    <> 
      <Header />
      <Layout>
      <Explanation scrollRef = {scrollRef}/>
      <Product scrollRef = {scrollRef} /> 
      </Layout>     
      <Footer />
    </>
  );
}
