import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import DataGridBox from "../../../components/dataGrid/DataGridBox";
import Header from "../../../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useGetData } from "../../../api/useData";

const CONTENT_URL = "/staff/contents/reports/";

const ContentsReports = () => {
  //const { contentList, loading } = useContentsReport();
  const { data, loading } = useGetData(CONTENT_URL);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "user",
      headerName: "Segnalato da",
      width: 200,
      valueGetter: (params) => {
        //console.log(params.map((el) => el.row));
        //return params.getValue(params.row, "author").username;
        let result = [];
        if (params.row.user) {
          if (params.row.user.username) {
            result.push(params.row.user.username);
          }
        } else {
          result = ["Unknown"];
        }
        return result;
      },
    },
    {
      field: "reason",
      headerName: "Tipo",
    },
    {
      field: "content",
      headerName: "Autore",
      width: 200,
      valueGetter: (params) => {
        if (params.row.content) {
          if (params.row.content.author) {
            if (params.row.content.author.username) {
              return params.row.content.author.username;
            }
          }
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "caption",
      headerName: "Titolo",
      width: 200,
      valueGetter: (params) => {
        if (params.row.content) {
          if (params.row.content.caption) {
            return params.row.content.caption;
          }
        } else {
          return "N/A";
        }
      },
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
      field: "active",
      headerName: "Attivo",
      renderCell: (params) => {
        if (params.row.content) {
          if (params.row.content.active) {
            let active = params.row.content.active;

            return (
              <>
                {active === true && <CheckCircleIcon color="success" />}
                {active === false && <CancelIcon color="error" />}
              </>
            );
          }
        } else {
          return "N/A";
        }
      },
    },
  ];

  const handleRowClick = (param) => {
    let id = param.row.id;
    navigate(`/contents-reports/${id}`, { state: { id: id } });
  };

  return (
    <Box m="20px">
      <Header title="SEGNALAZIONI CONTENUTI" subtitle="Qui puoi gestire le segnalazioni degli iscritti" />
      <DataGridBox>
        <DataGrid onRowClick={handleRowClick} loading={loading} rows={data} columns={columns}></DataGrid>
      </DataGridBox>
    </Box>
  );
};

export default ContentsReports;
