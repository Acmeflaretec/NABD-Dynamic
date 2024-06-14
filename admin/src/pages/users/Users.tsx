import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { GridColDef } from "@mui/x-data-grid";
// import { useEffect, useState } from "react";
// import axios from "axios";

const Users = () => {
  

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", type: "string", headerName: "Name", width: 150 },
    { field: "email", type: "string", headerName: "Email", width: 200 },
    { field: "contactNumber", type: "string", headerName: "Phone", width: 150 },
    { field: "eventName", type: "string", headerName: "Event Name", width: 150 },
    { field: "price", headerName: "Price", width: 110, type: "number" },
    { field: "paymentId", headerName: "PaymentId", width: 110, type: "string" },
    { field: "verified", headerName: "Verified", width: 150, type: "boolean" },
  ];

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>
      <DataTable columns={columns} />
    </div>
  );
};

export default Users;
