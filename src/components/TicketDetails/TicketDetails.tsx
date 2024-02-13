import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { EventDetails, TicketType } from "../../utils/types";
import { formatDate, formatTime } from "../../utils/dateFormatter";
import React, { useState } from "react";
import { useCartDispatch } from "../../store/hooks";
import { addEvent } from "../../store/cart-slice";

type TicketDetailsProps = {
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

export default function TicketDetails(props: TicketDetailsProps) {
  const dispatch = useCartDispatch();
  const { id, name, occuranceDateTime, location, seatsPerTicketType } =
    props.event;
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<string, number>
  >(
    seatsPerTicketType.reduce((acc, seat) => {
      acc[seat.ticketType] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleIncrement = (ticketType: string) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketType]: prevQuantities[ticketType] + 1,
    }));
  };

  const handleDecrement = (ticketType: string) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketType]: Math.max(0, prevQuantities[ticketType] - 1),
    }));
  };

  const calculateFinalPrice = () => {
    let totalPrice = 0;

    seatsPerTicketType.forEach((seat) => {
      totalPrice += seat.typePrice * selectedQuantities[seat.ticketType];
    });

    return totalPrice;
  };

  const handleChooseTickets = () => {
    const selectedTicketTypes = Object.keys(selectedQuantities).map(
      (ticketType) => ({
        ticketType: ticketType as TicketType,
        quantity: selectedQuantities[ticketType],
      })
    );
    dispatch(
      addEvent({
        eventId: id,
        ticketTypes: selectedTicketTypes,
        totalPrice: calculateFinalPrice(),
      })
    );
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

        <List sx={style}>
          {seatsPerTicketType.map((seat, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={seat.ticketType}
                  secondary={`Tickets Left: ${seat.quantity}`}
                />
                <Box display='flex' alignItems='center'>
                  <Button onClick={() => handleDecrement(seat.ticketType)}>
                    -
                  </Button>
                  <Typography mx={1}>
                    {selectedQuantities[seat.ticketType]}
                  </Typography>
                  <Button onClick={() => handleIncrement(seat.ticketType)}>
                    +
                  </Button>
                </Box>
              </ListItem>
              {index < seatsPerTicketType.length - 1 && (
                <Divider variant='middle' component='li' />
              )}
            </React.Fragment>
          ))}
        </List>

        <Box mt={2} mb={3}>
          <Typography variant='h6'>Total: {calculateFinalPrice()}KM</Typography>
        </Box>

        <Box mt={3} display='flex' justifyContent='center'>
          <Box>
            <Button
              variant='contained'
              color='error'
              onClick={handleChooseTickets}
            >
              Choose payment method
            </Button>
          </Box>
        </Box>
      </Box>

      <Box flex='1 1 10%' mb='40px'>
        <Box display='flex' justifyContent='space-between'>
          <Box bgcolor='red' color='white' p={3} mb={2}>
            <Typography variant='h2' mb={2}>
              Step 2/4
            </Typography>
            <Typography mb={2}>
              You're currently in the process of buying tickets for the{" "}
              <b>{name}</b> on the date of:{" "}
              <b>{formatDate(occuranceDateTime)}</b> at{" "}
              <b>{formatTime(occuranceDateTime)}</b>. <br />
              <br /> You have the option to select ticket quantities from
              various categories (if available), and they will be combined later
              during the checkout.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
