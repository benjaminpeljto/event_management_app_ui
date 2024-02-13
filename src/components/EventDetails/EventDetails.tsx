import { Box, Typography, Button } from "@mui/material";
import { type EventDetails as EventDetailsType } from "../../utils/types";
import { ShoppingCart } from "@mui/icons-material";
import { formatDate, formatTime } from "../../utils/dateFormatter";
import { useAuthSelector, useCartDispatch } from "../../store/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../store/cart-slice";

type EventDetailsProps = {
  event: EventDetailsType;
};
export default function EventDetails(props: EventDetailsProps) {
  const { id, name, image, location, description, occuranceDateTime } =
    props.event;
  const { userToken } = useAuthSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useCartDispatch();

  const handleBuyTicketsButtonClick = () => {
    if (userToken) {
      navigate("/tickets/" + id);
      dispatch(resetCart());
    } else {
      navigate("/login");
      toast.warning("You need to be logged in to buy tickets.", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        <Box
          flex='1 1 65%'
          mb='120px'
          style={{ display: "flex", flexDirection: "column", height: "80%" }}
        >
          <img
            src={image}
            alt={name}
            width='100%'
            height='80%'
            style={{ objectFit: "contain", verticalAlign: "top" }}
          />
          <Box m='20px 0 90px 0' flex='1 2 70%' rowGap={2}>
            <Typography variant='h2' mb={2}>
              {name}
            </Typography>
            <Typography>
              <b>Datum:</b> {formatDate(occuranceDateTime)}
            </Typography>
            <Typography>
              <b>Mjesto:</b> {location}
            </Typography>
            <Typography sx={{ mt: "20px" }}>{description}</Typography>
          </Box>
        </Box>

        <Box flex='1 1 10%' mb='40px'>
          <Box mb='90px'>Home/Event/{name}</Box>
          <Box display='flex' justifyContent='space-between'>
            <Box bgcolor='red' color='white' p={3} mb={2}>
              <Typography variant='h2' mb={2}>
                Step 1/4
              </Typography>
              <Typography mb={2}>
                Clicking on the <b>Buy tickets</b> button you are starting the
                process of buying tickets for the <b>{name}</b> on the date of:{" "}
                <b>{formatDate(occuranceDateTime)}</b> at{" "}
                <b>{formatTime(occuranceDateTime)}</b>.
              </Typography>
              {/* Buy Tickets Button */}
              <Button
                variant='contained'
                sx={{ color: "whitesmoke" }}
                startIcon={<ShoppingCart />}
                onClick={handleBuyTicketsButtonClick}
              >
                Buy tickets
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
