import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function DeleteCategoryDialog({ open, confirmModal, id, bagName, ...props }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState("");

  if (!open) return null;

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": { backgroundColor: colors.primary[400] },
          // "& .MuiButtonBase-root": { color: colors.secondary[500] },
        }}>
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.desc}</DialogContentText>
          <TextField
            placeholder={bagName}
            helperText={props.helperText}
            autoFocus
            margin="normal"
            id="name"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="outlined"
            sx={{ width: "200px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onClose();
              setValue("");
            }}>
            Annulla
          </Button>
          <Button
            onClick={() => {
              if (bagName === value) {
                confirmModal();
                props.onClose();
                setValue("");
              }
            }}
            autoFocus
            variant="contained"
            color="error">
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
