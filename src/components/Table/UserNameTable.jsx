import React, { useState } from "react";
import DeleteAndEditButton from "../DeleteAndEditButton/DeleteAndEditButton";
import MaterialReactTable from "material-react-table";
import { FaEye } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
const UserNameTable = ({ handleViewCard,reFetch }) => {

  const [userCardData,setUserCardData] = useState([]);
  const [pendingCount,setPendingCount] = useState(0)


  useEffect(() => {
    axios.get(`http://localhost:8080/api/documents`)
    .then(res => {
      console.log(res);
      if(res?.data?.success){
        setUserCardData(res?.data?.data)
        const totalPending =  res?.data?.data.filter(item => item?.verifystatusName?.toLowerCase() == "pending")
        setPendingCount(totalPending)
      }
    })
  },[reFetch])


  const columns = [
    {
      header: "Name",
      Cell: ({ row }) => (
        <div
          className="block p-[16px] cursor-pointer"
          //   onClick={() => setSystemListId(row.original.listId)}
        >
          {row?.original?.userName}
        </div>
      ),
    },
    {
      header: "Status",
      size: "20",
      Cell: ({ row }) => (
        <div
          className={
            row.original.verifystatusName?.toLowerCase() == "verified"
              ? "p-1 rounded-md text-white bg-green-600"
              : row.original.verifystatusName?.toLowerCase() == "unverified"
              ? "bg-yellow-500 p-1 rounded-md text-black"
              : row.original.verifystatusName?.toLowerCase() == "rejected" ? "bg-red-600 p-1 rounded-md text-white" :  ""
          }
        >
          {row?.original?.verifystatusName}
        </div>
      ),
    },
    {
      header: "Document Type",
      size: "20",
      Cell: ({ row }) => <p>{row?.original?.documentName}</p>,
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <button
          onClick={() =>  handleViewCard(row?.original?.imageData)}
          className="bg-[#071425] text-white px-2 py-2"
        >
          <FaEye size={24}></FaEye>
        </button>
      ),
    },
  ];

  // Add your handleEditSystemList and handleDeleteSystemList functions here
  return (
    <div className="nidverify">
      <h2 className="mb-4 font-semibold">Total Pending: {pendingCount?.length} </h2>
      <MaterialReactTable
        rowNumberMode="original"
        columns={columns}
        data={userCardData || []}
        muiTopToolbarProps={{
          sx: {
            backgroundColor: "#ADD8E6",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: "#ADD8E6",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            background: "snow",
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            backgroundColor: "#ADD8E6",
          },
        }}
      ></MaterialReactTable>
    </div>
  );
};

export default UserNameTable;
