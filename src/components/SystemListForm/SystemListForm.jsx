import React from "react";
import RightSideModal from "../../Shared/RightSideModal/RightSideModal";
import { Box, TextField } from "@mui/material";
import instance from "../../config/axios.config";
import Swal from "sweetalert2";

const SystemListForm = ({
  isShowListModal,
  isAdd,
  setReFetch,
  reFetch,
  editSystemList,
  setShowListModal,
  error,
  updateId,
}) => {
  const handleAddSystemList = (e) => {
    e.preventDefault();
    const listName = e.target.listName.value;
    const newSystemList = {
      listName,
    };
    instance.post("api/systemlist", newSystemList).then((res) => {
      if (res.statusText == "OK") {
        setReFetch(!reFetch);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "System List Update",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        setShowListModal(false);
      }
    });
  };

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    const listName = e.target.listName.value;
    const newSystemList = {
      listName,
    };
    instance
      .put(`api/systemlist/${editSystemList.listId}`, newSystemList)
      .then((res) => {
        if (res.statusText == "OK") {
          setReFetch(!reFetch);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "System List Update",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
          setShowListModal(false);
        }
      });
  };

  return (
    <RightSideModal isShowModal={isShowListModal}>
      <form
        className="flex h-full px-4 flex-col justify-between"
        onSubmit={isAdd ? handleAddSystemList : handleUpdateSubject}
      >
        <h1>{isAdd ? "Add System List" : "Update System List"}</h1>

        <Box className="mt-8">
          <TextField
            fullWidth
            defaultValue={editSystemList?.listName}
            id="outlined-basic"
            label="System List"
            variant="outlined"
            type="text"
            name="listName"
          />
        </Box>

        <Box className="btn_container mt-auto">
          {isAdd ? (
            <button className="submit_btn">Submit</button>
          ) : (
            <button className="submit_btn">Update</button>
          )}
          <button className="c_btn" onClick={() => setShowListModal(false)}>
            Cancel
          </button>
        </Box>
      </form>
    </RightSideModal>
  );
};

export default SystemListForm;