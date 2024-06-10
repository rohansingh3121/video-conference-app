import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";

const Root = styled("div")({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E3F2FD",
});

const SignupContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  maxWidth: "600px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  flex: 1,
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F5F5F5",
  borderTopLeftRadius: theme.spacing(2),
  borderBottomLeftRadius: theme.spacing(2),
}));

const IllustrationImage = styled("img")({
  width: "80%",
  marginBottom: "20px",
});

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/signup",
          values
        );
        if (response.data) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Signup failed", error);
      }
    },
  });

  return (
    <Root>
      <SignupContainer>
        <IllustrationContainer>
          <IllustrationImage
            src="../../png-logo/logo-white.png"
            alt="Website Logo"
          />
          <Typography variant="h5" component="h1">
            Web Connect
          </Typography>
          <Typography variant="subtitle1" component="h2">
            Connect with your loved ones
          </Typography>
        </IllustrationContainer>
        <FormContainer>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5" component="h1" gutterBottom>
              Signup
            </Typography>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Signup
            </Button>
            <Typography variant="body2" align="center" mt={2}>
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </form>
        </FormContainer>
      </SignupContainer>
    </Root>
  );
};

export default Signup;
