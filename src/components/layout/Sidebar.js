import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar, sidebarClasses, SubMenu, menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { tokens } from "../../theme";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Add, Chat, QrCode } from "@mui/icons-material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import CategoryIcon from "@mui/icons-material/Category";
import ExtensionIcon from "@mui/icons-material/Extension";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ThreePIcon from "@mui/icons-material/ThreeP";
import imagePic from "../../resources/user.png";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import MmsIcon from "@mui/icons-material/Mms";
import AodIcon from "@mui/icons-material/Aod";
import { useFetchAccount } from "../../api/accountAPI/fetchAccount";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.yellow[500],
      }}
      onClick={() => {
        setSelected(title);
        localStorage.setItem("selectedItem", title);
      }}
      icon={icon}
      component={<Link to={to} />}>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SubMenuCustom = ({ label, icon, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <SubMenu
      rootStyles={{
        [`.${menuClasses.subMenuContent}`]: {
          backgroundColor: colors.primary[900],
          margin: "0px 0px 0px 20px",
        },
        [`.${menuClasses.button}`]: {
          color: "white",
        },
      }}
      label={label}
      icon={icon}>
      {children}
    </SubMenu>
  );
};

const SidebarPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(localStorage.getItem("selectedItem") || "DASHBOARD");
  const { data: userData } = useFetchAccount();
  const { collapseSidebar, collapsed } = useProSidebar();

  useEffect(() => {
    localStorage.setItem("selectedItem", selected);
  }, [selected]);

  return (
    <Box sx={{ maxHeight: "100vh", height: "100%" }}>
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
          borderRightColor: colors.primary[900],

          [`.${sidebarClasses.container}`]: {
            backgroundColor: colors.primary[900],
            height: "100vh",
          },
        }}>
        <Menu
          closeOnClick={true}
          iconShape="square"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0) {
                return {
                  color: disabled ? "#fff" : colors.yellow[500],
                  backgroundColor: active ? colors.primary[600] : undefined,
                  ":hover": { backgroundColor: colors.primary[600] },
                  borderRadius: "10px",
                };
              }
            },
          }}>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => collapseSidebar()}
            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.white[500],
            }}>
            {!collapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.white[500]}>
                  BRAND
                </Typography>
                <IconButton onClick={() => collapseSidebar(collapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!collapsed ? (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Link to={"/my-account"}>
                  <Avatar alt="profile-user" src={imagePic} sx={{ width: 100, height: 100, cursor: "pointer" }} />
                </Link>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.white[500]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  {"Eduard"}
                </Typography>
                <Typography variant="h5" color={colors.black[800]}>
                  {"CEO"}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box height="100px"></Box>
          )}

          <Box paddingLeft={collapsed ? undefined : "1%"}>
            <Item title="DASHBBOARD" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            {/* <Typography variant="h6" color={colors.black[700]} sx={{ m: "15px 0 5px 20px" }}>
              Data
            </Typography> */}

            <SubMenuCustom label="USERS" icon={<PeopleOutlinedIcon />}>
              <Item title="New User" to="/addNewUser" icon={<Add />} selected={selected} setSelected={setSelected} />

              <Item
                title="Users List"
                to="users"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenuCustom>

            <Item title="STAFF" to="/staff" icon={<EngineeringIcon />} selected={selected} setSelected={setSelected} />

            <SubMenuCustom label="AREE TEMATICHE" icon={<FolderSpecialIcon />}>
              <Item
                title="Interest"
                to="/interests"
                icon={<FavoriteIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Categories"
                to="/categories"
                icon={<CategoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item title="Bag" to="/bags" icon={<ExtensionIcon />} selected={selected} setSelected={setSelected} />
            </SubMenuCustom>

            <Item
              title="COMMUNICATORS"
              to="/communicator-invitations"
              icon={<QrCode />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="SUBSCRIPTIONS"
              to="/subscription"
              icon={<CardMembershipIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenuCustom label={"SPONSORS"} icon={<BusinessCenterIcon />}>
              <Item
                title="New sponsor content"
                to="/create-sponsor-content"
                icon={<Add />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Sponsors List"
                to="/sponsor-content-list"
                icon={<BusinessCenterIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenuCustom>

            <SubMenuCustom label="CONTENTS" icon={<PermMediaIcon />}>
              <Item
                title="New Content"
                to="/bagLayout/create-content"
                icon={<Add />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Contents List"
                to="/bagLayout/bag-content"
                icon={<SubtitlesIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenuCustom>

            <SubMenuCustom label="REPORTS" icon={<FeedbackIcon />}>
              <Item
                title="Contents"
                to="/contents-reports"
                icon={<FeedbackIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item title="Chat" to="/chats-report" icon={<Chat />} selected={selected} setSelected={setSelected} />
            </SubMenuCustom>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarPage;
