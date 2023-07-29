import { Box } from "@mui/material";
import { TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BusinessCardInfo from "../../../components/userProfile/BusinessCardInfo";
import Curriculum from "../../../components/userProfile/Curriculum";
import InfoCard from "../../../components/userProfile/InfoCard";
import InterestsTab from "../../../components/userProfile/InterestsTab";
import ContainedButton from "../../../components/buttons/ContainedButton";
import { UserSkeleton } from "../../../components/widget/skeleton";
import ChangePasswdTab from "../../../components/account/changePasswdTab";
import CustomCard from "../../../components/widget/customCard";
import { useFetchUserId } from "../../../api/usersAPI/fetchUserId";
import TabContextCustom from "../../../components/userProfile/TabContextCustom";
import { mockUserList } from "../../../data/userData_mock";

const UserProfile = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const [user, setUser] = useState();

  const [bagsId, setBagsId] = useState([]);

  //set bags ids
  const handleBagIds = (array) => {
    setBagsId(array);
  };

  useEffect(() => {
    const user = mockUserList.find((user) => user.id === userId);

    // If user is not found, display a message
    if (!user) {
      return <div>User not found</div>;
    }

    setUser(user);
    console.log(user);
  }, [user, userId]);

  return (
    <Box>
      {/* <BackArrow to={"/users"} /> */}
      <TabContextCustom userId={userId}>
        <TabPanel value="1">
          <Box m="5px">
            {/* GRID */}
            {<InfoCard user={userId} />}
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <ChangePasswdTab />
        </TabPanel>
        <TabPanel value="3">{/* <Curriculum user={user.curriculum_vitae ? user : null} /> */}</TabPanel>
        <TabPanel value="4">
          <BusinessCardInfo user={user}></BusinessCardInfo>
        </TabPanel>
        <TabPanel value="5">
          <CustomCard flexDirection="column" p={2}>
            <InterestsTab user={user} sendBagArray={handleBagIds}></InterestsTab>
            <Box display="flex" justifyContent="flex-end">
              <ContainedButton text="Salva modifiche" variant="contained" color="secondary"></ContainedButton>
            </Box>
          </CustomCard>
        </TabPanel>
      </TabContextCustom>
    </Box>
  );
};

export default UserProfile;
