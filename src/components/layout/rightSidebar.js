import PerfectScrollbar from "react-perfect-scrollbar";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import { set, sub } from "date-fns";
import { LockClock } from "@mui/icons-material";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Your order is placed",
    description: "waiting for shipping",
    avatar: null,
    type: "order_placed",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: "2",
    title: "Title",
    description: "answered to your comment on the Minimal",
    avatar: "/assets/images/avatars/avatar_2.jpg",
    type: "friend_interactive",
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
];

const RightSidebar = ({ open, handleToggle }) => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification, index) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <Drawer
      anchor="right"
      onClose={handleToggle}
      open={open}
      PaperProps={{
        sx: {
          width: 280,
        },
      }}>
      <PerfectScrollbar component="div">
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2">You have {"2"} unread messages</Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}></IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: "overline" }}>
              New
            </ListSubheader>
          }>
          {notifications.slice(0, 2).map((notification, index) => (
            <Box key={index}>
              <Typography>Notfication</Typography>
            </Box>
          ))}
        </List>

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: "overline" }}>
              Before that
            </ListSubheader>
          }></List>

        <Divider sx={{ borderStyle: "solid" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>

        {/* <Grid container spacing="20px" sx={{ p: 3 }}>
          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>
            {/* border radius 
          </Grid>
        </Grid> */}
      </PerfectScrollbar>
    </Drawer>
  );
};

export default RightSidebar;
