import React from "react";
import { Box } from "@mui/material";

const RightSideModal = ({ isShowModal, children }) => {
  return <>{isShowModal ? <div className="sidenav">{children}</div> : ""}</>;
};

export default RightSideModal;
