import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import db from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {moment} from 'moment';
import { Button } from '@mui/material';


const Inventory = () => {
    const handleEdit = async (row) => {
      const updatedRow = { ...row, pending: false };

    try {
      // Update the row in Firestore with the modified isEditable value
      await db.collection('pendingSales').doc(row.id.trim()).update(updatedRow);
      window.location.reload();
    } catch (error) {
      console.log(error);
      // Handle error
    }
      // Handle edit action based on the row data
    };
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {field:"id",headerName:"Id",flex:.2,type:"number"},
    { field: "vendorName", headerName: "Vendor Name" },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "productId",
        headerName: "productId",
        flex: 1,
      },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
        field: "date",
        headerName: "Date",
        flex: 1,
        valueFormatter: (params) => {
          const timestamp = params?.value;
          if (timestamp instanceof Date) {
            return timestamp.toLocaleString(); // Use browser's default date format
          } else if (timestamp?.toDate) {
            const date = timestamp.toDate();
            return date.toLocaleString(); // Use browser's default date format
          } else {
            return '';
          }
        },
      },
      {
        field: "pending",
        headerName: "Pending",
        type:"boolean",
        flex: 1,
        renderCell: (params) => {
          const isEditable =  params.value;
          if (isEditable) {
            return (
              <Button
              className="btn" // Apply the same btn class as the "Add new order" button
              style={{
                background: colors.greenAccent[600],
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
                onClick={() => handleEdit(params.row)}
                disabled={!isEditable} // Disable the button if isEditable is false
              >
                Confirm
              </Button>
            );
          } else {
            return null; // No button rendered
          }
        }
      },
    
  ];
  const [tableData, setTableData] = useState([])
  const [counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);
  const fetchBlogs=async()=>{
    const response=db.collection('pendingSales');
    const data=await response.get();
    setCounter((oldValue) => oldValue+1);
    data.docs.forEach(item=>{
     setTableData(tableData =>[...tableData,item.data()])
    })
  }
  useEffect(() => {
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
  setTableData([]);
  fetchBlogs();
  }, [])


  return (
    <Box m="20px">
      <Header
        title="Inventory"
        subtitle="Manage Inventory"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      ><div style={{ display: "flex" }}>
      <button className="btn" style={{ marginLeft: "auto" ,background:colors.greenAccent[600],color:"white"}}  onClick={() => navigate('add-inventory')}>Add new order</button>
      </div>
        <DataGrid
          rows={tableData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Inventory;
