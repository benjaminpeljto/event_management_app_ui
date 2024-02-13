import React from "react";
import { type EventDetails } from "../../utils/types";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

type EventCardProps = {
  event: EventDetails;
};

export default function EventCard(props: EventCardProps) {
  const {
    id,
    name,
    eventCategory,
    seatsPerTicketType,
    image,
    totalAvailableSeats,
    location,
  } = props.event;
  const regularTicket = seatsPerTicketType.find(
    (ticket) => ticket.ticketType === "REGULAR"
  );

  const typePrice = regularTicket?.typePrice;

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const theme = useTheme();

  const overlayStyle = {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)",
    color: "#FFF",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.5s ease-out, visibility 0s 0.5s",
  };

  const overlayVisibleStyle = {
    ...overlayStyle,
    opacity: 1,
    visibility: "visible",
    transition: "opacity 0.17s ease-in",
  };

  return (
    <Box
      width='350px'
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      sx={{
        cursor: "pointer",
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
      }}
    >
      <img
        alt={`${name} image`}
        width='100%'
        height='250px'
        src={image}
        onClick={() => navigate(`/event/${id}`)}
        style={{ borderRadius: theme.shape.borderRadius, objectFit: "cover" }}
      />
      <Box sx={isHovered ? overlayVisibleStyle : overlayStyle}>
        <Typography variant='body2' component='div'>
          Available seats: {totalAvailableSeats}
        </Typography>
      </Box>
      <Box mt={1} px={1}>
        <Typography variant='subtitle2' color='textSecondary'>
          {eventCategory}
        </Typography>
        <Typography noWrap>
          {name} - {location}
        </Typography>
        <Typography fontWeight='bold'>From {typePrice}KM</Typography>
      </Box>
    </Box>
  );
}
