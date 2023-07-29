import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDeleteData } from "../../api/useData";
import DataGridBox from "../dataGrid/DataGridBox";
import AlertDialog from "../modalDialog/AlertDialogDelete";
import SnackBarCustom from "../widget/SnackBarCustom";
import { useSWRInvitationsListPage } from "../../api/invitations/invitation";
import { format, parseISO } from "date-fns";

const COM_INVIT_URL = "/staff/communicator-invitations/";

const CommunicatorInvitationsList = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [id, setId] = useState();
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const serverPage = page + 1;
  const { invitationsList, isLoading, totalRows } = useSWRInvitationsListPage(serverPage, pageSize);
  const [rowCountState, setRowCountState] = React.useState(totalRows);

  const {
    message: delMsg,
    severity: delSev,
    open: opDel,
    mutate: deleteCategory,
    openSnackbar: openSnakbarDel,
  } = useDeleteData();

  const title = "Eliminare codice?";
  const desc = "Sei sicuro di voler eliminare questo codice? Cliccando su 'Continua', l'azione è irreversibile";

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      setRows(invitationsList);
    }
  }, [invitationsList]);

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  useEffect(() => {
    setRowCountState((prevRowCountState) => (totalRows !== undefined ? totalRows : prevRowCountState));
  }, [totalRows, setRowCountState]);

  //dialog delete
  const openModal = (id) => {
    setOpenAlert(true);
    setId(id);
  };

  //snackbar delete
  const handleCloseDelSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnakbarDel(false);
  };

  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    deleteCategory(`${COM_INVIT_URL}${id}`);
    setOpenAlert(false);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "created_at",
      headerName: "Creato il",
      valueGetter: ({ value }) => {
        const date = parseISO(value);
        const result = format(date, "dd-MM-yyyy");
        return result;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "code",
      headerName: "Codice",
      flex: 1,
    },
    {
      field: "redeemed",
      headerName: "Riscattato",
      flex: 1,
      renderCell: ({ row: { redeemed } }) => {
        return <>{redeemed === true ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</>;
      },
    },
    {
      field: "expired",
      headerName: "Scaduto",
      flex: 1,
      renderCell: ({ row: { expired } }) => {
        return <>{expired === true ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</>;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => openModal(id)} color="inherit" />,
        ];
      },
    },
  ];

  return (
    <DataGridBox>
      <DataGrid
        loading={isLoading}
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(0);
        }}
        rowCount={rowCountState}
        paginationMode="server"
        rowsPerPageOptions={[25, 50, 100]}
        components={{ Toolbar: GridToolbar }}></DataGrid>

      <AlertDialog
        title={title}
        desc={desc}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        //onClick={() => deleteExperience(id)}
        confirmModal={handleDeleteClick}
        id={id}
      />
      <SnackBarCustom severity={delSev} open={opDel} onClose={handleCloseDelSb} text={delMsg} />
    </DataGridBox>
  );
};

export default CommunicatorInvitationsList;
