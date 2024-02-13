import { Box, IconButton, InputBase, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../assets/ts/theme";
import {
  Dashboard,
  LocalActivity,
  MenuOutlined,
  Person,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import logo from "../../assets/img/logo.png";
import { useState, MouseEvent } from "react";
import { useAuthDispatch, useAuthSelector } from "../../store/hooks";
import { logout } from "../../store/auth-slice";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { userToken, userType } = useAuthSelector((state) => state.auth);
  const dispatch = useAuthDispatch();
  const [personIconAnchor, setPersonIconAnchor] = useState<HTMLElement | null>(
    null
  );
  const [searchBarActive, setSearchBarActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    handleMenuClose();
  };

  const handlePersonItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!userToken) {
      navigate("/login");
    } else {
      setPersonIconAnchor(event.currentTarget);
    }
  };

  const handlePersonItemClose = () => {
    setPersonIconAnchor(null);
  };

  const handlePersonItemsClick = (action: string) => {
    if (action === "logout") {
      dispatch(logout());
      navigate("/");
      handlePersonItemClose();
    } else {
      navigate(action);
      handlePersonItemClose();
    }
  };

  const handleSearchButtonClicked = () => {
    setSearchBarActive(!searchBarActive);
    setSearchQuery("");
  };

  const handleSearch = () => {
    if (searchQuery !== "") {
      const searchUrl = `/search?query=${encodeURIComponent(searchQuery)}`;
      navigate(searchUrl);
    }
  };

  const handleTicketsIconClick = () => {
    navigate("/mytickets");
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      height='60px'
      color='black'
      bgcolor='rgba(255, 255, 255, 0.95)'
      position='fixed'
      top='0'
      left='0'
      zIndex='1'
    >
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.primary[500]}
          onClick={() => navigate("/")}
        >
          <img src={logo} alt='buyticket logo' />
          <span> </span>
          <b style={{ fontSize: "1rem" }}>BuyTicket.ba</b>
        </Box>

        <Box
          display='flex'
          justifyContent='space-between'
          columnGap='20px'
          zIndex='2'
        >
          {searchBarActive && (
            <InputBase
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                outline: "0.1px solid #D3D3D3",
                borderRadius: "4px",
                paddingLeft: "5px",
              }}
            />
          )}

          <IconButton
            onClick={handleSearchButtonClicked}
            sx={{ color: "black" }}
          >
            <SearchOutlined />
          </IconButton>

          <IconButton onClick={handlePersonItemClick} sx={{ color: "black" }}>
            {userToken ? <Person /> : <PersonOutlined />}
          </IconButton>

          <Menu
            anchorEl={personIconAnchor}
            open={Boolean(personIconAnchor)}
            onClose={handlePersonItemClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ zIndex: 3 }}
          >
            <MenuItem
              sx={{ color: "red" }}
              onClick={() => handlePersonItemsClick("logout")}
            >
              Log out
            </MenuItem>
          </Menu>

          {userToken && (userType === "ADMIN" || userType === "ORGANIZER") ? (
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                userType === "ADMIN"
                  ? navigate("/admin")
                  : navigate("/dashboard");
              }}
            >
              <Dashboard />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleTicketsIconClick}
              sx={{ color: "black" }}
            >
              <LocalActivity />
            </IconButton>
          )}

          <IconButton
            sx={{
              color: "black",
              position: "relative",
              zIndex: 2,
            }}
            onClick={handleMenuClick}
          >
            <MenuOutlined />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ zIndex: 3 }}
          >
            <MenuItem onClick={() => handleMenuItemClick("/events/music")}>
              Music
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/events/sport")}>
              Sport
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/events/theater")}>
              Theater
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/events/food")}>
              Food
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/events/seminar")}>
              Seminar
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/events/festival")}>
              Festival
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
