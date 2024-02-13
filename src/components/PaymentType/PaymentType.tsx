import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { type PaymentType, type EventDetails } from "../../utils/types";
import { formatDate, formatTime } from "../../utils/dateFormatter";
import { useCartDispatch, useCartSelector } from "../../store/hooks";
import React, { useState } from "react";
import { updatePaymentType } from "../../store/cart-slice";
import { OrderService } from "../../services";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { ShoppingCart } from "@mui/icons-material";

type PaymentTypeProps = {
  event: EventDetails;
};

const style = {
  py: 0,
  width: "100%",
  maxWidth: "88%",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

export default function PaymentType(props: PaymentTypeProps) {
  const { name, location, occuranceDateTime } = props.event;
  const cart = useCartSelector((state) => state.cart);
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);

  const handlePaymentTypeChange = (event: SelectChangeEvent<PaymentType>) => {
    dispatch(updatePaymentType(event.target.value as PaymentType));
  };

  const handleFinishPurchase = () => {
    setIsLoadingOrder(true);
    if (cart.eventId) {
      OrderService.postOrder({
        eventId: cart.eventId,
        ticketTypes: cart.ticketTypes,
      })
        .then(() => {
          setTimeout(() => {
            setIsLoadingOrder(false);
            navigate("/checkout/success");
          }, 2000);
        })
        .catch((error) => {
          setIsLoadingOrder(false);
          toast.error("Error sending order.. Please try to log in again.");
          toast.error(error.message);
        });
    }
  };

  return (
    <Box display='flex' flexWrap='wrap' columnGap='40px'>
      <Box
        flex='1 1 65%'
        mb='120px'
        style={{ display: "flex", flexDirection: "column", height: "80%" }}
      >
        <Box m='20px 0 50px 0' flex='1 2 70%' rowGap={2}>
          <Typography variant='h2' mb={0.3}>
            {name}
          </Typography>
          <Typography pl={2}>{location}</Typography>
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <List sx={style}>
            {cart.ticketTypes.map((ticket, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={ticket.ticketType}
                    secondary={`Quantity: ${ticket.quantity}`}
                  />
                </ListItem>
                {index < cart.ticketTypes.length - 1 && (
                  <Divider variant='middle' component='li' />
                )}
              </React.Fragment>
            ))}
          </List>

          <FormControl fullWidth sx={{ mb: 5, ml: 3 }}>
            <InputLabel
              id='payment-type-label'
              sx={{
                paddingRight: "5px",
                paddingLeft: "5px",
                background: "white",
                zIndex: 1,
              }}
            >
              Payment Type
            </InputLabel>
            <Select
              labelId='payment-type-label'
              id='payment-type-select'
              value={cart.paymentType}
              onChange={handlePaymentTypeChange}
            >
              <MenuItem value='CREDIT_CARD'>Credit Card</MenuItem>
              <MenuItem value='BANK_TRANSFER'>Bank Transfer</MenuItem>
              <MenuItem value='PAYPAL'>PayPal</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mt={2} mb={3}>
          <Typography variant='h6'>Total: {cart.totalPrice}KM</Typography>
        </Box>

        <Box mt={3} display='flex' justifyContent='center'>
          <Box>
            <LoadingButton
              color='secondary'
              onClick={handleFinishPurchase}
              loading={isLoadingOrder}
              loadingPosition='start'
              startIcon={<ShoppingCart />}
              variant='contained'
            >
              <span>Finish purchase</span>
            </LoadingButton>
          </Box>
        </Box>
      </Box>

      <Box flex='1 1 10%' mb='40px'>
        <Box display='flex' justifyContent='space-between'>
          <Box bgcolor='red' color='white' p={3} mb={2}>
            <Typography variant='h2' mb={2}>
              Step 4/4
            </Typography>
            <Typography mb={2}>
              You're currently in the process of buying tickets for the{" "}
              <b>{name}</b> on the date of:{" "}
              <b>{formatDate(occuranceDateTime)}</b> at{" "}
              <b>{formatTime(occuranceDateTime)}</b>. <br />
              <br /> Last option to choose is the preferred payment type. After
              clicking <b>Finish purchase</b> button, your order will be
              completed!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
