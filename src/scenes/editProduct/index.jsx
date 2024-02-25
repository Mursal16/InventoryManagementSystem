import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import db from '../../firebase'; // Assuming you have the Firebase configuration
import Header from '../../components/Header';
import { Box, TextField, Button } from '@mui/material';
import { Field,Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get the "id" parameter from the URL
  const history = useNavigate(); // For navigation after updating
  const [product, setProduct] = useState(null);
//   const fetchBlogs=async()=>{
//     const response=db.collection('vendors');
//     const data=await response.get();
//     setCounter((oldValue) => oldValue+1);
//     data.docs.forEach(item=>{
//      setTableData(tableData =>[...tableData,item.data()])
//     })
//   }
//   useEffect(() => {
//     if (dataFetchedRef.current) return;
//       dataFetchedRef.current = true;
//   setTableData([]);
//   fetchBlogs();
//   }, [])

  useEffect(() => {
    const fetchProduct = async () => {
        console.log(id);
      try {
        const productDoc = await db.collection('products').doc(id.trim()).get();
        if (productDoc.exists) {
          setProduct({ ...productDoc.data(), id: productDoc.id.trim() });
        } else {
          // Handle case where product doesn't exist
          console.log("unable to fetch");
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Handle error
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await db.collection('products').doc(id.trim()).update(product);
      history('/invoices');
      // Navigate back to the list of products after updating// Update the route as needed
    } catch (error) {
      // Handle error
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Header title="Edit Product" />
      <form>
        <TextField
          label="Product Name"
          fullWidth
          value={product.productName}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
        />
        <TextField
                label="Cost Price"
                fullWidth
                value={product.costPrice}
                onChange={(e) =>
                    setProduct({ ...product, costPrice: e.target.value,profitMargin:product.salePrice-e.target.value })
                  }
              />
              <TextField
                fullWidth
                label="Sale Price"
                value={product.salePrice}
                onChange={(e) =>
                    setProduct({ ...product, salePrice: e.target.value ,profitMargin:e.target.value-product.costPrice})
                  }
              />
              <TextField
                fullWidth
                label="Quantity"
                value={product.quantity}
                onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
              />
        {/* Add more input fields for other product details */}
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Product
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
