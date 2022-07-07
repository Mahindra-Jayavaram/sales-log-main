import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/tasks/action";
import { DataGrid } from "@mui/x-data-grid";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTasks } from "../Redux/tasks/action";
import axios from "axios";
import { Edit } from "./Edit";

//data

export const Table = () => {
  const dispatch = useDispatch();
  //For getting the tasks form the store
  const { tasks } = useSelector((state) => state.tasks);
  const isLoading = useSelector((state)=>state.tasks.isLoading)
  // console.log("tasks",tasks)

  //Table headers.
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "entityName", headerName: "Entity name", width: 130 },
    { field: "task", headerName: "Task Type", width: 100 },
    {
      field: "date",
      headerName: "Date",
      type: "Date",
      width: 120,
    },
    {
      field: "personName",
      headerName: "Person name",
      sortable: false,
      width: 160,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 160,
      type: "Number",
    },
    { field: "notes", headerName: "Notes", width: 200 },

    //to update the status.
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (cellValues) => (
        <button
          className={cellValues.value === "progress" ? "red" : "green"}
          onClick={() => {
            //updateing the status by using the id.
            axios
              .patch(`https://sales-log.herokuapp.com/data/${cellValues.id}`, {
                status: cellValues.value === "success" ? "progress" : "success",
              })
              .then(() => {
                dispatch(getData());
              })
              .catch((err) => console.log(err.message));
          }}
        >
          {cellValues.value}
        </button>
      ),
    },
    //To edit the data and it will move to the edit page.
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      renderCell: (cellValues) => <Edit cellValues={cellValues} />,
    },

    //to delete the row.
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (cellValues) => (
        <DeleteIcon
          onClick={() => {
            dispatch(deleteTasks(cellValues.id));
          }}
          sx={{ color: "red" }}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div
      style={{ height: 400, width: "80%", margin: "auto", marginTop: "20px" }}
    >
      {/* this is to display the data on the table by using Material ui*/}
      <DataGrid
        rows={tasks}
        columns={columns}
        hideFooterSelectedRowCount={true}
        pageSize={5}
        loading={isLoading}
      />
    </div>
  );
};
