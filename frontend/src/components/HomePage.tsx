import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Root = styled("div")({
  minHeight: "100vh",
  backgroundImage: "url(https://source.unsplash.com/random)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Content = styled(Container)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  padding: "2rem",
  borderRadius: "8px",
  textAlign: "center",
}));

const ButtonBox = styled(Box)({
  marginTop: "1rem",
});

const HomePage: React.FC = () => {
  return (
    <Root>
      <Content maxWidth="sm">
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Web Connect
        </Typography>
        <Typography variant="h6" component="h1" gutterBottom>
          Connect with your loved ones
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Please login or signup to continue
        </Typography>
        <ButtonBox>
          <Button
            variant="contained"
            color="primary"
            href="/login"
            style={{ margin: "0.5rem" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href="/signup"
            style={{ margin: "0.5rem" }}
          >
            Signup
          </Button>
        </ButtonBox>
      </Content>
    </Root>
  );
};

export default HomePage;
