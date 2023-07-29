import { Box, IconButton, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import RightSidebar from "./rightSidebar";
import AuthContext from "../../context/AuthProvider";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [openRightSidebar, setOpenRightSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { setAuth } = useContext(AuthContext);

  //manage menu logout
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //manage sidebar
  const handleToggle = () => {
    setOpenRightSidebar(!openRightSidebar);
  };

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAnchorEl(null);
    setAuth({});
    localStorage.clear();
    navigate("/login");
  };

  const staffProfilePage = () => {
    setAnchorEl(null);
    navigate("/my-account");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} boxShadow="rgba(0, 0, 0, 0.64) 0px 3px 8px">
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.white[500]} borderRadius="3px" border="1px solid #0f1a24">
        <InputBase sx={{ ml: 2, flex: 1, color: colors.primary[500] }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon sx={{ color: colors.primary[500] }} />
        </IconButton>
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton onClick={handleToggle}>
          <NotificationsOutlinedIcon />
        </IconButton>

        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basic-button" }}>
          <MenuItem onClick={staffProfilePage}>My account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Box>
      <RightSidebar handleToggle={handleToggle} open={openRightSidebar} />
    </Box>
  );
};

export default Topbar;
