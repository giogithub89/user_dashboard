import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import DataGridBox from "./DataGridBox";
import AlertDialog from "../modalDialog/AlertDialogDelete";

export default function FullFeaturedCrudGrid({ list }) {
  const location = useLocation();
  const catName = location.state?.name;
  const [rows, setRows] = React.useState(list);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [id, setId] = React.useState();

  const title = "Eliminare bag?";
  const desc =
    "Sei sicuro di voler eliminare questa bag? Cliccando su 'Continua', perderai tutte le informazioni contenute all'interno.";

  React.useEffect(() => {
    setRows(list);
  }, [list]);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const openModal = (id) => {
    setOpenAlert(true);
    setId(id);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    console.log(rows);
    setOpenAlert(false);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Categoria", editable: true, width: 200 },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => openModal(id)} color="inherit" />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <DataGridBox>
        <DataGrid
          rows={loading ? "Loading..." : rows}
          columns={columns}
          editMode="row"
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50]}
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </DataGridBox>
      <AlertDialog
        title={title}
        desc={desc}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        //onClick={() => deleteExperience(id)}
        confirmModal={handleDeleteClick(id)}
        id={id}
      />
    </Box>
  );
}
