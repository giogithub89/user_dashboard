import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/layout/Header";
import DataGridBox from "../../../components/dataGrid/DataGridBox";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { useFetchSponsorCntList } from "../../../api/sponsorAPI/fetchSponsorCnt";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../../components/modalDialog/AlertDialogDelete";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";
import { useDeleteData } from "../../../api/useData";

const CONTENT_URL = "/staff/contents/sponsor-contents/";

const SponsorList = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [id, setId] = useState();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const { sponsorContList, loading, totalRows } = useFetchSponsorCntList();

  const alertTitle = "Eliminare contenuto?";
  const alertDesc = "Sei sicuro di voler eliminare questo contenuto? Cliccando su 'Elimina', l'azione è irreversibile.";

  useEffect(() => {
    if (loading) {
      return;
    } else {
      setRows(sponsorContList);
    }
  }, [sponsorContList]);

  const handleRowClick = (param) => {
    let id = param.row.id;
    let contentType = param.row.media.type;
    console.log(contentType);

    //navigate(`/sponsor-content/${id}`, { state: { id: id, contentType: contentType } });
  };

  const handleOpenAlert = (id) => {
    setOpenAlert(true);
    setId(id);
  };
  //delete content
  const handleDeleteCont = (id, value) => {
    setRows(rows.filter((row) => row.id !== id));
    deleteContent(`${CONTENT_URL}${id}`);
  };

  //snackbar delete
  const handleCloseDelSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnakbarDel(false);
  };

  const {
    message: delMsg,
    severity: delSev,
    open: opDel,
    mutate: deleteContent,
    openSnackbar: openSnakbarDel,
  } = useDeleteData();

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "author",
      headerName: "Username",
      flex: 1,
      valueGetter: (params) => {
        //console.log(params.map((el) => el.row));
        //return params.getValue(params.row, "author").username;
        let result = [];
        if (params.row.author) {
          if (params.row.author.username) {
            result.push(params.row.author.username);
          }
        } else {
          result = ["Unknown"];
        }
        return result;
      },
    },
    {
      field: "title",
      headerName: "Titolo",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Creato il",
      width: 200,
      valueGetter: ({ value }) => {
        const date = parseISO(value);
        const result = format(date, "dd-MM-yyyy");
        return result;
      },
    },

    {
      field: "media",
      headerName: "Contenuto",
      valueGetter: (params) => {
        if (params.row.media) {
          if (params.row.media.type) {
            return params.row.media.type;
          }
        } else {
          return "Unknown";
        }
      },
    },
    {
      field: "active",
      headerName: "Attivo",
      renderCell: ({ row: { active } }) => {
        return (
          <>
            {active === true && <CheckCircleIcon color="success" />}
            {active === false && <CancelIcon color="error" />}
          </>
        );
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
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleOpenAlert(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="CONTENUTI SPONSOR" subtitle="Qui puoi gestire i contenuti sponsor" />
      <DataGridBox>
        <DataGrid
          onRowClick={handleRowClick}
          loading={loading}
          rows={rows}
          rowCount={totalRows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
          }}
          rowsPerPageOptions={[10, 25, 50]}
          components={{ Toolbar: GridToolbar }}></DataGrid>
      </DataGridBox>

      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={alertTitle}
        desc={alertDesc}
        confirmModal={handleDeleteCont}
        id={id}
      />
      <SnackBarCustom severity={delSev} open={opDel} onClose={handleCloseDelSb} text={delMsg} />
    </Box>
  );
};

export default SponsorList;
