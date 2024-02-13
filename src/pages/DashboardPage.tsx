import { useNavigate } from "react-router-dom";
import { type DashBoardProps } from "../utils/types";
import { Box, Divider, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { AddEvent } from "../components/AddEvent";

export default function DashboardPage(props: DashBoardProps) {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (props.userType === "MEMBER" || props.userType === "GUEST") {
      navigate("/");
    }
  }, [props.userType, navigate]);

  return (
    <>
      <Box width='80%' margin='80px auto'>
        <Box display='flex' justifyContent='center'>
          <Box width={isNonMobile ? "40%" : "100%"}>
            <AddEvent />
          </Box>
        </Box>
      </Box>

      <Divider />

      {}
    </>
  );
}
