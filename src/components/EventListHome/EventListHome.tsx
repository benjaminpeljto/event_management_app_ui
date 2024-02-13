import React, { useState, useEffect } from "react";
import { EventService } from "../../services";
import { Tabs, Tab, Box, Typography, useMediaQuery } from "@mui/material";
import { useEventsDispatch, useEventsSelector } from "../../store/hooks";
import {
  fetchEventsError,
  fetchEventsStart,
  fetchEventsSuccess,
} from "../../store/events-slice";
import EventCard from "../EventCard";

export default function EventListHome() {
  const dispatch = useEventsDispatch();
  const events = useEventsSelector((state) => state.events.events);
  const [filterOption, setFilterOption] = useState("all");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  function handleFilterChange(
    _event: React.ChangeEvent<object>,
    newValue: string
  ) {
    setFilterOption(newValue);
  }

  useEffect(() => {
    dispatch(fetchEventsStart());
    EventService.getOngoingEvents()
      .then((data) => {
        dispatch(fetchEventsSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchEventsError(error.message));
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  // Filter events based on the category
  const filteredEvents = events.filter((event) => {
    if (filterOption === "all") return true;
    if (filterOption === "music")
      return event.eventCategory === "GIG" || event.eventCategory === "CONCERT";
    if (filterOption === "sport") return event.eventCategory === "SPORT";
    if (filterOption === "theater") return event.eventCategory === "THEATER";
    if (filterOption === "food") return event.eventCategory === "FOOD";
    if (filterOption === "seminar") return event.eventCategory === "SEMINAR";
    if (filterOption === "festival") return event.eventCategory === "FESTIVAL";
    return false;
  });

  return (
    <Box width='80%' margin='80px auto'>
      <Typography variant='h2' textAlign='center'>
        <b>Featured Events</b>
      </Typography>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={filterOption}
        onChange={handleFilterChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label='LATEST' value='all' sx={{ fontSize: "1.2rem" }} />
        <Tab label='MUSIC' value='music' sx={{ fontSize: "1rem" }} />
        <Tab label='SPORT' value='sport' sx={{ fontSize: "1rem" }} />
        <Tab label='THEATER' value='theater' sx={{ fontSize: "1rem" }} />
        <Tab label='FOOD' value='food' sx={{ fontSize: "1rem" }} />
        <Tab label='SEMINAR' value='seminar' sx={{ fontSize: "1rem" }} />
        <Tab label='FESTIVAL' value='festival' sx={{ fontSize: "1rem" }} />
      </Tabs>

      <Box
        margin='0 auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fill, 350px)'
        justifyContent='space-around'
        rowGap='20px'
        columnGap='1.33%'
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard event={event} key={event.id} />
          ))
        ) : (
          <Typography
            variant='h6'
            textAlign='center'
            sx={{ gridColumn: "1 / -1", marginBottom: "60px" }}
          >
            No events available.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
