import React from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "../Shared/AuthHeader/AuthHeader";
import AuthFooter from "../Shared/AuthFooter/AuthFooter";
import DashboardLayout from "./DashboardLayout";
import Header from "../Shared/Header/Header";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

const DashboardLanding = () => {

  useEffect(()=>{
    Aos.init();
},[])

  return (
    <div>
      <Header></Header>
      <div className="mt-20">
        <Outlet>
        </Outlet>
      </div>
      <AuthFooter></AuthFooter>
    </div>
  );
};

export default DashboardLanding;
