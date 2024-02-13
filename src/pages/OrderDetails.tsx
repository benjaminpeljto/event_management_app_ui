import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventDetails } from "../utils/types";
import { EventService } from "../services";
import { Box, CircularProgress, Typography } from "@mui/material";
import { TicketDetails } from "../components/TicketDetails";
import { useCartSelector } from "../store/hooks";
import { PaymentType } from "../components/PaymentType";

export default function OrderDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventDetails>();
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const cart = useCartSelector((state) => state.cart);

  useEffect(() => {
    if (eventId) {
      setIsEventLoading(true);
      EventService.getEventById(eventId)
        .then((data) => {
          setEvent(data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsEventLoading(false);
        });
    }
  }, [eventId]);

  return (
    <Box width='80%' m='80px auto'>
      {isEventLoading && (
        <Box mt={4} display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}
      {event && !cart.eventId && <TicketDetails event={event} />}
      {event && cart.eventId && <PaymentType event={event} />}
      {error && <Typography>{error.message}</Typography>}
    </Box>
  );
}
