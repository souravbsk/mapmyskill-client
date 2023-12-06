import React, { useState, useEffect } from "react";
import "./Users.css";
import instance from "../../../config/axios.config";
import UserTable from "../../../components/Table/UserTable";
import AddNewButton from "../../../components/AddNewButton/AddNewButton";
import UsersForm from "../../../components/UsersForm/UsersForm";
import Swal from "sweetalert2";

const Users = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  // --------------api integration state start----------------------
  const [userInfo, setUserInfo] = useState([]);
  // --------------api integration state start----------------------
  const [reFetch, setReFetch] = useState(true);
  const [UpdateUser,setUpdateUser] = useState({})

  const UserAdd = () => {
    setUpdateUser({})
    setShowModal(true);
    setIsAdd(true);
  };

  useEffect(() => {
    instance
      .get("api/users")
      .then((res) => {
        console.log("User data ....", res.data);
        setUserInfo(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [reFetch]);

  const handleDeleteUser = (id) => {
    console.log("delete", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You wan't be delete this User",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`api/users/${id}`).then((res) => {
          if (res.statusText == "OK") {
            Swal.fire("Deleted!", "Your Subject has been deleted.", "success");
            setReFetch(!reFetch);
          }
        });
      }
    });
  };

  const handleEditUser = (id) => {
    console.log("edit", id);

    instance.get(`api/users/${id}`).then((res) => {
      console.log(res);
      if (res.data) {
        setUpdateUser(res.data);
        setIsAdd(false);
        setShowModal(true);
      }
    });


  };

  return (
    <div id="common">
      <AddNewButton
        dynamicText="User"
        handleBtnFunction={UserAdd}
      ></AddNewButton>
      <div>
        <UserTable
          handleDeleteUser={handleDeleteUser}
          handleEditUser={handleEditUser}
          userLists={userInfo}
        >
          {" "}
        </UserTable>
      </div>
      <div>
        <UsersForm
          setShowModal={setShowModal}
          isShowModal={isShowModal}
          isAdd={isAdd}
          dynamicText="Users"
          setReFetch={setReFetch}
          reFetch={reFetch}
          UpdateUser={UpdateUser}
        ></UsersForm>
      </div>
    </div>
  );
};

export default Users;
