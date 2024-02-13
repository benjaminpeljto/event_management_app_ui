import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useEventsDispatch, useEventsSelector } from "../store/hooks";
import {
  fetchEventsError,
  fetchEventsStart,
  fetchEventsSuccess,
} from "../store/events-slice";
import { EventService } from "../services";
import EventCard from "../components/EventCard";

type CategoryListProps = {
  category: string;
};

const Events = (props: CategoryListProps) => {
  const { category } = props;
  const dispatch = useEventsDispatch();
  const events = useEventsSelector((state) => state.events.events);

  useEffect(() => {
    dispatch(fetchEventsStart());
    EventService.getOngoingEventsByCategory(category)
      .then((data) => {
        dispatch(fetchEventsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchEventsError(error.message));
      });
  }, [category, dispatch]);

  return (
    <Box width='80%' m='80px auto'>
      <Typography variant='h2' sx={{ fontWeight: "bold" }}>
        {category.toUpperCase()}
      </Typography>
      <Box mt={6}>
        <Box
          margin='0 auto'
          display='grid'
          gridTemplateColumns='repeat(auto-fill, 350px)'
          justifyContent='space-around'
          rowGap='20px'
          columnGap='1.33%'
        >
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <Typography
              variant='h6'
              textAlign='center'
              sx={{ gridColumn: "1 / -1", marginBottom: "330px" }}
            >
              No events available. <b>:(</b>
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
