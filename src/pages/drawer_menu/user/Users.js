import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, IconButton, MenuItem, Select } from "@mui/material";
import { DataGrid, GridPagination, GridToolbar } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRUsersListPage } from "../../../api/usersAPI/fetchUsersList";
import DataGridBox from "../../../components/dataGrid/DataGridBox";
import Header from "../../../components/layout/Header";
import UserBadge from "../../../components/widget/UserBadge";
import { mockUserList } from "../../../data/userData_mock";

const Users = () => {
  let navigate = useNavigate();
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(0);
  const serverPage = page + 1;
  //const { usersList, userCount, isLoading } = useSWRUsersListPage(serverPage, pageSize);
  //const [rowCountState, setRowCountState] = useState(userCount);

  //custom filter
  const userTypeOperators = [
    {
      label: "User",
      value: "simple",
      getApplyFilterFn: (filterItem) => {
        return (params) => {
          return params.value === "simple";
        };
      },
    },
    {
      label: "Communicator",
      value: "communicator",
      getApplyFilterFn: (filterItem) => {
        return (params) => {
          return params.value === "communicator";
        };
      },
    },
    {
      label: "Business",
      value: "business",
      getApplyFilterFn: (filterItem) => {
        // if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        //   return null;
        // }
        return (params) => {
          return params.value === "business";
        };
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "USERNAME", flex: 1 },
    {
      field: "name",
      headerName: "NAME",

      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "surname",
      headerName: "SURNAME",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "date_joined",
      headerName: "DATE JOINED",
      width: 200,
      // valueGetter: ({ value }) => {
      //   const date = parseISO(value);
      //   const result = format(date, "dd-MM-yyyy");
      //   return result;
      // },
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
    },
    {
      field: "access",
      headerName: "ACCOUNT",
      filterOperators: userTypeOperators,
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return <UserBadge type={access} />;
      },
    },
  ];

  const handleRowClick = (params, event, details) => {
    let id = params.row.id;

    navigate(`/users/${id}`, { state: { userId: id } });
  };

  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  // useEffect(() => {
  //   setRowCountState((prevRowCountState) => (userCount !== undefined ? userCount : prevRowCountState));
  // }, [userCount, setRowCountState]);

  //Custom dropdown select pagination
  let totalPages = [];
  // for (let i = 1; i <= Math.ceil(rowCountState / pageSize); i++) {
  //   totalPages.push(i);
  // }

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

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Manage all your users" />

      <DataGridBox>
        <DataGrid
          onRowClick={handleRowClick}
          //loading={isLoading}
          rows={mockUserList}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPage(0);
          }}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          //rowCount={rowCountState}
          pagination
          paginationMode="server"
          rowsPerPageOptions={[5, 10, 25]}
          components={{ Toolbar: GridToolbar, Pagination: renderPagination }}></DataGrid>
      </DataGridBox>
    </Box>
  );
};

export default Users;
