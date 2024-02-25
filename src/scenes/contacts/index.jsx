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

const Contacts = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {field:"id",headerName:"Id",flex:.2,type:"number"},
    { field: "vendorName", headerName: "Vendor Name" },
    {
      field: "contactName",
      headerName: "Contact Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
  ];
  const [tableData, setTableData] = useState([])
  const [counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);
  const fetchBlogs=async()=>{
    const response=db.collection('vendors');
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
        title="Vendors"
        subtitle="List of Vendors"
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
      <button className="btn" style={{ marginLeft: "auto" ,background:colors.greenAccent[600],color:"white"}}  onClick={() => navigate('vendor')}>Add new vendor</button>
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

export default Contacts;
