import { Box, Button, TextField } from "@mui/material";
import { Field,Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import db from "../../firebase";
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const history = useNavigate();
  var finalid=uuidv4();
  const handleFormSubmit = async (values) => {
    try {
      db.collection("products")
          .doc(finalid)
          .set( {
        productName:values.productName,
        salePrice: values.salePrice,
        costPrice: values.costPrice,
        profitMargin: values.salePrice-values.costPrice,
        quantity:values.quantity,
        id:finalid
      }).then(() => {
        alert("Product Added");
        history('/invoices');
      }) 
    }
    catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return (
    <Box m="20px">
      <Header title="Add Product" subtitle="Add a New Product" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productName}
                name="productName"
                error={!!touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cost Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.costPrice}
                name="costPrice"
                error={!!touched.costPrice && !!errors.costPrice}
                helperText={touched.costPrice && errors.costPrice}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sale Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salePrice}
                name="salePrice"
                error={!!touched.salePrice && !!errors.salePrice}
                helperText={touched.salePrice && errors.salePrice}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  productName: yup.string().required("required"),
  costPrice:yup.number().integer().required("required"),
  salePrice: yup.number().integer().required("required"),
  quantity: yup.number().integer().required("required"),
});
const initialValues = {
    productName:"",
    costPrice:0,
    salePrice:0,
    quantity:0,
};

export default Product;
