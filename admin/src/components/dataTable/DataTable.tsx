import "./dataTable.scss";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  columns: GridColDef[];
  
};
interface Users {
  _id: string;
 
}
const URL ='http://localhost:5000'
const DataTable = ({ columns}: Props) => {

  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("id-",id);
    
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${URL}/users/${id}`);
        setUsers(users.filter((row: any) => row._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleToggleVerified = async (id: string, verified: boolean) => {
    if (window.confirm(`Are you sure you want to ${verified ? 'unverify' : 'verify'} this user?`)) {
      try {
        const response = await axios.put(`${URL}/users/${id}`, { verified: !verified });
        setUsers(users.map((row: any) => row._id === id ? { ...row, verified: response.data.verified } : row));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const actionsColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="actions">
          <button onClick={() => handleToggleVerified(params.row._id, params.row.verified)}>
            {params.row.verified ? 'Unverify' : 'Verify'}
          </button>
          <div onClick={() => handleDelete(params.row._id)} className="delete">
            <img src="delete.svg" alt="" />
          </div>
          
        </div>
      );
    },
  };
  
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={users}
        columns={[...columns, actionsColumn]}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
};

export default DataTable;
