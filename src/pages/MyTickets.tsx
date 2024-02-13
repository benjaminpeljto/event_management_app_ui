import { useEffect, useState } from "react";
import { TicketReturnType } from "../utils/types";
import { TicketService } from "../services";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import { UserTicket } from "../components/UserTicket";

export default function MyTickets() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myTickets, setMyTickets] = useState<TicketReturnType[]>([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setIsLoading(true);
    TicketService.getUserTickets()
      .then((data) => {
        setMyTickets(data);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box width={isNonMobile ? "40%" : "80%"} m='80px auto'>
      <Typography variant='h2' sx={{ fontWeight: "bold" }}>
        Your tickets:
      </Typography>
      {isLoading && (
        <Box mt={4} display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      )}
      <Box mt={6}>
        {myTickets.length > 0 ? (
          myTickets.map((ticket) => (
            <UserTicket key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <Typography
            variant='h6'
            textAlign='center'
            sx={{ marginTop: "20px" }}
          >
            You don't have any bought tickets.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
