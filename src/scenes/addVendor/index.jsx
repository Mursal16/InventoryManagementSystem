import { Box, Button, TextField } from "@mui/material";
import { Field,Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import db from "../../firebase";
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Vendor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate=useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      db.collection("vendors")
          .doc(uuidv4())
          .set( {
        address:values.address,
        vendorName:values.vendorName,
        contactName:values.contactName,
        city: values.city,
        age: values.age,
        phone: values.phone,
        email:values.email,
        id:uuidv4()
      }).then(() => {
        alert("Vendor Added");
        navigate('/contacts')
      }) 
    }
    catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return (
    <Box m="20px">
      <Header title="CREATE VENDOR" subtitle="Create a New Vendor Profile" />

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
                label="Vendor Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vendorName}
                name="vendorName"
                error={!!touched.vendorName && !!errors.vendorName}
                helperText={touched.vendorName && errors.vendroName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactName}
                name="contactName"
                error={!!touched.contactName && !!errors.contactName}
                helperText={touched.contactName && errors.contactName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Vendor
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  vendorName: yup.string().required("required"),
  email: yup.string().email("invalid email"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  age: yup.string().required("required"),
  city: yup.string().required("required"),
  address: yup.string().required("required"),
  contactName: yup.string().required("required"),
});
const initialValues = {
    address:"",
    vendorName:"",
    contactName:"",
    city: "",
    age: "",
    phone: "",
    email:"",
};

export default Vendor;
