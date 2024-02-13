import { Typography, Container } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth='sm' style={{ marginTop: "6rem", textAlign: "center" }}>
      <Typography variant='h2' component='h1' gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant='body1'>
        We're sorry, but the page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
