import MaterialReactTable from "material-react-table";
import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAndEditButton from "../DeleteAndEditButton/DeleteAndEditButton";
const SubjectTable = ({ subjectData,handleEditSubject,handleDeleteSubject }) => {
  const columns = [
    {
      header: "Subject Name",
      accessorKey: "name",
    },
    {
      header: "Segment Name",
      accessorKey: "segname",
    },
    {
      header: "Category Name",
      accessorKey: "categoryname",
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <DeleteAndEditButton 
        handleEditElement={handleEditSubject}
        handleDeleteElement={handleDeleteSubject}
        dynamicRowId={row.original.subjectid}
        ></DeleteAndEditButton>
      ),
    },
  ];
  return (
    <div className="mt-12">
      <MaterialReactTable
        rowNumberMode="original"
        columns={columns}
        data={subjectData}
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
            background:"snow"
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

export default SubjectTable;
