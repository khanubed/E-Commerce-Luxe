import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop/>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
};

export default MainLayout;
