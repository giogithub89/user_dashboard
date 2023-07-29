import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box, IconButton, MenuItem, Select } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridPagination, GridToolbar } from "@mui/x-data-grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRFetchContent } from "../../../api/content/useFetchContentList";
import { useDeleteData } from "../../../api/useData";
import DataGridBox from "../../../components/dataGrid/DataGridBox";
import Header from "../../../components/layout/Header";
import AlertDialog from "../../../components/modalDialog/AlertDialogDelete";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";

const CONTENT_URL = "/staff/contents/bag-contents/";

const BagContentsList = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [id, setId] = useState();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const serverPage = page + 1;

  const [rowCountState, setRowCountState] = React.useState(25);

  let totalPages = [];
  for (let i = 1; i <= Math.ceil(25 / pageSize); i++) {
    totalPages.push(i);
  }

  const CustomPagination = ({ page, totalPages, onPageChange }) => {
    const handlePageChange = (event) => {
      const newPage = parseInt(event.target.value - 1);
      onPageChange(newPage);
    };

    return (
      <Select value={page} onChange={handlePageChange}>
        {totalPages.map((pageNumber, index) => (
          <MenuItem key={pageNumber} value={pageNumber}>
            {pageNumber}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const handlePrevPage = () => {
    const newPage = page - 1;
    setPage(newPage);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  const renderPagination = () => (
    <GridPagination
      page={page}
      totalPages={totalPages}
      ActionsComponent={(props) => (
        <>
          <IconButton onClick={handlePrevPage} disabled={serverPage === 1}>
            <NavigateBeforeIcon />
          </IconButton>
          <CustomPagination page={serverPage} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
          <IconButton onClick={handleNextPage} disabled={serverPage === totalPages}>
            <NavigateNextIcon />
          </IconButton>
        </>
      )}
    />
  );

  // useEffect(() => {
  //   if (isLoading) {
  //     return;
  //   } else {
  //     setRows(contentsList);
  //   }
  // }, [contentsList]);

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  useEffect(() => {
    setRowCountState((prevRowCountState) => (25 !== undefined ? 25 : prevRowCountState));
  }, [setRowCountState]);

  const {
    message: delMsg,
    severity: delSev,
    open: opDel,
    mutate: deleteContent,
    openSnackbar: openSnakbarDel,
  } = useDeleteData();

  const alertTitle = "Eliminare contenuto?";
  const alertDesc = "Sei sicuro di voler eliminare questo contenuto? Cliccando su 'Elimina', l'azione è irreversibile.";

  const handleRowClick = (param) => {
    let id = param.row.id;
    let contentType = param.row.media.type;

    navigate(`/bagLayout/bag-content/${id}`, { state: { id: id, contentType: contentType } });
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

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
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
      width: 140,
      valueGetter: ({ value }) => {
        const date = parseISO(value);
        const result = format(date, "dd-MM-yyyy");
        return result;
      },
    },
    {
      field: "type",
      headerName: "Tipo",
    },
    {
      field: "bag",
      headerName: "Bag",
      valueGetter: (params) => {
        if (params.row.bag) {
          if (params.row.bag.name) {
            return params.row.bag.name;
          }
        } else {
          return "Unknown";
        }
      },
    },
    {
      field: "secondary_bags",
      headerName: "Bag Secondarie",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.secondary_bags) {
          return params.row.secondary_bags.map((item) => item?.name);
        } else {
          return "No bags";
        }
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
      width: 60,
      renderCell: ({ row: { active } }) => {
        return (
          <>
            {active === true && <CheckCircleIcon color="success" />}
            {active === false && <CancelIcon color="error" />}
          </>
        );
      },
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: ({ id }) => {
    //     return [
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Delete"
    //         onClick={() => handleOpenAlert(id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
  ];

  return (
    <Box m="20px">
      <Header title="CONTENUTI" subtitle="Qui puoi gestire i contenuti" />
      <DataGridBox>
        <DataGrid
          onRowClick={handleRowClick}
          //rows={contentsList}
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
          rowsPerPageOptions={[10, 25, 50]}
          pagination
          components={{ Toolbar: GridToolbar, Pagination: renderPagination }}
        />
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

export default BagContentsList;
