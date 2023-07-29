import { useTheme } from "@emotion/react";
import { AccountCircleOutlined, Info } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ContainedButton from "../../../components/buttons/ContainedButton";
import BottomFabCustom from "../../../components/buttons/bottomFabCustom";
import ContentDisplayBlock from "../../../components/content/contentDisplayBlock";
import BoxCard from "../../../components/gridLayout/BoxCard";
import CellGridCustom from "../../../components/gridLayout/CellGridCustom";
import AlertDialog from "../../../components/modalDialog/AlertDialogDelete";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";
import CustomCard from "../../../components/widget/customCard";
import { tokens } from "../../../theme";
import { marked } from "marked";
import { format, parseISO } from "date-fns";
import { useDeleteData } from "../../../api/useData";
import { useSponsorContentId } from "../../../api/sponsorAPI/fetchSponsorCnt";

const TextItem = ({ text }) => {
  return (
    <Typography variant="h5" marginRight="10px" sx={{ color: "#ababab" }}>
      {text}
    </Typography>
  );
};

const SponsorPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openAlert, setOpenAlert] = useState(false);

  const { state } = useLocation();
  const { id, contentType } = state || {};
  const { content, loading, title } = useSponsorContentId(id);

  const [autor, setAuthor] = useState([]);
  //   const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [mention, setMention] = useState([]);
  const [views, setViews] = useState();
  const [share, setShare] = useState(Number);
  const [created_at, setDate] = useState("");
  const [media, setMedia] = useState([]);
  const [text, setContentText] = useState();
  const [bag, setBag] = useState([]);
  const [sponsor, setSponsor] = useState(Boolean);
  const [active, setActive] = useState(Boolean);
  const [position, setPosition] = useState();

  const {
    message: delMsg,
    severity: delSev,
    open: opDel,
    mutate: deleteContent,
    openSnackbar: openSnakbarDel,
  } = useDeleteData();

  const htmlContent = marked(text ? text : ""); // Convert the Markdown text to HTML
  const htmlDescription = marked(description ? description : ""); // Convert the Markdown text to HTML

  const alertTitle = "Eliminare contenuto?";
  const alertDesc = "Sei sicuro di voler eliminare questo contenuto? Cliccando su 'Elimina', l'azione è irreversibile.";

  let formattedDate = "";
  if (created_at) {
    try {
      const date = parseISO(created_at);
      formattedDate = format(date, "dd-MM-yyyy");
    } catch (error) {
      console.error(error);
    }
  }

  const infoCard = [
    { text: "Bag:", desc: bag && bag.map((bag) => bag?.name + ", ") },
    { text: "Creato il:", desc: formattedDate ? formattedDate : null },
    { text: "Sponsor:", desc: sponsor },
    { text: "Stato: ", desc: active },
    { text: "Tag : ", desc: mention },
  ];

  const handleDeleteContent = () => {
    setOpenAlert(true);
  };

  //delete content
  const deleteBag = (id, value) => {
    //deleteContent(`${CONTENT_URL}${id}`);
  };

  //snackbar delete
  const handleCloseDelSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnakbarDel(false);
  };

  return (
    <BoxCard rowGap="20px">
      <CellGridCustom gridColumn="span 9">
        <CustomCard flexDirection="column" p="20px">
          <Box display="flex" justifyContent="space-between">
            <Box marginBottom="20px">
              <Typography variant="h4" fontWeight="bold">
                Titolo
              </Typography>

              <Typography>{title}</Typography>
            </Box>

            <Box>{active === "false" && <ContainedButton text="Ban" variant="contained" color="error" />}</Box>
          </Box>
          <Box marginBottom="20px">
            <Typography variant="h4" fontWeight="bold">
              Descrizione
            </Typography>
            <Typography>{description}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-evenly" p="5px 0">
            <Tooltip title="Views">
              <Box
                display="flex"
                justifyContent="space-evenly"
                width="50%"
                borderRight="1px solid"
                borderColor={colors.black[500]}>
                <SlideshowIcon sx={{ color: colors.secondary[600] }} />
                <Typography variant="h4" fontWeight="bold">
                  {views ? views : "--"}
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Share">
              <Box
                display="flex"
                justifyContent="space-evenly"
                width="50%"
                borderRight="1px solid"
                borderColor={colors.black[500]}>
                {" "}
                <SendIcon sx={{ color: colors.secondary[600] }} />
                <Typography variant="h4" fontWeight="bold">
                  {share}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </CustomCard>
      </CellGridCustom>

      {/* INFO */}
      <CellGridCustom gridColumn="span 3">
        <CustomCard flexDirection="column" p="20px">
          <Box display="flex">
            <Info sx={{ marginRight: "10px" }}></Info>
            <Typography variant="h4" fontWeight="bold" marginBottom="10px">
              Info
            </Typography>
          </Box>
          {infoCard.map((item) => (
            <Box display="flex" p="5px 0">
              <TextItem text={item.text} />
              <Typography>{item.desc}</Typography>
            </Box>
          ))}
        </CustomCard>
      </CellGridCustom>

      {/* CONTENUTO */}
      <ContentDisplayBlock contentType={contentType} media={media} htmlContent={htmlContent} />

      {/* AUTORE */}
      <CellGridCustom gridColumn="span 3">
        <CustomCard flexDirection="column" p="20px">
          <Box display="flex">
            <AccountCircleOutlined sx={{ marginRight: "10px" }} />
            <Typography variant="h4" fontWeight="bold" marginBottom="10px">
              Autore
            </Typography>
          </Box>
        </CustomCard>
      </CellGridCustom>

      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={alertTitle}
        desc={alertDesc}
        //confirmModal={deleteBag}
        id={id}
      />

      <BottomFabCustom
        onClick={handleDeleteContent}
        text="Elimina"
        icon={<DeleteIcon sx={{ mr: 1 }} size="medium" />}></BottomFabCustom>
      <SnackBarCustom severity={delSev} open={opDel} onClose={handleCloseDelSb} text={delMsg} />
    </BoxCard>
  );
};

export default SponsorPage;
