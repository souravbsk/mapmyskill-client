import MaterialReactTable from "material-react-table";
import React, { useEffect, useState } from "react";
import instance from "../../config/axios.config";
import DeleteAndEditButton from "../DeleteAndEditButton/DeleteAndEditButton";

const SystemListItemTable = ({
  reFetch,
  handleEditSystemListItem,
  handleDeleteSystemListItem,
  systemListId
}) => {
  const [systemListItem, setSystemListItem] = useState([]);
  useEffect(() => {
    instance.get("api/systemlistitem").then((res) => {
      setSystemListItem(res.data);
    });
  }, [reFetch]);


  console.log(systemListItem);

  const systemListItemData = systemListItem.filter(item => item?.listid == systemListId)



  const columns = [
    {
      header: "List Item Name",
      accessorKey: "listItemName",
    },
    {
      header: "List Name",
      accessorKey: "listName",
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <DeleteAndEditButton
          handleEditElement={handleEditSystemListItem}
          handleDeleteElement={handleDeleteSystemListItem}
          dynamicRowId={row.original.listItemId}
        ></DeleteAndEditButton>
      ),
    },
  ];
  return (
    <div>
      <MaterialReactTable
        rowNumberMode="original"
        columns={columns}
        data={systemListItemData}
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

export default SystemListItemTable;
