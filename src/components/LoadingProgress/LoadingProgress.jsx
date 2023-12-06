import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import React, { useState } from "react";
import { CircularProgress } from "@mui/material";

const LoadingProgress = ({ isLoading }) => {
  return (
    <div>
      <Modal
        open={isLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400  p-4">
          <CircularProgress />
        </div>
      </Modal>
    </div>
  );
};

export default LoadingProgress;
