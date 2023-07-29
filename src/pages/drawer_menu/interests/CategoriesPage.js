import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoxCard from "../../../components/gridLayout/BoxCard";
import DeleteCategoryDialog from "../../../components/modalDialog/deleteCategory";
import CustomFormDialog from "../../../components/modalDialog/customFormDialog";
import InterestCard from "../../../components/interestCard/InterestCard";
import BottomFabCustom from "../../../components/buttons/bottomFabCustom";
import BasicPagination from "../../../components/widget/pagination";
import GridToggleButton from "../../../components/widget/gridToggleButton";
import FullFeaturedCrudGrid from "../../../components/dataGrid/CustomInterestsGrid";
import Header from "../../../components/layout/Header";
import { CustomSelect } from "../../../components/selects/select";
import { MenuItem } from "@mui/material";
import { CardSkeleton } from "../../../components/widget/skeleton";
import useFetchInterests from "../../../api/interestAPI/fetchInterests";
import { useFetchCategories, usePostCategory, usePutCategory } from "../../../api/categoriesAPI/fetchCategories";
import AddBagDialog from "../../../components/modalDialog/AddBagDialog";
import { useDeleteData } from "../../../api/useData";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";

const AREAS_URL = "/staff/areas/";
const CATEG_URL = "/staff/categories";

const CategoriesPage = () => {
  const location = useLocation();
  //location.state -> has to be the same parameter as passed "name"
  const interestName = location.state?.name;
  const interestId = location.state?.interestId;

  const navigate = useNavigate();

  const [alignment, setAlignment] = useState("card");
  const [interest, setInterest] = useState(interestName ? interestName : "Arte e cultura");
  const { cards, pkId, loading: isLoading } = useFetchInterests(AREAS_URL);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(12);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const [id, setId] = useState(interestId ? interestId : 19); //pkId
  const { catList, catLength, loading } = useFetchCategories(AREAS_URL, id);
  const [editCatId, setEditId] = useState("");
  const [catName, setCatName] = useState("");

  const [openEditCat, setOpenEditCat] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAddCat, setOpenAddCat] = useState(false);
  const [ready, setReady] = useState(false);
  const { message, severity, open, mutate, openSnackbar } = usePostCategory();
  const {
    message: putMess,
    severity: putSev,
    open: putOpen,
    mutate: putCategory,
    openSnackbar: putOpenSnbr,
  } = usePutCategory();
  const {
    message: delMsg,
    severity: delSev,
    open: opDel,
    mutate: deleteCategory,
    openSnackbar: openSnakbarDel,
  } = useDeleteData();

  console.log("category id_B", editCatId);

  const title = "Eliminare categoria?";
  const desc =
    "Sei sicuro di voler eliminare questa categoria? Cliccando su 'Continua', perderai anche le categorie contenute all'interno.";

  useEffect(() => {
    if (loading && cards) {
      setReady(true);
    }
    // if (id !== undefined) {
    //   //mutate()
    // }
  }, []);

  const openSubCatPage = (index) => () => {
    let catId = catList[index].id;
    let catName = catList[index].name;

    navigate(`/interests/${id}/categories/${catId}/bags`, {
      state: { catName: catName, catId: catId, interestName: interest, interestId: id },
    });
  };

  //manage edit dialog
  const handleEditCategory = (id) => {
    setOpenEditCat(true);
    let catId = catList[id].id;
    setEditId(catId);
    setCatName(catList[id].name);
  };
  //delete category
  const handleDeleteCat = (id) => {
    setOpenAlert(true);
    let catId = catList[id].id;
    setEditId(catId);
    setCatName(catList[id].name);
  };

  //add new category
  const onAddNewCat = () => {
    setOpenAddCat(true);
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
    putOpenSnbr(false);
  };
  //snackbar delete
  const handleCloseDelSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnakbarDel(false);
  };

  //handle toggle card/table
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  //select interest
  const changeInterest = (event) => {
    setInterest(event.target.value);
  };

  const selectID = (index) => () => {
    let selectedInterestId = cards[index].id;
    setId(selectedInterestId);
    navigate(`/interests/${selectedInterestId}/categories/`);
    setCurrentPage(1);
  };

  //manage pagination
  const changeCurrentPage = (event, value) => {
    setCurrentPage(value);
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
        <Header title={"CATEGORIE"} subtitle="Qui puoi modificare o eliminare le Categorie" />
        <Box width="60%">
          <label htmlFor="iterests-select">Aree Tematiche</label>
          <CustomSelect labelId="iterests-label" value={interest} onChange={changeInterest} id="iterests-select">
            {cards.map((item, index) => (
              <MenuItem key={index} value={item.name} onClick={selectID(index)}>
                {item.name}
              </MenuItem>
            ))}
          </CustomSelect>
        </Box>
        <GridToggleButton handleChange={handleChange} alignment={alignment} />
      </Box>

      <BottomFabCustom
        onClick={() => onAddNewCat()}
        text="Categoria"
        icon={<AddIcon sx={{ mr: 1 }} size="medium" />}></BottomFabCustom>
      {alignment === "grid" ? (
        <FullFeaturedCrudGrid list={catList} />
      ) : ready ? (
        <CardSkeleton />
      ) : (
        <Box>
          <BoxCard height="70vh">
            {catList.slice(firstCardIndex, lastCardIndex).map((el, index) => (
              <InterestCard
                key={index}
                onClick={openSubCatPage(index)}
                onEdit={() => handleEditCategory(index)}
                onDelete={() => handleDeleteCat(index)}
                text={el.name}
                icon={el.icon}
                backgroundColor={bgColor[index]}></InterestCard>
            ))}
          </BoxCard>
          <Box display="flex" justifyContent="center">
            <BasicPagination
              totalCards={catLength}
              cardsPerPage={cardsPerPage}
              page={currentPage}
              onChange={changeCurrentPage}
            />
          </Box>
        </Box>
      )}
      <AddBagDialog
        open={openAddCat}
        onClose={() => setOpenAddCat(false)}
        title="Crea una nuova categoria"
        onClick={mutate}
        areaId={id}
      />
      <CustomFormDialog
        title="Modifica categoria"
        areaId={id}
        onClick={putCategory}
        editCatId={editCatId}
        open={openEditCat}
        onClose={() => setOpenEditCat(false)}
        cards={cards}
        interestName={interest}
      />
      <DeleteCategoryDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={title}
        desc={desc}
        confirmModal={() => deleteCategory(`${CATEG_URL}/${editCatId}`)}
        bagName={catName}
      />
      <SnackBarCustom severity={severity} open={open} onClose={handleCloseSnackbar} text={message} />
      <SnackBarCustom severity={putSev} open={putOpen} onClose={handleCloseSb} text={putMess} />
      <SnackBarCustom severity={delSev} open={opDel} onClose={handleCloseDelSb} text={delMsg} />
    </Box>
  );
};

export default CategoriesPage;
