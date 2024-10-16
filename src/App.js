import React from "react";
import Header from "./components/header/Header";
import Product from "./components/product/Product";
import Footer from "./components/footer/Footer";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <>
      <Header />
      <Layout>
      <Product /> 
      </Layout>     
      <Footer />
    </>
  );
}
