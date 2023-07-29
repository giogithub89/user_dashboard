import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CodeGenerator from "../../../components/codeGenerator/CodeGenerator";
import Header from "../../../components/layout/Header";
import InterestsDropDown from "../../../components/invitationsList/InterestsDropDown";
import CommunicatorInvitationsList from "../../../components/invitationsList/CommunicatorInvitationsList";
import { usePostData } from "../../../api/useData";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";
import LoadingBtn from "../../../components/buttons/loadingBtn";
import { useSWRInvitationsListPage } from "../../../api/invitations/invitation";

const COM_INVIT_URL = "/staff/communicator-invitations/";

const CommunicatorInvitations = () => {
  const [tab, setTab] = useState("1");
  const [email, setEmail] = useState();
  const [bagsId, setBagsId] = useState([]);

  //const { loading: isLoading, data } = useGetData(COM_INVIT_URL);
  const { loading, message, severity, open, openSnackbar, mutate } = usePostData();

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  //set bags ids
  const handleBagId = (array) => {
    setBagsId(array);
  };

  //snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnackbar(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const data = { email: email, bags_ids: bagsId };
    await mutate(COM_INVIT_URL, data);

    clearForm();
  };

  const clearForm = () => {
    bagsId.length = 0;
    setEmail("");
    window.location.reload();
  };
  return (
    <form onSubmit={submitForm}>
      <Box m="20px">
        <Header title="INVITATION CODE" subtitle="Manage your communicators codes"></Header>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="Genera codice" value="1" />
              <Tab label="Lista Codici" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* interest dropdown */}
            <InterestsDropDown sendBagArray={handleBagId} />
            <Box display="flex" flexDirection="column" width="300px" m="0px 0px 40px 20px">
              <label htmlFor="email">Email</label>
              <TextField
                fullWidth
                //inputRef={emailRef}
                size="small"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                //autoComplete="on"
                required></TextField>
            </Box>

            {/* <CodeGenerator /> */}

            <Box display="flex" alignItems="center" justifyContent="end" p="20px">
              <LoadingBtn loading={loading} text={"Genera codice"}></LoadingBtn>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <CommunicatorInvitationsList />
          </TabPanel>
        </TabContext>
      </Box>
      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
    </form>
  );
};

export default CommunicatorInvitations;
