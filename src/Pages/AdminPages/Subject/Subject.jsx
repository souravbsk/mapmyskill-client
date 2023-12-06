import React, { useEffect, useState } from "react";
import AddNewButton from "../../../components/AddNewButton/AddNewButton";
import SubjectTable from "../../../components/Table/SubjectTable";
import SubjectForm from "../../../components/SubjectForm/SubjectForm";
import instance from "../../../config/axios.config";
import Swal from "sweetalert2";

const Subject = () => {
  const [SubjectsDatas, setSubjectDatas] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [dynamicText, setDynamicText] = useState("Subject");
  const [updateSubject, setUpdateSubject] = useState({});
  const [reFetch, setReFetch] = useState(true);
  const [updateId, setUpdateId] = useState("");

  useEffect(() => {
    instance.get("api/subject").then((res) => {
      setSubjectDatas(res.data);
    });
  }, [reFetch]);

  const handleNewSubject = () => {
    setUpdateSubject({})
    setShowModal(true);
    setIsAdd(true);
  };

  const handleDeleteSubject = (id) => {
    console.log("delete", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be delete this subject",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`api/subject/${id}`).then((res) => {
          if (res.statusText == "OK") {
            Swal.fire("Deleted!", "Your Subject has been deleted.", "success");
            setReFetch(!reFetch);
          }
        });
      }
    });
  };
  const handleEditSubject = (id) => {
    setShowModal(false);
    instance.get(`api/subject/${id}`).then((res) => {
      console.log(res);
      if (res.data) {
        setUpdateSubject(res.data);
        setIsAdd(false);
        setShowModal(true);
        setUpdateId(id);
      }
    });
  };
  return (
    <div className="container" id="common">
      <div className="mt-2">
        <AddNewButton
          dynamicText="Subject"
          handleBtnFunction={handleNewSubject}
        ></AddNewButton>
      </div>
      <div>
        <SubjectTable
          subjectData={SubjectsDatas}
          handleDeleteSubject={handleDeleteSubject}
          handleEditSubject={handleEditSubject}
        ></SubjectTable>
      </div>
      <div>
        <SubjectForm
          setReFetch={setReFetch}
          reFetch={reFetch}
          updateSubject={updateSubject}
          isShowModal={isShowModal}
          setShowModal={setShowModal}
          isAdd={isAdd}
          dynamicText={dynamicText}
          updateId={updateId}
        ></SubjectForm>
      </div>
    </div>
  );
};

export default Subject;
