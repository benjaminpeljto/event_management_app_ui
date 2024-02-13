import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { type DashBoardProps, type EventDetails } from "../utils/types";
import { Box } from "@mui/material";
import { EventService } from "../services";
import { toast } from "react-toastify";
import { EventControl } from "../components/EventControl";
import { useEffect } from "react";

export default function DashboardAdmin(props: DashBoardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.userType !== "ADMIN") {
      navigate("/");
    }
  }, [props.userType, navigate]);

  const { data: pendingEvents, error } = useQuery<EventDetails[]>(
    "pendingEvents",
    EventService.getAllEvents
  );

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);

  return (
    <Box width='80%' margin='80px auto'>
      {pendingEvents?.map((event: EventDetails) => (
        <Box key={event.id} marginBottom={2}>
          <EventControl event={event} />
        </Box>
      ))}
    </Box>
  );
}
