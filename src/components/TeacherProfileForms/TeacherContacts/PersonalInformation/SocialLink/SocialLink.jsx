import { Facebook } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React from "react";
import {
  FaFacebook,
  FaGooglePlusG,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
const SocialLink = () => {
  return (
    <div>
      <ul className="flex flex-col md:flex-row items-center  gap-6 mb-6 w-full">
        <li className="flex items-end w-full gap-2">
          <FaFacebook size={26}></FaFacebook>{" "}
          <TextField
            size="small"
            fullWidth
            label="Enter your facebook link"
            variant="standard"
            name="facebooklink"
          />
        </li>
        <li className="flex items-end w-full gap-2">
          <FaTwitter size={26}></FaTwitter>{" "}
          <TextField
            size="small"
            fullWidth
            label="Enter your twitter link"
            variant="standard"
            name="twitterlink"
          />
        </li>
      </ul>
      <ul className="flex items-center  flex-col md:flex-row gap-6 mb-6 w-full">
        <li className="flex items-end w-full gap-2">
          <FaLinkedin size={26}></FaLinkedin>{" "}
          <TextField
            size="small"
            fullWidth
            label="Enter your linkedin link"
            variant="standard"
            name="linkdinlink"
          />
        </li>
        <li className="flex items-end w-full gap-2">
          <FaGooglePlusG size={26}></FaGooglePlusG>{" "}
          <TextField
            size="small"
            fullWidth
            label="Enter your google+ link"
            variant="standard"
            name="googlelink"
          />
        </li>
      </ul>
    </div>
  );
};

export default SocialLink;
