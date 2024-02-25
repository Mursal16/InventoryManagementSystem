import { Box, Button, TextField } from "@mui/material";
import { Field,Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import db from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const AddInventory = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate=useNavigate();
  const [productData, setProductData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [customerData,setCustomerData]=useState([]);
  const dataFetchedRef = useRef(false);

  const fetchBlogs=async()=>{
    const response=db.collection('vendors');
    const data=await response.get();
    setCounter((oldValue) => oldValue+1);
    data.docs.forEach(item=>{
     setCustomerData(customerData =>[...customerData,item.data()])
    })
  }
  const fetchproductData1=async()=>{
    const response=db.collection('products');
    const data=await response.get();
    data.docs.forEach(item=>{
     setProductData(productData =>[...productData,item.data()])
    })
  }
  useEffect(() => {
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
  setCustomerData([]);
  setProductData([]);
  fetchBlogs();
  fetchproductData1();
  }, [])

  const finalId=uuidv4();
  const handleFormSubmit = async (values) => {
    try {
      db.collection("pendingSales")
          .doc(finalId)
          .set( {
        productName: values.productName,
        quantity: values.quantity,
        vendorName: values.vendorName,
        productId: values.productId,
        pending:true,
        id:finalId,
        date:serverTimestamp(),
        customerId:values.customerId,
      }).then(() => {
        alert("Inventory Added");
        navigate('/inventory');
      }) 
    }
    catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return (
    <Box m="20px">
      <Header title="ADD NEW ORDER" subtitle="Add a New Order For Vendor" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          handleSelect,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
                <select
                fullWidth
                sx={{ gridColumn: "span 4" }}
                name="productName"
                id={values.productId}
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                class="box"
              >
                <option value="" label="Select Product Name">
                  Select Product Name{" "}
                </option>
            {productData.map(option => (
              <option key={option.id} value={option.productName}>
                {option.productName}
              </option>
              ))}
                </select>
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <select
                fullWidth
                sx={{ gridColumn: "span 4" }}
                name="vendorName"
                id={values.customerId}
                value={values.vendorName}
                onChange={handleChange}
                onBlur={handleBlur}
                class="box"
              >
                <option value="" label="Select Vendor Name">
                  Select Vendor Name{" "}
                </option>
            {customerData.map(option => (
              <option key={option.id} value={option.vendorName}>
                {option.vendorName}
              </option>
              ))}
                </select>
                
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Order
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const initialValues = {
    productName: "", // Initialize with an empty string
    quantity: 0, // Initialize with a default value
    vendorName: "", // Initialize with an empty string
    productId: "", // Initialize with an empty string
    date: null, // Initialize as null for Firebase Timestamp
    customerId: "", // Initialize with an empty string
  };

  // Your validation schema should match the form fields
  const checkoutSchema = yup.object().shape({
    productName: yup.string().required("Product Name is required"),
    quantity: yup.number().required("Quantity is required"),
    vendorName: yup.string().required("Vendor Name is required"),
    // Add other validation rules as needed
  });
export default AddInventory;
