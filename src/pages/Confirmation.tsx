import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Confirmation = () => {
  return (
    <Box m='90px auto' width='80%' height='50vh'>
      <Alert severity='success'>
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>
          Please check your email where you can soon find the tickets in the
          attachment!
        </strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
