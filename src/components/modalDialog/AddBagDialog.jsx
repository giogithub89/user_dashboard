import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useData, useGetIcons } from "../../api/useData";
import { tokens } from "../../theme";
import BoxCard from "../gridLayout/BoxCard";
import CellGridCustom from "../gridLayout/CellGridCustom";
import BasicPagination from "../widget/pagination";

const ICONS_URL = "/static/fonts/icons-list.json";

const AddBagDialog = ({ title, areaId, onClick, editCatId, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState("");

  //const { data } = useData();
  const { data } = useGetIcons(ICONS_URL);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(50);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const [selectedIconId, setSelectedId] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCurrentPage(currentPage);

    //return () => console.log("pre check");
  }, [currentPage, areaId, editCatId]);

  const handleSelectedIcon = (value) => {
    setSelectedId(value);
  };

  const changeCurrentPage = (event, value) => {
    setCurrentPage(value);
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
        <DialogContent sx={{ overflow: "hidden", height: "240px" }}>
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
            }}>
            Annulla
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              if (selectedIconId && value !== "") {
                onClick(value, areaId, selectedIconId, editCatId ? editCatId : null);
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

export default AddBagDialog;
