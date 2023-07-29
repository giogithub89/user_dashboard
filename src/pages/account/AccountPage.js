import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import Header from "../../components/layout/Header";
import AdminSettings from "../../components/account/AdminSettings";
import AdminInfoTab from "../../components/account/accountInfoTab";
import ChangePasswdTab from "../../components/account/changePasswdTab";
import { useFetchAccount, useSWRFetchAccount } from "../../api/accountAPI/fetchAccount";
import { AdminSkeleton } from "../../components/widget/skeleton";

const AccountPage = () => {
  const { data, loading } = useFetchAccount();
  //const { userData, isLoading } = useSWRFetchAccount();

  const [tab, setTab] = useState("1");
  const isAdmin = true;

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Box m="20px">
      <Header title="ACCOUNT" subtitle="Modifica le tue informazioni" />
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Info" value="1" />
            <Tab label="Change Password" value="2" />
            {isAdmin && <Tab label="Settings" value="3" />}
            {/* {auth.role === "admin" && <Tab label="Settings" value="3" />} */}
            <Tab label="Notification" value="4" />
          </TabList>
        </Box>

        <TabPanel value="1">{loading ? <AdminSkeleton /> : <AdminInfoTab data={data} />}</TabPanel>

        <TabPanel value="2">
          <ChangePasswdTab />
        </TabPanel>
        <TabPanel value="3">
          <AdminSettings />
        </TabPanel>
        <TabPanel value="4"></TabPanel>
      </TabContext>
    </Box>
  );
};

export default AccountPage;
