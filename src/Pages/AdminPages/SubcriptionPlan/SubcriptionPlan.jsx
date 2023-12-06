import React from "react";
import { FaPlus } from "react-icons/fa";
import SubcriptionPlansTable from "../../../components/Table/SubcriptionPlansTable";
import { useState } from "react";
import AddSubcription from "../../../components/Subcriptions/AddSubcription";
import UpdateSubscription from "../../../components/Subcriptions/UpdateSubscription";
import Swal from "sweetalert2";
import axios from "axios";

const SubcriptionPlan = () => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateopen, setupdateOpen] = useState(false);
  const [planData, setPlanData] = useState({});
  const [reFetch, setRefetch] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const handleUpdatePlan = (value) => {
    setPlanData({});
    setPlanData(value);
    setupdateOpen(true);
  };

  const handleDeleteElement = (rowValue) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't delete this package!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(rowValue, "row,value");
        axios
          .delete(
            `http://localhost:8080/api/subscriptionplans/${rowValue?.planid}`
          )
          .then((res) => {
            if (res?.data?.affectedRows > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Plan has been deleted.",
                icon: "success",
              });
              setRefetch(!reFetch)
            }
          });
      }
    });
  };

  return (
    <div className=" px-8 mt-12 ">
      <div className=" ">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#071425] text-white px-3 py-2"
        >
          Add A Plan <FaPlus></FaPlus>
        </button>
      </div>
      <div className="mt-12">
        <SubcriptionPlansTable
          setOpen={setOpen}
          handleChange={handleChange}
          checked={checked}
          handleEditElement={handleUpdatePlan}
          reFetch={reFetch}
          setRefetch={setRefetch}
          handleDeleteElement={handleDeleteElement}
        ></SubcriptionPlansTable>
      </div>
      <div>
        <AddSubcription
          reFetch={reFetch}
          setRefetch={setRefetch}
          setOpen={setOpen}
          open={open}
        ></AddSubcription>
      </div>
      <div>
        <UpdateSubscription
          planData={planData}
          reFetch={reFetch}
          setRefetch={setRefetch}
          updateopen={updateopen}
          setupdateOpen={setupdateOpen}
        ></UpdateSubscription>
      </div>
    </div>
  );
};

export default SubcriptionPlan;
