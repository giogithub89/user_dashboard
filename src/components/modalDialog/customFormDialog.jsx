import { Box, useTheme, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useGetIcons, useData } from "../../api/useData";
import { tokens } from "../../theme";
import BoxCard from "../gridLayout/BoxCard";
import CellGridCustom from "../gridLayout/CellGridCustom";
import BasicPagination from "../widget/pagination";
import { CustomSelect } from "../selects/select";
import { InterestSelect } from "../selects/interestSelect";
import { useFetchCategories } from "../../api/categoriesAPI/fetchCategories";

const ICONS_URL = "/static/fonts/icons-list.json";
const AREAS_URL = "/staff/areas/";

const CustomFormDialog = ({ title, areaId, onClick, editCatId, bagId, bagName, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState("");
  const { data } = useGetIcons(ICONS_URL);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(50);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const [selectedIconId, setSelectedId] = useState(false);
  const [error, setError] = useState(false);

  const [category, setCategory] = useState(props.catName);
  const [currentIntid, setInterestId] = useState(areaId ? areaId : 19);
  const [currentCatId, setCatId] = useState(editCatId);
  //const [data, setData] = useState([]);

  const { catList } = useFetchCategories(AREAS_URL, currentIntid);

  // let config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   url: "https://staging.bigbag-web.com/static/fonts/icons-list.json",
  //   headers: {},
  // };

  // axios
  //   .request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data.icons));
  //     const data = JSON.stringify(response.data);
  //     setData(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  useEffect(() => {
    // setCurrentPage(currentPage);
    // setInterestId(areaId);
    setCatId(editCatId);
    //return () => console.log("pre check");
  }, [editCatId]);

  const handleSelectedIcon = (value) => {
    setSelectedId(value);
  };

  const handleInterestId = (value) => {
    setInterestId(value);
    console.log("area id ", value);
  };

  const changeCurrentPage = (event, value) => {
    setCurrentPage(value);
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  //change category id
  const selectCatID = (index) => () => {
    let selectedCatId = catList[index].id;
    setCatId(selectedCatId);
  };

  if (!props.open) return null;

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.primary[400],
            width: "600px",
            height: "700px",
          },
        }}>
        <DialogTitle variant="h4">{title}</DialogTitle>
        <DialogContent sx={{ overflow: "hidden", height: "240px", display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" flexDirection="column" margin="0px 10px" width="200px">
            <DialogContentText>Nome</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="standard"
              // error={error}
              // helperText={error ? "Selezione un icona" : "Inserisci un nome"}
            />
          </Box>

          <Box display="flex" flexDirection="column" margin="0px 10px" flex="1">
            <label>Aree</label>
            <InterestSelect
              id="iterests-select"
              labelId="iterests-label"
              list={props.cards}
              areaId={areaId}
              interestName={props.interestName}
              setInterestId={handleInterestId}></InterestSelect>
          </Box>
          {bagId !== undefined && (
            <Box display="flex" flexDirection="column" margin="0px 10px" flex="1">
              <label>Categorie</label>
              <CustomSelect labelId="cat-label" value={category} onChange={changeCategory} id="cat-select">
                {catList.map((item, index) => (
                  <MenuItem key={index} value={item.name} onClick={selectCatID(index)}>
                    {item.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>
          )}
        </DialogContent>

        <DialogContent>
          <BoxCard rowGap="10px">
            {data.slice(firstCardIndex, lastCardIndex).map((icon, index) => (
              <CellGridCustom gridColumn="span 3" height="50px" key={index}>
                <Button
                  sx={{ width: "50px", height: "50px" }}
                  variant={icon === selectedIconId ? "outlined" : null}
                  onClick={() => handleSelectedIcon(icon)}>
                  <span className={`icon-${icon}`}></span>
                </Button>
              </CellGridCustom>
            ))}
          </BoxCard>
        </DialogContent>
        <DialogContent sx={{ overflow: "hidden", p: "30px 20px 30px" }}>
          <BasicPagination
            totalCards={data.length}
            onChange={changeCurrentPage}
            cardsPerPage={cardsPerPage}
            page={currentPage}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontWeight: "bold" }}
            onClick={() => {
              props.onClose();
              setValue("");
              setCurrentPage(1);
              setSelectedId(false);
            }}>
            Annulla
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              if (selectedIconId && value !== "") {
                if (bagId) {
                  onClick(value, selectedIconId, currentCatId, bagId);
                } else {
                  onClick(value, selectedIconId, currentIntid, currentCatId);
                }

                console.log(value, selectedIconId, currentIntid, currentCatId, bagId);
                props.onClose();
                setValue("");
                setSelectedId(false);
              }
            }}>
            Salva
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomFormDialog;
