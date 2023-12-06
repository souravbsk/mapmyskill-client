import MaterialReactTable from "material-react-table";
import React, { useEffect, useState } from "react";
import instance from "../../config/axios.config";
import DeleteAndEditButton from "../DeleteAndEditButton/DeleteAndEditButton";

const SystemListTable = ({
  reFetch,
  handleEditSystemList,
  handleDeleteSystemList,
  setSystemNameData,
  setSystemListId,
}) => {
  const [systemListData, setSystemListData] = useState([]);
  useEffect(() => {
    instance.get("api/systemlist").then((res) => {
      setSystemListData(res?.data);
      setSystemNameData(res?.data);
    });
  }, [reFetch]);

  const columns = [
    {
      header: "List Name",
      Cell: ({ row }) => (
        <div 
          className="block p-[16px] cursor-pointer"
          onClick={() => setSystemListId(row.original.listId)}
        >
          {row.original.listName}
        </div>
      ),
    },
    {
      header: "Action",
      Cell: ({ row }) => (
        <DeleteAndEditButton
          handleEditElement={handleEditSystemList}
          handleDeleteElement={handleDeleteSystemList}
          dynamicRowId={row.original.listId}
        ></DeleteAndEditButton>
      ),
    },
  ];

  return (
    <div className="mastarData">
      <MaterialReactTable
        rowNumberMode="original"
        columns={columns}
        data={systemListData}
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

export default SystemListTable;
