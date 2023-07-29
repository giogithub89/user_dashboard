import AddIcon from "@mui/icons-material/Add";
import { Box, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoxCard from "../../../components/gridLayout/BoxCard";
import DeleteCategoryDialog from "../../../components/modalDialog/deleteCategory";
import CustomFormDialog from "../../../components/modalDialog/customFormDialog";
import InterestCard from "../../../components/interestCard/InterestCard";
import GridToggleButton from "../../../components/widget/gridToggleButton";
import BottomFabCustom from "../../../components/buttons/bottomFabCustom";
import BasicPagination from "../../../components/widget/pagination";
import FullFeaturedCrudGrid from "../../../components/dataGrid/CustomInterestsGrid";
import Header from "../../../components/layout/Header";
import { CustomSelect } from "../../../components/selects/select";
import { CardSkeleton } from "../../../components/widget/skeleton";
import { useFetchBag, useEditBag, usePostBag, usePatchBag } from "../../../api/bagAPI/fetchBag";
import { useDeleteData } from "../../../api/useData";
import useFetchInterests from "../../../api/interestAPI/fetchInterests";
import { useFetchCategories } from "../../../api/categoriesAPI/fetchCategories";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";

import useSWR from "swr";
import AddBagDialog from "../../../components/modalDialog/AddBagDialog";

const AREAS_URL = "/staff/areas/";
const BAG_URL = "/staff/bags";

const BagsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //location.state -> has to be the same parameter as passed "name"
  const interestName = location.state?.interestName;
  const interestId = location.state?.interestId;
  const catName = location.state?.catName;
  const catId = location.state?.catId;

  const [alignment, setAlignment] = useState("card");
  const [interest, setInterest] = useState(interestName ? interestName : "Arte e cultura");
  const [category, setCategory] = useState(catName ? catName : "Danza");
  const [currentIntid, setId] = useState(interestId ? interestId : 19);
  const [currentCatId, setCatId] = useState(catId ? catId : 95);
  const [bagId, setBagId] = useState("");
  const [bagName, setBagName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(12);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const { cards } = useFetchInterests(AREAS_URL);
  const { catList } = useFetchCategories(AREAS_URL, currentIntid);
  const { bagList, isLoading, bagLength } = useFetchBag(currentIntid, currentCatId);

  //const { data, error, mutate: mutateBags, isLoading } = useSWR(AREAS_URL, getTodos(id, currentCatId));

  const [openEditBag, setOpenEditBag] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAddBag, setOpenAddBag] = useState(false);

  const { message, severity, open, mutate, openSnackbar } = usePostBag();
  const { message: ms, severity: sev, open: op, loading, mutate: editBag, openSnackbar: oSn } = useEditBag();
  const {
    message: delMsg,
    severity: delSev,
    open: opDel,
    mutate: deleteCategory,
    openSnackbar: openSnakbarDel,
  } = useDeleteData();

  const title = "Eliminare bag?";
  const desc =
    "Sei sicuro di voler eliminare questa bag? Cliccando su 'Elimina', perderai tutte le informazioni contenute all'interno. Inserisci il nome della bag qui sotto.";

  //manage edit dialog
  const handleEditBag = (id) => {
    setOpenEditBag(true);
    let bagId = bagList[id].id;
    setBagId(bagId);
    setBagName(bagList[id].name);
  };

  const handleDeleteBag = (id) => {
    setOpenAlert(true);
    let bagId = bagList[id].id;
    setBagId(bagId);
    setBagName(bagList[id].name);
  };

  const handleAddBag = () => {
    setOpenAddBag(true);
  };

  //handle toggle card/table
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //select interest
  const changeInterest = (event) => {
    setInterest(event.target.value);
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  //manage pagination
  const changeCurrentPage = (event, value) => {
    setCurrentPage(value);
  };

  //change interest id
  const selectID = (index) => () => {
    let selectedInterestId = cards[index].id;
    setId(selectedInterestId);
    navigate(`/interests/${selectedInterestId}/categories/${1}/bags`);
  };
  //change category id
  const selectCatID = (index) => () => {
    let selectedCatId = catList[index].id;
    setCatId(selectedCatId);
    navigate(`/interests/${currentIntid}/categories/${selectedCatId}/bags`);
    setCurrentPage(1);
  };

  //snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnackbar(false);
  };
  //snackbar edit
  const handleCloseSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    oSn(false);
  };
  //snackbar delete
  const handleCloseDelSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnakbarDel(false);
  };

  const bgColor = []; // generate all the colors for the InterestCard components
  for (let i = firstCardIndex; i < lastCardIndex; i++) {
    bgColor.push(
      "#248531",
      "#cf581d",
      "#104bc9",
      "#852466",
      "#6402f5",
      "#320c63",
      "#ffc300",
      "#76d1f5",
      "#e80953",
      "#ff7700",
      "#db1212",
      "#45d17d"
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title={"BAG"} subtitle="Qui puoi modificare o eliminare le Bag" />
        <Box width="60%" display="flex">
          <Box width="100%">
            <label>Aree Tematiche</label>
            <CustomSelect
              labelId="iterests-label"
              value={interest}
              onChange={changeInterest}
              id="iterests-select"
              fullWidth="true">
              {cards.map((item, index) => (
                <MenuItem key={index} value={item.name} onClick={selectID(index)}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>
          <Box width="100%">
            <label>Categorie</label>
            <CustomSelect
              labelId="categories-label"
              value={category}
              onChange={changeCategory}
              id="categories-select"
              fullWidth={true}>
              {catList.map((el, index) => (
                <MenuItem key={index} value={el.name} onClick={selectCatID(index)}>
                  {el.name}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>
        </Box>
        <GridToggleButton handleChange={handleChange} alignment={alignment} />
      </Box>
      <BottomFabCustom
        onClick={handleAddBag}
        text="Bag"
        icon={<AddIcon sx={{ mr: 1 }} size="medium" />}></BottomFabCustom>
      {alignment === "grid" ? (
        <FullFeaturedCrudGrid list={bagList} />
      ) : isLoading ? (
        <CardSkeleton />
      ) : (
        <Box>
          <BoxCard height="70vh">
            {bagList.slice(firstCardIndex, lastCardIndex).map((element, i) => (
              <InterestCard
                key={i}
                onEdit={() => handleEditBag(i)}
                onDelete={() => handleDeleteBag(i)}
                text={element.name}
                icon={element.icon}
                backgroundColor={bgColor[i]}></InterestCard>
            ))}
          </BoxCard>
          <Box display="flex" justifyContent="center">
            <BasicPagination
              totalCards={bagLength}
              cardsPerPage={cardsPerPage}
              page={currentPage}
              onChange={changeCurrentPage}
            />
          </Box>
        </Box>
      )}

      <AddBagDialog
        title="Aggiungi una bag"
        open={openAddBag}
        onClose={() => setOpenAddBag(false)}
        onClick={mutate}
        areaId={currentIntid}
        editCatId={currentCatId}
      />

      <CustomFormDialog
        title="Modifica Bag"
        open={openEditBag}
        onClose={() => setOpenEditBag(false)}
        onClick={editBag}
        areaId={currentIntid}
        editCatId={currentCatId}
        bagId={bagId}
        bagName={bagName}
        cards={cards}
        interestName={interest}
        catName={category}
      />
      <DeleteCategoryDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={title}
        desc={desc}
        confirmModal={() => deleteCategory(`${BAG_URL}/${bagId}`)}
        bagName={bagName}
        id={bagId}
      />

      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
      <SnackBarCustom severity={sev} open={op} onClose={handleCloseSb} text={ms} />
      <SnackBarCustom severity={delSev} open={opDel} onClose={handleCloseDelSb} text={delMsg} />
    </Box>
  );
};

export default BagsPage;
