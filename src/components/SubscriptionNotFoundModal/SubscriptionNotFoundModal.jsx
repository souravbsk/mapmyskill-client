import React from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "react-quill/dist/quill.snow.css";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import { useState } from "react";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import { GiFlexibleLamp } from 'react-icons/gi';

const SubscriptionNotFoundModal = () => {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,

};

return (
    <div>
        <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={true}
        >
            <Box sx={style}>
                <div className='h-36 w-full text-center '>
                    <h2>Zero Contacts</h2>
                    <p>You don't have any Connects to unlock this contact details. Please top up your account with connects and try again.</p>
                    <div>
                        <button>Cancel</button>
                        <button>Browse Subscriptions</button>
                    </div>
                </div>
            </Box>
        </Modal>
    </div>
);
};

export default SubscriptionNotFoundModal;