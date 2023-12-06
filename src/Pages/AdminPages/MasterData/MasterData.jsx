import React, { useState } from "react";
import AddNewButton from "../../../components/AddNewButton/AddNewButton";
import SystemListTable from "../../../components/Table/SystemListTable";
import SystemListForm from "../../../components/SystemListForm/SystemListForm";
import instance from "../../../config/axios.config";
import Swal from "sweetalert2";
import SystemListItemTable from "../../../components/Table/SystemListItemTable";
import SystemListItemForm from "../../../components/SystemListItemForm/SystemListItemForm";

const MasterData = () => {
  const [isShowListModal, setShowListModal] = useState(false);
  const [isShowListItemModal, setShowListItemModal] = useState(false);
  const [isAddSystemList, setAddSystemList] = useState(true);
  const [isAddSystemListItem, setAddSystemListItem] = useState(true);
  const [reFetch, setReFetch] = useState(true);
  const [editSystemList, SetEditSystemList] = useState({});
  const [editSystemListItem,setEditSystemListItem] = useState({});
  const [systemNameData, setSystemNameData] = useState([]);
  const [systemListId,setSystemListId] = useState('');


  //system list
  const handleAddNewSystemList = () => {
    setEditSystemListItem({})
    SetEditSystemList({})
    setAddSystemList(true)
    setShowListItemModal(false);
    setShowListModal(true);
  };

  const handleEditSystemList = (id) => {
    console.log("edit", id);
    instance.get(`api/systemlist/${id}`).then((res) => {
      console.log(res);
      if (res.statusText == "OK") {
        SetEditSystemList(res.data);
        console.log(res.data);
        setShowListModal(true);
        setAddSystemList(false);
      }
    });
  };

  const handleDeleteSystemList = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`api/systemlist/${id}`).then((res) => {
          if (res.data.message) {
            setReFetch(!reFetch);
            Swal.fire("Deleted!", "List Item has been deleted.", "success");
          }
        });
      }
    });
  };

  //   system list item
  const handleAddNewSystemListItem = () => {
    setEditSystemListItem({})
    SetEditSystemList({})
    setAddSystemListItem(true)
    setShowListModal(false);
    setShowListItemModal(true);
  };

  const handleEditSystemListItem = (id) => {
    if(id){
      instance.get(`api/systemlistitem/${id}`)
      .then(res => {
        setAddSystemListItem(false)
        setShowListItemModal(true)
        setEditSystemListItem(res?.data);
      })
    }
  };

  const handleDeleteSystemListItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`api/systemlistitem/${id}`).then((res) => {
          if (res.data.message) {
            setReFetch(!reFetch);
            Swal.fire(
              "Deleted!",
              "List Item Name has been deleted.",
              "success"
            );
          }
        });
      }
    });
  };

  return (
    <div className="container" id="common">
      <div className="mt-5 flex flex-wrap gap-4">
        <div>
          <AddNewButton
            dynamicText="System List"
            handleBtnFunction={handleAddNewSystemList}
          ></AddNewButton>
          <div className="mt-6">
            <SystemListTable
              handleEditSystemList={handleEditSystemList}
              handleDeleteSystemList={handleDeleteSystemList}
              reFetch={reFetch}
              setSystemNameData={setSystemNameData}
              setSystemListId={setSystemListId}
            ></SystemListTable>
          </div>
          <div>
            <SystemListForm
              reFetch={reFetch}
              setReFetch={setReFetch}
              setShowListModal={setShowListModal}
              isShowListModal={isShowListModal}
              isAdd={isAddSystemList}
              editSystemList={editSystemList}
            ></SystemListForm>
          </div>
        </div>
        <div className="flex-grow">
          <AddNewButton
            dynamicText="System List Item"
            handleBtnFunction={handleAddNewSystemListItem}
          ></AddNewButton>
          <div className="mt-6">
            <SystemListItemTable
              handleDeleteSystemListItem={handleDeleteSystemListItem}
              handleEditSystemListItem={handleEditSystemListItem}
              reFetch={reFetch}
              systemListId={systemListId}
            ></SystemListItemTable>
          </div>
          <div>
            <SystemListItemForm
              setShowListItemModal={setShowListItemModal}
              isShowListItemModal={isShowListItemModal}
              isAdd={isAddSystemListItem}
              systemNameData={systemNameData}
              setReFetch={setReFetch}
              reFetch={reFetch}
              editSystemListItem={editSystemListItem}
            ></SystemListItemForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterData;
