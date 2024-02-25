import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import db from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';


const Team = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
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
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const [tableData, setTableData] = useState([])
  const [counter, setCounter] = useState(0);
  const dataFetchedRef = useRef(false);
  const fetchBlogs=async()=>{
    const response=db.collection('mockDataTeam');
    const data=await response.get();
    setCounter((oldValue) => oldValue+1);
    data.docs.forEach(item=>{
     setTableData(tableData =>[...tableData,item.data()])
    })
  }
//   const Fetchdata = () => {
//     db.collection("mockDataTeam").get().then((querySnapshot) => {
//         // Loop through the data and store
//         // it in array to display
//         querySnapshot.forEach(element => {
//             var data = element.data();
//             setTableData(tableData => [...tableData, data]);

//         });
//     })
// }
  useEffect(() => {
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
  setTableData([]);
  fetchBlogs();
  }, [])

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
      ><div style={{ display: "flex" }}>
        <button className="btn" style={{ marginLeft: "auto" ,background:colors.greenAccent[600],color:"white"}}  onClick={() => navigate('form')}>Add new member</button>
        </div>
        <DataGrid checkboxSelection rows={tableData} columns={columns} />6
      </Box>
    </Box>
  );
};

export default Team;
