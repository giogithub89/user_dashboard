import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function AlertDialog({ open, confirmModal, id, ...props }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Annulla</Button>
          <Button
            onClick={() => {
              confirmModal(id);
              props.onClose();
            }}
            autoFocus
            color="error">
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
