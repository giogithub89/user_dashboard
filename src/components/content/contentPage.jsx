import { Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import BoxCard from "../../components/gridLayout/BoxCard";
import CellGridCustom from "../../components/gridLayout/CellGridCustom";
import CustomCard from "../../components/widget/customCard";
import ContainedButton from "../buttons/ContainedButton";
import ContentDisplayBlock from "./contentDisplayBlock";

const ContentPage = (data) => {
  const [type, setType] = useState();
  const [content, setContent] = useState();
  const [authorType, setAuthorType] = useState();
  const [account, setAccount] = useState();
  const [user, setUser] = useState();
  const [reason, setReason] = useState();
  const [formattedDate, setDate] = useState();
  const [files, setFiles] = useState([]);
  const [text, setText] = useState();

  const TextItem = ({ text }) => {
    return (
      <Typography variant="h5" marginRight="10px" sx={{ color: "#ababab" }}>
        {text}
      </Typography>
    );
  };

  useEffect(() => {
    const fetchContent = async () => {
      const {
        content,
        user,
        created_at,
        reason,
        content: {
          media: { type },
        },
        content: {
          media: { text },
        },
        content: {
          media: { files },
        },
      } = data?.data || {};

      setContent(content);
      setUser(user);
      setAccount(user?.type === "simple" ? "utente" : user?.type === "communicator" ? "divulgatore" : "business");
      setType(type ? type : null);
      setReason(reason);
      setFiles(files ? files : null);
      setText(text);
      setAuthorType(
        content?.author?.type === "simple"
          ? "utente"
          : content?.author?.type === "communicator"
          ? "divulgatore"
          : "business"
      );
      if (created_at) {
        try {
          const date = parseISO(created_at);
          setDate(format(date, "dd-MM-yyyy"));
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchContent();
  }, [data]);

  const handleDelete = () => {};
  const handleIgnore = () => {};

  return (
    <BoxCard rowGap="20px">
      <CellGridCustom gridColumn="span 9">
        <CustomCard flexDirection="column" p="20px">
          <Box display="flex" justifyContent="space-between">
            <Box marginBottom="20px">
              <Typography variant="h4" fontWeight="bold">
                Descrizione
              </Typography>

              <Typography>{content?.caption}</Typography>
            </Box>
            <Box width="200px">
              <ContainedButton text="Rifiuta" variant="contained" onClick={handleIgnore} />
              <ContainedButton text="Accetta" variant="contained" color="success" onClick={handleDelete} />
            </Box>
          </Box>
          <Box marginBottom="20px">
            <Typography variant="h4" fontWeight="bold">
              Motivo
            </Typography>
            <Typography>{reason}</Typography>
          </Box>
        </CustomCard>
      </CellGridCustom>

      {/* AUTORE */}
      <CellGridCustom gridColumn="span 3">
        <CustomCard flexDirection="column" p="20px">
          <Typography variant="h4" fontWeight="bold" marginBottom="10px">
            Autore
          </Typography>
          <Box display="flex" p="5px 0">
            <TextItem text="Username:" />
            <Typography>{content?.author?.username}</Typography>
          </Box>
          <Box display="flex" p="5px 0">
            <TextItem text={"Abbonamento:"}></TextItem>
            <Typography>{content?.author?.subscription}</Typography>
          </Box>
          <Box display="flex" p="5px 0">
            <TextItem text={"Account:"}></TextItem>
            <Typography>{authorType}</Typography>
          </Box>
        </CustomCard>
      </CellGridCustom>

      {/* CONTENUTO */}
      <ContentDisplayBlock contentType={type} media={files} htmlContent={text} />

      {/* SEGNALATO */}
      <CellGridCustom gridColumn="span 3">
        <CustomCard flexDirection="column" p="20px">
          <Typography variant="h4" fontWeight="bold" marginBottom="10px">
            Segnalato da
          </Typography>
          <Box display="flex" p="5px 0">
            <TextItem text={"Username:"} />
            <Typography>{user?.username}</Typography>
          </Box>
          <Box display="flex" p="5px 0">
            <TextItem text={"Data:"} />
            <Typography>{formattedDate ? formattedDate : "01-02-2023"}</Typography>
          </Box>
          <Box display="flex" p="5px 0">
            <TextItem text={"Abbonamento:"} />
            <Typography>{user?.subscription}</Typography>
          </Box>

          <Box display="flex" p="5px 0">
            <TextItem text={"Account:"} />
            <Typography>{account}</Typography>
          </Box>
        </CustomCard>
      </CellGridCustom>
    </BoxCard>
  );
};

export default ContentPage;
