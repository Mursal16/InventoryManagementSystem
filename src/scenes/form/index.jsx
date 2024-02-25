import { Box, Button, TextField } from "@mui/material";
import { Field,Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import db from "../../firebase";
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate=useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      db.collection("mockDataTeam")
          .doc(uuidv4())
          .set( {
        name: values.name,
        age: values.age,
        access: values.accesslevel,
        phone: values.phone,
        email:values.email,
        id:uuidv4()
      }).then(() => {
        alert("Account Created");
        navigate('/team');
      }) 
    }
    catch (err) {
      alert(err)
      console.log(err)
    }
  }

  return (
    <Box m="20px">
      <Header title="ADD NEW TEAM MEMBER" subtitle="Create a New Member Profile" />

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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                <select
                name="accesslevel"
                value={values.accesslevel}
                onChange={handleChange}
                onBlur={handleBlur}
                class="box"
              >
                <option value="" label="Select Access Level">
                  Select Access Level{" "}
                </option>
                <option value="admin" label="admin">
                  {" "}
                  admin
                </option>
                <option value="manager" label="manager">
                  manager
                </option>
                <option value="user" label="user">
                  user
                </option>
                </select>
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Access Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accesslevel}
                name="accesslevel"
                error={!!touched.accesslevel && !!errors.accesslevel}
                helperText={touched.accesslevel && errors.accesslevel}
                sx={{ gridColumn: "span 4" }}
              /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
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
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  age: yup.string().required("required"),
  accesslevel: yup.string().required("required"),
});
const initialValues = {
  name: "",
  age: "",
  email: "",
  phone: "",
  accesslevel: "",
};

export default Form;
