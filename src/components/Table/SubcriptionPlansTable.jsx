import Switch from "@mui/material/Switch";
import MaterialReactTable from "material-react-table";
import React, { memo, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
const label = { inputProps: { "aria-label": "Switch demo" } };
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
import PlanStatus from "../PlanStatus/PlanStatus";
import DeleteIcon from "@mui/icons-material/Delete";
import useFetchValue from "../../Hooks/useFetchValue";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useGetValue from "../../Hooks/useGetValue";
import usePlanDataValue from "../../Hooks/usePlanDataValue";

const SubcriptionPlansTable = ({
  handleEditElement,
  checked,
  reFetch,
  setRefetch,
  handleDeleteElement,
}) => {
  const [planData, setPlanData] = useState([]);
  const [allData, setallData] = useState([]);
  const { getValue: plantypes } = useFetchValue("plantypes");
  const { itemValue: perclickValue } = usePlanDataValue("perclick");

  useEffect(() => {
    axios.get("http://localhost:8080/api/subscriptionplans/").then((res) => {
      console.log(res);
      if (res.data) {
        console.log(res);
        setPlanData(res?.data);
        setallData(res?.data);
      }
    });
  }, [reFetch]);

  console.log(allData);

  const columns = [
    {
      header: "#",
      accessorKey: "planid",
      Cell: ({ row }) => Number(row?.id) + 1,
      size: 20,
    },
    {
      header: "Plan Name",
      accessorKey: "planname",
    },
    {
      header: "Plan Periods",
      accessorKey: "planperiod",
    },
    {
      header: "Number Of Contact",
      accessorKey: "planterm",
      size: 50,
      Cell: ({ row }) =>
        row?.original?.planperiodvalue == perclickValue
          ? row?.original?.planterm
          : "not available",
    },
    {
      header: "plan types",
      accessorKey: "plantypename",
    },
    {
      header: "Amount",
      accessorKey: "amount",

      size: 50,
    },
    {
      header: "Status",
      Cell: ({ row }) => (
        <PlanStatus
          setRefetch={setRefetch}
          reFetch={reFetch}
          row={row}
        ></PlanStatus>
      ),
      size: 50,
    },
    {
      header: "Action",

      Cell: ({ row }) => (
        <div className=" flex items-center gap-3">
          <button
            className="text-[#0000FF]"
            onClick={() => handleEditElement(row?.original)}
          >
            <ModeIcon className="edit" />
          </button>
          <button
            className="text-red-500"
            onClick={() => handleDeleteElement(row?.original)}
          >
            <DeleteIcon className="delete" />
          </button>
        </div>
      ),
    },
  ];

  const handleFilterPlanTypes = (e) => {
    const planTypeValue = e.target.value;
    const filterValue = allData.filter(
      (plan) => plan.plantype == planTypeValue
    );

    if (planTypeValue && filterValue.length > 0) {
      setPlanData(filterValue);
    } else if (planTypeValue) {
      setPlanData(filterValue);
    } else {
      setPlanData(allData);
    }
  };

  return (
    <div className="mastarData">
      <MaterialReactTable
        rowNumberMode="original"
        columns={columns || []}
        data={planData || []}

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

export default memo(SubcriptionPlansTable);
