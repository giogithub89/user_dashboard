import { Box, LinearProgress, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import BoxCard from "../gridLayout/BoxCard";
import CellGridCustom from "../gridLayout/CellGridCustom";
import CustomCard from "../widget/customCard";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import LineChart from "./chart";
import LineProgressCard from "./lineProgressCard";
import { useLocation } from "react-router-dom";
import { mockAgeList } from "../../data/mockCodeList";

const Userstats = () => {
  const [monthUsers, setMonthUsers] = useState([]);
  const [weekUsers, setWeekUsers] = useState([]);
  const [yearUsers, setYearlyUsers] = useState([]);
  const [timeframe, setTimeframe] = useState(1);
  const { state } = useLocation();
  const { usersList } = state || {};

  const demo = [
    { age: "18-24", count: "11%" },
    { age: "25-34", count: "30%" },
    { age: "35-44", count: "35%" },
    { age: "45-54", count: "17%" },
    { age: "55-65", count: "2%" },
    { age: "+66", count: "0%" },
  ];
  const citta = [
    { age: "Milano", count: "40" },
    { age: "Torino", count: "30" },
    { age: "Roma", count: "25" },
    { age: "Ivrea", count: "7" },
    { age: "Napoli", count: "2" },
    { age: "Firenze", count: "3" },
  ];

  useEffect(() => {
    // calculate registered users statistics over 1 week
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weekUsers = usersList.filter((user) => new Date(user.date_joined) > oneWeekAgo);
    setWeekUsers(weekUsers);
    //console.log(datej);

    // calculate registered users statistics over 1 month
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const monthUsers = usersList.filter((user) => new Date(user.date_joined) > oneMonthAgo);
    setMonthUsers(monthUsers);

    // calculate registered users statistics over 1 month
    const oneYAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    const yearUsers = usersList.filter((user) => new Date(user.date_joined) > oneYAgo);
    setYearlyUsers(yearUsers);
  }, [usersList]);

  const cards = [
    {
      title: "Ultimi 7 giorni",
      desc: weekUsers.length,
    },
    {
      title: "Ultimi 30 giorni",
      desc: monthUsers.length,
    },
    { title: "Ultimo anno", desc: yearUsers.length },
  ];

  const handleChange = (event) => {
    setTimeframe(event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="STATISTICHE" subtitle="Controlla le statistiche" />
      <BoxCard rowGap="20px">
        {cards.map((card, index) => (
          <CellGridCustom key={index} gridColumn="span 4">
            <CustomCard m="20px" p="20px">
              <Box display="flex" flexDirection="column" flex={2} justifyContent="space-between">
                <Typography textTransform="upcountase">{card.title}</Typography>
                <Typography variant="h2" color="secondary">
                  {card.desc}
                </Typography>
              </Box>
              <Box display="flex" flex={1} alignItems="center" flexDirection="column">
                {Math.sign(card.desc) === 1 ? <NorthIcon color="success" /> : <SouthIcon color="error" />}
              </Box>
            </CustomCard>
          </CellGridCustom>
        ))}

        <CellGridCustom gridColumn="span 12">
          <CustomCard m="20px" p="20px" flexDirection="column">
            <Box display="flex" justifyContent="end">
              <label id="demo-simple-select-label"></label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeframe}
                onChange={handleChange}>
                <MenuItem value={1}>7 giorni</MenuItem>
                <MenuItem value={2}>30 giorni</MenuItem>
                <MenuItem value={3}>6 mesi</MenuItem>
                <MenuItem value={4}>1 anno</MenuItem>
              </Select>
            </Box>
            <LineChart value={timeframe} />
          </CustomCard>
        </CellGridCustom>

        <LineProgressCard customMap={mockAgeList} />
        <LineProgressCard customMap={citta} />
      </BoxCard>
    </Box>
  );
};

export default Userstats;
