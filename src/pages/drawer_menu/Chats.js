import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DataGridBox from "../../components/dataGrid/DataGridBox";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { tokens } from "../../theme";
import Header from "../../components/layout/Header";
import { parseISO, format } from "date-fns";
import { useFetchChatReport } from "../../api/chat_report/fetchChatReport";
import { useGetData } from "../../api/useData";
const CHAT_URL = "/staff/chats/reports/";

const Chats = () => {
  const navigate = useNavigate();
  const { chatsList, loading } = useFetchChatReport();
  //const { data, loading } = useGetData(CHAT_URL);

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
      field: "recipient",
      headerName: "recipient",
      width: 200,
      valueGetter: (params) => {
        if (params.row.chat) {
          if (params.row.chat.recipient) {
            if (params.row.chat.recipient.username) {
              return params.row.chat.recipient.username;
            }
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
    // {
    //   field: "active",
    //   headerName: "Attivo",
    //   renderCell: (params) => {
    //     if (params.row.content) {
    //       if (params.row.content.active) {
    //         let active = params.row.content.active;

    //         return (
    //           <>
    //             {active === true && <CheckCircleIcon color="success" />}
    //             {active === false && <CancelIcon color="error" />}
    //           </>
    //         );
    //       }
    //     } else {
    //       return "N/A";
    //     }
    //   },
    // },
  ];

  const handleRowClick = (param) => {
    let id = param.row.id;
    navigate(`/chatsReports/${id}`, { state: { id: id } });
  };

  return (
    <Box m="20px">
      <Header title="SEGNALAZIONI CHAT" subtitle="Qui puoi gestire le segnalazioni delle chat" />
      <DataGridBox>
        <DataGrid onRowClick={handleRowClick} loading={loading} rows={chatsList} columns={columns}></DataGrid>
      </DataGridBox>
    </Box>
  );
};

export default Chats;
