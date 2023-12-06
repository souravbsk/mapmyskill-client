import { MaterialReactTable } from "material-react-table";
import React from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAndEditButton from "../DeleteAndEditButton/DeleteAndEditButton";
const SagmentTable = ({
  sagmentData,
  handleDeleteSegment,
  handleEditSegment,
}) => {
  const columns = [
    {
      header: "Sagment Name",
      accessorKey: "name",
    },
    {
      header: "Category Name",
      accessorKey: "catname",
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <DeleteAndEditButton
          handleEditElement={handleEditSegment}
          handleDeleteElement={handleDeleteSegment}
          dynamicRowId={row.original.segmentid}
        ></DeleteAndEditButton>
      ),
    },
  ];
  return (
    <div className="mt-12">
      <MaterialReactTable
        rowNumberMode="original"
        columns={columns}
        data={sagmentData}
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

export default SagmentTable;
