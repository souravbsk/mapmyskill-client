import React from "react";
import RightSideModal from "../../Shared/RightSideModal/RightSideModal";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import instance from "../../config/axios.config";
import Swal from "sweetalert2";

const SystemListItemForm = ({
  isShowListItemModal,
  setShowListItemModal,
  isAdd,
  systemNameData,
  reFetch,
  setReFetch,
  editSystemListItem,
}) => {
  const handleAddSystemList = (e) => {
    e.preventDefault();
    const listItemName = e.target.listItemName.value;
    const systemListNameId = e.target.systemListName.value;

    const newSystemListItem = {
      listid: systemListNameId,
      listItemName,
    };

    instance.post("api/systemlistitem", newSystemListItem).then((res) => {
      console.log(res);
      if (res.statusText == "OK") {
        setReFetch(!reFetch);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "System List Item Name Added",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        setShowListItemModal(false);
      }
    });
  };

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    const listItemName = e.target.listItemName.value;
    const systemListNameId = e.target.systemListName.value;
    const newSystemListItem = {
      listItemName,
      listid: systemListNameId,
    };
    console.log(newSystemListItem);
    instance
      .put(
        `api/systemlistitem/${editSystemListItem.listItemId}`,
        newSystemListItem
      )
      .then((res) => {
        if (res.statusText == "OK") {
          setReFetch(!reFetch);
          Swal.fire({
            position: "center",
            icon: "success",
            title: " System List Item Update",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
          setShowListItemModal(false);
        }
      });
  };

  return (
    <RightSideModal isShowModal={isShowListItemModal}>
      <form
        className="flex h-full px-4 flex-col justify-between"
        onSubmit={isAdd ? handleAddSystemList : handleUpdateSubject}
      >
        <h1>{isAdd ? `Add System List Item` : `Update System List Item`}</h1>

        <Box className="mt-8">
          <TextField
            fullWidth
            // defaultValue={editSystemList?.listName}
            id="outlined-basic"
            label="System List Item Name"
            variant="outlined"
            type="text"
            defaultValue={editSystemListItem?.listItemName}
            name="listItemName"
          />
        </Box>
        <Box className="mt-8">
          <InputLabel id="demo-simple-select-label">
            System List Name
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="systemListName"
            name="systemListName"
            defaultValue={editSystemListItem?.listId}
          >
            {systemNameData?.map((item, i) => (
              <MenuItem key={i} value={item.listId}>
                {item?.listName}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box className="btn_container mt-auto">
          {isAdd ? (
            <button className="submit_btn">Submit</button>
          ) : (
            <button className="submit_btn">Update</button>
          )}
          <button className="c_btn" onClick={() => setShowListItemModal(false)}>
            Cancel
          </button>
        </Box>
      </form>
    </RightSideModal>
  );
};

export default SystemListItemForm;
