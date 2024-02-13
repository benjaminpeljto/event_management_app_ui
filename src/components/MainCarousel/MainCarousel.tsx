import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../assets/ts/theme";
import marija from "../../assets/temp_carousel_items/Marija_Tuzla.png";
import graso from "../../assets/temp_carousel_items/Petarg.jpg";
import kovacevic from "../../assets/temp_carousel_items/SasaCoverKupikartu.png";

export default function MainCarousel() {
  const isNotMobile = useMediaQuery("(min-width: 970px)");
  const carouselImages = [marija, graso, kovacevic];
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {carouselImages.map((texture, index) => (
        <Box mt={8} key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: isNotMobile ? "700px" : "auto",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color='white'
            padding='20px'
            borderRadius='1px'
            textAlign='left'
            bgcolor='rgb(0, 0, 0, 0.4)'
            position='absolute'
            top='46%'
            left={isNotMobile ? "10%" : "0"}
            right={isNotMobile ? undefined : "0"}
            margin={isNotMobile ? undefined : "0 auto"}
            maxWidth={isNotMobile ? undefined : "240px"}
          >
            <Typography color={shades.secondary[200]}>--NEW EVENTS</Typography>
            <Typography variant='h1'>From Music to Sports</Typography>
            <Typography
              fontWeight='bold'
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Discover below
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
}
