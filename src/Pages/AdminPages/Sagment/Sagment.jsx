import React, { useState, useEffect } from "react";
import instance from "../../../config/axios.config";
import SagmentTable from "../../../components/Table/SagmentTable";
import AddNewButton from "../../../components/AddNewButton/AddNewButton";
import SagmentForm from "../../../components/SagmentForm/SagmentForm";
import Swal from "sweetalert2";

const Sagment = () => {
  const [hide, setHide] = useState(false);
  const [error, setError] = useState();
  const [btn, setBtn] = useState(true);
  const [cotagory, setCatagory] = useState([]);
  const [editSegmentData, setEditSegmentData] = useState({});

  const [segments, setSegments] = useState([]);

  const [isAdd, setIsAdd] = useState(true);
  const [isShowModal, setShowModal] = useState(false);
  const [reFetch, setReFetch] = useState(true);
  const [updateSagment, setUpdateSagment] = useState({});

  const handleAddNewSegment = () => {
    setUpdateSagment({});
    setIsAdd(true);
    setShowModal(true);
  };

  // get catagory by id
  useEffect(() => {
    instance
      .get("/api/segment")
      .then((res) => {
        console.log("category data ....", res.data);
        setSegments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [reFetch]);

  // get segment data

  // api integration end

  // delete segment data
  const handleDeleteSegment = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be delete this Segment",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`/api/segment/${id}`).then((res) => {
          if (res.statusText == "OK") {
            Swal.fire("Deleted!", "Your Segment has been deleted.", "success");
            setReFetch(!reFetch);
          }
        });
      }
    });
  };


  // Edit segment data
  const handleEditSegment = (id) => {
    setIsAdd(false);
    instance
      .get(`/api/segment/${id}`)
      .then((res) => {
        console.log(res);
        if (res.statusText == "OK") {
          setUpdateSagment(res.data);
          setShowModal(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div id="common">
      <AddNewButton
        dynamicText="Segment"
        handleBtnFunction={handleAddNewSegment}
      ></AddNewButton>

      <SagmentTable
        handleDeleteSegment={handleDeleteSegment}
        handleEditSegment={handleEditSegment}
        sagmentData={segments}
      ></SagmentTable>
      {/* --------------------------------------------modal box --------------------------- */}
      <SagmentForm
        isShowModal={isShowModal}
        dynamicText="Sagment"
        isAdd={isAdd}
        setReFetch={setReFetch}
        reFetch={reFetch}
        updateSagment={updateSagment}
        setShowModal={setShowModal}
      ></SagmentForm>
    </div>
  );
};

export default Sagment;
