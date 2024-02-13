import { Box, Typography } from "@mui/material";
import { type TicketReturnType } from "../../utils/types";

type UserTicketProps = {
  ticket: TicketReturnType;
};

export default function UserTicket(props: UserTicketProps) {
  const { id, ticketType, price, event, createdAt } = props.ticket;
  return (
    <Box
      border='1px solid #ccc'
      padding='16px'
      marginBottom='16px'
      borderRadius='8px'
    >
      <Typography variant='h6'>
        <b>Ticket ID:</b> {id}
      </Typography>
      <Typography variant='body1'>
        <b>Ticket Type:</b> {ticketType}
      </Typography>
      <Typography variant='body1'>
        <b>Price:</b> {price}KM
      </Typography>
      <Typography variant='body1'>
        <b>Event:</b> {event.title}
      </Typography>
      <Typography variant='body2'>
        <b>Created At:</b> {createdAt}
      </Typography>
    </Box>
  );
}
