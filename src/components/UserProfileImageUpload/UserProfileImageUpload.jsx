import { Avatar } from "@mui/material";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import useAuthChanged from "../../Hooks/useAuthChanged";
import UploadButton from "../UploadButton/UploadButton";
import img from "../../assets/images/profile.png";

const UserProfileImageUpload = ({ userDetails, refetch, setRefetch }) => {
  const { user } = useAuthChanged();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append("profileimage", file);
    formData.append("path", userDetails?.profileimagepath);

    axios
      .put(`http://localhost:8080/api/profile/upload/${user?.userid}`, formData)
      .then((response) => {
        console.log(response);
        if (response?.data?.data?.res?.affectedRows > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your document has been uploaded successfully",
            showConfirmButton: true,
            timer: 1500,
          });
          setRefetch(!refetch);
        }
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };

  return (
    <div className="flex items-center flex-col gap-5">
      <div>
        <Avatar
          alt={userDetails?.poc}
          src={
            userDetails?.profileimagepath
              ? `http://localhost:8080/${userDetails?.profileimagepath}`
              : img
          }
          sx={{ width: 80, height: 80 }}
        />
        <p className="mt-3">User Id: {userDetails.userid}</p>
      </div>
      <UploadButton
        btnText="profile picture"
        handleImageUpload={handleImageUpload}
      ></UploadButton>
    </div>
  );
};

export default UserProfileImageUpload;
