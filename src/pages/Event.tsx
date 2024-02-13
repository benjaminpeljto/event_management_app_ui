import { useEffect, useState } from "react";
import { type EventDetails as EventDetailsType } from "../utils/types";
import { useParams } from "react-router-dom";
import { EventService } from "../services";
import { EventDetails } from "../components/EventDetails";
import { Box } from "@mui/material";

export default function Event() {
  const [event, setEvent] = useState<EventDetailsType>();
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      setIsEventLoading(true);
      EventService.getEventById(eventId)
        .then((data) => {
          setEvent(data);
          setIsEventLoading(false);
        })
        .catch((error: Error) => {
          setError(error);
        });
    }
  }, [eventId]);

  if (isEventLoading) {
    return <Box>Loading...</Box>;
  }
  if (error) {
    return <Box>There has been an error: {error.message}</Box>;
  }

  if (!event) {
    return <h2>Error loading</h2>;
  }
  return <EventDetails event={event} />;
}
