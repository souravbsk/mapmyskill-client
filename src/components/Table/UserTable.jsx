import { MaterialReactTable } from "material-react-table";
import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAndEditButton from "../DeleteAndEditButton/DeleteAndEditButton";

const UserTable = ({ userLists, handleEditUser, handleDeleteUser }) => {
  const columns = [
    {
      header: "Mobile",
      accessorKey: "mobile",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "name",
    },
    {
      header: "Status",
      Cell: ({ row }) => (
        <div>
          <span>Active</span>
        </div>
      ),
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <DeleteAndEditButton
          handleEditElement={handleEditUser}
          handleDeleteElement={handleDeleteUser}
          dynamicRowId={row.original.userid}
        ></DeleteAndEditButton>
      ),
    },
  ];
  return (
    <div className="mt-1">
      <MaterialReactTable
        rowNumberMode="original"
        columns={columns}
        data={userLists}
        muiTopToolbarProps={{
          sx: {
            backgroundColor:"#ADD8E6"
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor:"#ADD8E6",
           
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            background:"snow",
            
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            backgroundColor:"#ADD8E6"
          },
        }}
      ></MaterialReactTable>
    </div>
  );
};

export default UserTable;
