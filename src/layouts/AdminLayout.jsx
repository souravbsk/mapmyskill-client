import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Shared/AdminHeader/AdminHeader";
import Sidebar from "../Shared/Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-6">
      <div className="">
        <Sidebar></Sidebar>
      </div>
      <div className="col-span-5">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminLayout;
