import { useState } from "react";
import { type EventDetails } from "../../utils/types";
import {
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { EventService } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type EventControlProps = {
  event: EventDetails;
};

export default function EventControl({ event }: EventControlProps) {
  const navigate = useNavigate();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(
    event.eventStatus === "ONGOING"
  );

  const handleSwitchChange = () => {
    EventService.setEventToLive(event.id)
      .then(() => {
        setIsSwitchOn(true);
        toast.success("Event " + event.name + " is now live!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='div'>
          {event.name}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Description:</strong> {event.description}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Location:</strong> {event.location}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Category:</strong> {event.eventCategory}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Organizer:</strong> {event.organizer.name}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Date and Time:</strong> {event.occuranceDateTime}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Status:</strong> {event.eventStatus}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Total Available Seats:</strong> {event.totalAvailableSeats}
        </Typography>
        <Typography color='text.secondary'>
          <strong>Image:</strong>{" "}
          <img src={event.image} width={500} alt='Event' />
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              name='eventStatusSwitch'
              color='primary'
              disabled={event.eventStatus !== "PENDING_APPROVAL"}
            />
          }
          label='Change Event Status'
        />
      </CardContent>
    </Card>
  );
}
