import { useNavigate } from "react-router-dom";
import { type DashBoardProps, type EventDetails } from "../utils/types";
import { Box } from "@mui/material";
import { EventService } from "../services";
import { toast } from "react-toastify";
import { EventControl } from "../components/EventControl";
import { useEffect, useState } from "react";

export default function DashboardAdmin(props: DashBoardProps) {
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState<EventDetails[]>([]);

  useEffect(() => {
    if (props.userType !== "ADMIN") {
      navigate("/");
    }
  }, [props.userType, navigate]);

  useEffect(() => {
    EventService.getAllEvents()
      .then((data) => {
        setAllEvents(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  });

  return (
    <Box width='80%' margin='80px auto'>
      {allEvents?.map((event: EventDetails) => (
        <Box key={event.id} marginBottom={2}>
          <EventControl event={event} />
        </Box>
      ))}
    </Box>
  );
}
