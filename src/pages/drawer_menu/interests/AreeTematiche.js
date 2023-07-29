import { Avatar, Box } from "@mui/material";
import "../../../components/interestCard/interestCard.css";
import React, { useState } from "react";
import BoxCard from "../../../components/gridLayout/BoxCard";
import Header from "../../../components/layout/Header";
import InterestCard from "../../../components/interestCard/InterestCard";
import { useNavigate } from "react-router-dom";
import CustomFormDialog from "../../../components/modalDialog/customFormDialog";
import AlertDialog from "../../../components/modalDialog/AlertDialogDelete";
import GridToggleButton from "../../../components/widget/gridToggleButton";
import FullFeaturedCrudGrid from "../../../components/dataGrid/CustomInterestsGrid";
import { CardSkeleton } from "../../../components/widget/skeleton";
import useFetchInterests from "../../../api/interestAPI/fetchInterests";
import interests from "../../../data/interessi";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import CategoryIcon from "@mui/icons-material/Category";
import ExtensionIcon from "@mui/icons-material/Extension";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SpaIcon from "@mui/icons-material/Spa";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import FlightIcon from "@mui/icons-material/Flight";
import PublicIcon from "@mui/icons-material/Public";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const AREAS_URL = "/staff/areas";

const AreeTematiche = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alignment, setAlignment] = useState("card");
  //const { loading, cards } = useFetchInterests(AREAS_URL);
  const loading = false;
  const navigate = useNavigate();

  const title = "Eliminare categoria?";
  const desc =
    "Sei sicuro di voler eliminare questa categoria? Cliccando su 'Continua', perderai anche le categorie contenute all'interno.";

  const iconList = [
    <OndemandVideoIcon />,
    <BusinessCenterIcon />,
    <LocalDiningIcon />,
    <CardMembershipIcon />,
    <BusinessCenterIcon />,
    <FolderSpecialIcon />,
    <CategoryIcon />,
    <ExtensionIcon />,
    <SubtitlesIcon />,
    <SpaIcon />,
    <NaturePeopleIcon />,
    <EngineeringIcon />,
    <AcUnitIcon />,
    <PublicIcon />,
    <FlightIcon />,
  ];

  const openCatPage = (index) => () => {
    let catId = index;
    let catName = interests[catId].name;
    let interestId = interests[catId].id;
    navigate(`/interests/${interestId}/categories`, { state: { name: catName, interestId: interestId } });
  };

  //manage edit dialog
  const editCategory = (value) => {
    console.log(value);
    setOpen(false);
  };

  const deleteCategory = () => {
    console.log("delete");
  };

  const onFabClick = () => {
    //navigate("/addInterest");
  };

  //handle toggle card/table
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="INTERESTS" subtitle="Manage your Interests" />
        <GridToggleButton handleChange={handleChange} alignment={alignment} />
      </Box>
      {alignment === "grid" ? (
        <FullFeaturedCrudGrid list={interests} />
      ) : loading ? (
        <CardSkeleton />
      ) : (
        <BoxCard>
          {interests
            //.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
            .map((el, index) => (
              <InterestCard
                key={index}
                onClick={openCatPage(index)}
                onEdit={() => setOpen(true)}
                onDelete={() => setOpenAlert(true)}
                icon={iconList[index]}
                text={el.name}
                backgroundColor={el.color}></InterestCard>
            ))}
        </BoxCard>
      )}

      <CustomFormDialog open={open} onClose={() => setOpen(false)} onClick={editCategory} />
      <AlertDialog open={openAlert} onClose={() => setOpenAlert(false)} title={title} desc={desc} />
    </Box>
  );
};

export default AreeTematiche;
