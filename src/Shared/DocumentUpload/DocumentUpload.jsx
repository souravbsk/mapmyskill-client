import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonSubmit from "../../components/ButtonSubmit/ButtonSubmit";
import UploadButton from "../../components/UploadButton/UploadButton";
import useAuthChanged from "../../Hooks/useAuthChanged";
import useFetchValue from "../../Hooks/useFetchValue";
import axios from "axios";
import Swal from "sweetalert2";
import EditNoteIcon from "@mui/icons-material/EditNote";
import useGetValue from "../../Hooks/useGetValue";
import { IoIosCloseCircle } from "react-icons/io";
import { FcAlarmClock, FcOk } from "react-icons/fc";

const DocumentUpload = () => {
  const { user } = useAuthChanged();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBack, setSelectedImageBack] = useState(null);
  const [fileFront, setFileFront] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [imageFront, setImageFront] = useState([]);
  const [imageBack, setImageBack] = useState([]);
  const { getValue: documentType } = useFetchValue("documentType");
  const { getValue: verifyStatus } = useFetchValue("verifyStatus");
  const [showForm, setShowForm] = useState(true);
  const [reFetch, setReFetch] = useState(false);
  const [fetchData, setFetchData] = useState({});

  useEffect(() => {
    if (user?.userid) {
      axios
        .get(`http://localhost:8080/api/documents/${user?.userid}`)
        .then((response) => {
          console.log("Image DB Response",response);
          if (response.data.success) {
            setImageFront(response?.data?.data[0]?.documentpathF);
            setImageBack(response?.data?.data[0]?.documentpathB);
            setFetchData(response?.data?.data[0]);
          }
          if (!response?.data?.success) {
            setShowForm(false);
          }
        })
        .catch((err) => {
          if (err?.response?.statusText == "Not Found") {
            setShowForm(false);
          }
        });
    }
  }, [reFetch, user]);

  const handleImageUploadFront = (event) => {
    const file = event.target.files[0];
    setFileFront(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadBack = (event) => {
    const file = event.target.files[0];
    setBackFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImageBack(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const doctype = form.docType.value;
    const status = verifyStatus[1]?.listItemId;

    const formData = new FormData();
    formData.append("imageFront", fileFront);
    formData.append("imageBack", backFile);
    formData.append("userid", user?.userid);
    formData.append("documenttype", doctype);
    formData.append("documentnameF", fileFront.name);
    formData.append("documentnameB", backFile.name);
    formData.append("verifystatus", status);

    axios
      .post(`http://localhost:8080/api/documents/upload`, formData)
      .then((response) => {
        if (response?.data?.result?.affectedRows > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your document has been uploaded successfully",
            showConfirmButton: true,
            timer: 1500,
          });
          setReFetch(!reFetch);
          setShowForm(true);
        }
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });
  };
  return (
    <div>
      {showForm ? (
        <div className="p-4 border-b-2 text-lg font-semibold bg-white flex justify-between  ">
          <p>Upload Documents</p>
          <div
            onClick={() => setShowForm(!showForm)}
            className="p-1 hover:cursor-pointer hover:text-blue-500"
          >
            <EditNoteIcon />
            <span className="text-sm">Edit</span>
          </div>
        </div>
      ) : null}

      {showForm ? (
        <div className="p-x-2 pt-4 pl-4 pr-4 pb-2 bg-white border-b-2 mb-9  flex flex-col justify-center gap-y-5">
          <div className="space-y-3">
            <div className="text-left">
              <p className="flex items-center gap-4">
                <span className="text-lg font-semibold">Verify Status: </span>
                <p className="flex items-center gap-2">
                  {fetchData && fetchData?.verifystatusName}{" "}
                  {fetchData?.verifystatusName?.toLowerCase() == "rejected" ? (
                    <IoIosCloseCircle
                      size={16}
                      className="text-red-500"
                    ></IoIosCloseCircle>
                  ) : fetchData?.verifystatusName?.toLowerCase() ==
                    "verified" ? (
                    <FcOk size={16}></FcOk>
                  ) : fetchData?.verifystatusName?.toLowerCase() ==
                    "unverified" ? (
                    <FcAlarmClock></FcAlarmClock>
                  ) : (
                    ""
                  )}
                </p>
              </p>
            </div>
            <div className="text-left">
              <span className="text-lg font-semibold">Document Type: </span>
              <span>{fetchData && fetchData?.documenttypeName}</span>
            </div>
            {fetchData?.feedback && (
              <div className="text-left">
                <span className="text-lg font-semibold">Rejected Reason: </span>
                <span>{fetchData && fetchData?.feedback}</span>
              </div>
            )}
          </div>
          <div className={`flex gap-x-4 text-center text-lg font-semibold`}>
            <div>
              <p>Front Image</p>
              {imageFront.length > 0 ? (
                <div className="border-2">
                  <img src={`http://localhost:8080/${imageFront}`}></img>
                </div>
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
            </div>
            <div>
              <p>Back Image</p>
              {imageBack.length > 0 ? (
                <div className="border-2">
                  <img src={`http://localhost:8080/${imageBack}`}></img>
                </div>
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
            </div>
          </div>
        </div>
      ) : (
        // ===================Image Upload Form======================
        <div>
          <div className="p-4 border-b-2 text-lg font-semibold bg-white flex justify-between  ">
            {fetchData?.id && (
              <div
                onClick={() => setShowForm(true)}
                className="p-1 hover:cursor-pointer hover:text-blue-500"
              >
                <span className="text-sm">Back</span>
              </div>
            )}
            <p>Edit Uploaded Documents</p>
          </div>

          <div className="p-x-2 pt-4 pb-2 bg-white  border-b-2 mb-9">
            <div className="max-w-full w-full md:w-8/12  mx-auto text-center shadow-lg p-2 ">
              <div className="rounded-md bg-gray-200 p-3">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <div className="md:col-span-2">
                      <FormControl
                        className="w-full"
                        variant="standard"
                        sx={{ m: 1 }}
                      >
                        <InputLabel id="demo-simple-select-standard-label">
                          Select Document Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Select Document Type"
                          name="docType"
                          required
                          fullWidth
                          defaultValue={fetchData?.documenttype}
                        >
                          {documentType?.map((items) => (
                            <MenuItem
                              key={items.listItemId}
                              value={items.listItemId}
                            >
                              {items.listItemName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/*========Front Image Choose and view section=========== */}
                    <div className="md:col-span-1">
                      <div className="text-left mt-2">
                        <UploadButton
                          btnText="CHOOSE FRONT SIDE"
                          handleImageUpload={handleImageUploadFront}
                        ></UploadButton>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {imageFront || selectedImage ? (
                        <div className="border-2 w-full">
                          <img
                            src={
                              selectedImage
                                ? selectedImage
                                : imageFront.length > 0
                                ? `http://localhost:8080/${imageFront}`
                                : ""
                            }
                          ></img>
                        </div>
                      ) : null}
                    </div>
                    {/*========Back Image Choose and view section=========== */}
                    <div className="md:col-span-1">
                      <div className="text-left mt-2">
                        <UploadButton
                          btnText="CHOOSE BACK SIDE"
                          handleImageUpload={handleImageUploadBack}
                        ></UploadButton>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {selectedImageBack || imageBack ? (
                        <div className="border-2 w-full">
                          <img
                            src={
                              selectedImageBack
                                ? selectedImageBack
                                : imageBack.length > 0
                                ? `http://localhost:8080/${imageBack}`
                                : ""
                            }
                          ></img>
                        </div>
                      ) : null}
                    </div>

                    <div className=" md:col-span-2 text-right">
                      <ButtonSubmit btnText="Submit"></ButtonSubmit>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
