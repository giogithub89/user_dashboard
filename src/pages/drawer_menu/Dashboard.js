import { ArrowForwardIosOutlined } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ExtensionIcon from "@mui/icons-material/Extension";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRFetchTotBag } from "../../api/bagAPI/fetchBag";
import { useSWRFetchTotCat } from "../../api/categoriesAPI/fetchCategories";
import { useSWRFetchContentCount } from "../../api/content/useFetchContentList";
import { useSWRTotSponsCont } from "../../api/sponsorAPI/fetchSponsorCnt";
import { useFetchUsersList, useFetchSponsorList, useFetchDivList } from "../../api/usersAPI/fetchUsersList";
import StatsCommunicator from "../../components/dashboard/StatsCommunicator";
import BoxCard from "../../components/gridLayout/BoxCard";
import CellGridCustom from "../../components/gridLayout/CellGridCustom";
import Header from "../../components/layout/Header";
import CustomCard from "../../components/widget/customCard";
import { CardSkeleton } from "../../components/widget/skeleton";
import { useSWRContReportList } from "../../api/contents_report/fetchReportsList";

function Dashboard() {
  const navigate = useNavigate();
  const [simpleUsers, setSimpleUsers] = useState();
  // const { userCount, usersList, loading } = useFetchUsersList();
  // const { divListCount } = useFetchDivList();
  // const { sponsorListCount } = useFetchSponsorList();
  // const { catCount, isLoading: loadCateg } = useSWRFetchTotCat();
  // const { bagsCount, isLoading } = useSWRFetchTotBag();
  // const { contentsCount, isLoading: loadContent } = useSWRFetchContentCount();
  // const { sponsorContCount, isLoading: loadSponsCont } = useSWRTotSponsCont();
  // const { reportsCount } = useSWRContReportList();

  // const memoizedData = useMemo(
  //   () => ({
  //     userCount,
  //     divListCount,
  //     sponsorListCount,
  //     catCount,
  //     bagsCount,
  //     contentsCount,
  //     sponsorContCount,
  //     reportsCount,
  //     usersList,
  //   }),
  //   [
  //     userCount,
  //     divListCount,
  //     sponsorListCount,
  //     catCount,
  //     bagsCount,
  //     contentsCount,
  //     sponsorContCount,
  //     reportsCount,
  //     usersList,
  //   ]
  // );
  //console.log("memo", memoizedData);

  // useEffect(() => {
  //   const result = memoizedData.userCount - memoizedData.divListCount - memoizedData.sponsorListCount;
  //   setSimpleUsers(result);
  // }, [memoizedData.userCount, memoizedData.divListCount, memoizedData.sponsorListCount]);

  // const handleOpenPage = (id) => () => {
  //   if (id === 0) {
  //     navigate("/users-stats", { state: { usersList: usersList } });
  //   }
  // };

  const cards = [
    {
      icon: <PeopleOutlinedIcon sx={{ fontSize: 40 }} />,
      title: "Total users",
      desc: "30.000",
      perc: "+20%",
    },
    {
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      title: "Total Income",
      desc: "$450.000",
      perc: "+35%",
    },
    { icon: <ExtensionIcon sx={{ fontSize: 40 }} />, title: "Totale Bag", desc: 67, perc: "+7%" },
  ];

  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <BoxCard rowGap="20px">
        {cards.map((card, index) => (
          <CellGridCustom key={index} gridColumn="span 4">
            <CustomCard m="20px" p="20px">
              <Box display="flex" flexDirection="column" flex={2} justifyContent="space-between">
                <Typography textTransform="uppercase">{card.title}</Typography>
                <Typography variant="h2" color="secondary">
                  {card.desc}
                </Typography>
                <Typography variant="h4" color="secondary">
                  {card.perc ? card.perc : ""}
                </Typography>
              </Box>
              <Box display="flex" flex={1} alignItems="center" flexDirection="column">
                {card.icon}
                <Box marginTop="30px" display="flex" alignItems="center">
                  <Button
                    sx={{ textTransform: "lowercase" }}
                    key={index}
                    //onClick={handleOpenPage(index)}
                    endIcon={<ArrowForwardIosOutlined sx={{ p: "5px" }} color="primary" />}>
                    details
                  </Button>
                </Box>
              </Box>
            </CustomCard>
          </CellGridCustom>
        ))}

        <StatsCommunicator />
      </BoxCard>
    </Box>
  );
}

export default Dashboard;
