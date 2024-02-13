import { Box, Typography, useTheme } from "@mui/material";
import { shades } from "../../assets/ts/theme";

export default function Footer() {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box
      mt='70px'
      p='40px 0'
      bgcolor={neutral?.light}
      display='flex'
      flexDirection='column'
    >
      <Box
        flex='1'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box
          width='80%'
          margin='auto'
          display='flex'
          justifyContent='space-between'
          flexWrap='wrap'
          rowGap='30px'
          columnGap='clamp(20px, 30px, 40px)'
        >
          <Box width='clamp(250px, 30%, 40%)' maxWidth='100%'>
            <Typography
              variant='h4'
              fontWeight='bold'
              mb='30px'
              color={shades.secondary[500]}
            >
              BuyTicket.ba
            </Typography>
            <div>
              BuyTicket.ba is a <b>full-stack university project</b> made by
              Benjamin Peljto as a part of Web Engineering course at
              International Burch University. It aims to develop a <b>better</b>{" "}
              Event Management web app than the existing ones by enhancing UI
              and UX. <b>Tech-stack</b> used includes React+TS, Java Spring
              Boot, and MongoDB.
            </div>
          </Box>
          <Box width='clamp(250px, 30%, 40%)' maxWidth='100%'>
            <Typography variant='h4' fontWeight='bold' mb='30px'>
              About Developer
            </Typography>
            <Typography mb='20px'>Benjamin Peljto</Typography>
            <Typography mb='20px'>Email: benjaminpeljto00@gmail.com</Typography>
            <Typography mb='20px'>City: Sarajevo</Typography>
            <Typography mb='20px'>Phone: +387 62 854 897</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
