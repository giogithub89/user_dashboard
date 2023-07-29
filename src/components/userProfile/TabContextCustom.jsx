import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";

const TabContextCustom = ({ user, children, userId }) => {
  const [tab, setTab] = useState("1");

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
          <Tab label="Info" value="1" />
          <Tab label="Change Password" value="2" />
          {/* {user.id === userId && user.type === "communicator" && <Tab label="Curriculum" value="3" />}
          {user.id === userId && user.type === "business" && <Tab label="Business" value="4" />} */}
          <Tab label="Interests" value="5" />
        </TabList>
      </Box>
      {children}
    </TabContext>
  );
};

export default TabContextCustom;
