import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import db from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "semantic-ui-react";


const Invoices = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([])
  const [counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);
  const fetchBlogs=async()=>{
    const response=db.collection('products');
    const data=await response.get();
    setCounter((oldValue) => oldValue+1);
    data.docs.forEach(item=>{
     setTableData(tableData =>[...tableData,item.data()])
    })
  }
  const handleEdit = (row) => {
    // Implement your edit logic here using the row data
    // For example, you can navigate to the edit page with the row's ID
    navigate(`/edit-product/${row.id}`);
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
  setTableData([]);
  fetchBlogs();
  }, [])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "productName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "costPrice",
      headerName: "Cost Price",
      flex: 1,
    },
    {
      field: "salePrice",
      headerName: "Sale Price",
      flex: 1,
    },
    {
      field: "profitMargin",
      headerName: "Profit",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          Rs{params.row.profitMargin}
        </Typography>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },{
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="List of Products" />
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

        }}
      >
        <div style={{ display: "flex" }}>
      <button className="btn" style={{ marginLeft: "auto" ,background:colors.greenAccent[600],color:"white"}}  onClick={() => navigate('product')}>Add new product</button>
      </div>
        <DataGrid checkboxSelection rows={tableData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
