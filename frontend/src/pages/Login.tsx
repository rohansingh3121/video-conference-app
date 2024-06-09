import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
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

const LoginContainer = styled(Container)(({ theme }) => ({
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
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/login",
          values
        );
        if (response.data) {
          navigate("/host");
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });

  return (
    <Root>
      <LoginContainer>
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
              Login
            </Typography>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Please enter registered email Id"
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
              Sign in
            </Button>
            <Typography variant="body2" align="center" mt={2}>
              Are you new? <Link href="/signup">Create an Account</Link>
            </Typography>
          </form>
        </FormContainer>
      </LoginContainer>
    </Root>
  );
};

export default Login;
