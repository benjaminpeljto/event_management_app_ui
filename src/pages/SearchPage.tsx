import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EventDetails } from "../utils/types";
import { EventService } from "../services";
import EventCard from "../components/EventCard";
import { toast } from "react-toastify";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [searchedEvents, setSearchedEvents] = useState<EventDetails[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    EventService.getOngoingEventsByKeyword(searchParams.get("query") ?? "")
      .then((data) => {
        setSearchedEvents(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  if (error != "") {
    toast.error(error);
  }

  return (
    <Box width='80%' m='80px auto'>
      <Typography variant='h2' sx={{ fontWeight: "bold" }}>
        Search...
      </Typography>
      {isLoading && (
        <Box mt={4} display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Box mt={6}>
          <Box
            margin='0 auto'
            display='grid'
            gridTemplateColumns='repeat(auto-fill, 350px)'
            justifyContent='space-around'
            rowGap='20px'
            columnGap='1.33%'
          >
            {searchedEvents?.length ?? 0 > 0 ? (
              searchedEvents?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <Typography
                variant='h6'
                textAlign='center'
                sx={{
                  gridColumn: "1 / -1",
                  marginBottom: "330px",
                }}
              >
                No events available. <b>:(</b>
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
