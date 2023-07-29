import { AccountCircleOutlined, Info } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import SendIcon from "@mui/icons-material/Send";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import StarIcon from "@mui/icons-material/Star";
import { Box, Link, Tooltip, Typography, useTheme } from "@mui/material";
import { format, parseISO } from "date-fns";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBagContentId } from "../../../api/content/useFetchContentList";
import { useDeleteData } from "../../../api/useData";
import ContainedButton from "../../../components/buttons/ContainedButton";
import BottomFabCustom from "../../../components/buttons/bottomFabCustom";
import ContentDisplayBlock from "../../../components/content/contentDisplayBlock";
import BoxCard from "../../../components/gridLayout/BoxCard";
import CellGridCustom from "../../../components/gridLayout/CellGridCustom";
import AlertDialog from "../../../components/modalDialog/AlertDialogDelete";
import SnackBarCustom from "../../../components/widget/SnackBarCustom";
import CustomCard from "../../../components/widget/customCard";
import { tokens } from "../../../theme";

const CONTENT_URL = "/staff/contents/bag-contents/";

const BagContentPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openAlert, setOpenAlert] = useState(false);

  const { state } = useLocation();
  const { id, contentType } = state || {};
  const { content, loading } = useBagContentId(id);

  const [autor, setAuthor] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [mention, setMention] = useState([]);
  const [views, setViews] = useState();
  const [score, setScore] = useState();
  const [totScore, setTotScore] = useState();
  const [share, setShare] = useState(Number);
  const [created_at, setDate] = useState("");
  const [media, setMedia] = useState([]);
  const [text, setContentText] = useState();
  const [bag, setBag] = useState([]);
  const [secBag, setSecBag] = useState([]);
  const [source, setSource] = useState([]);
  const [sourceUrl, setSourceUrl] = useState("");
  const [sponsor, setSponsor] = useState(Boolean);
  const [source_is_author, setIsAuthor] = useState();
  const [active, setActive] = useState(Boolean);
  const {
    message: delMsg,
    severity: delSev,
    open: opDel,
    mutate: deleteContent,
    openSnackbar: openSnakbarDel,
  } = useDeleteData();

  const alertTitle = "Eliminare contenuto?";
  const alertDesc = "Sei sicuro di voler eliminare questo contenuto? Cliccando su 'Elimina', l'azione è irreversibile.";

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
        media: { type } = {},
        author,
        title,
        caption: description,
        mentions,
        total_score: totScore,
        score,
        views_number: views,
        shares_number: share,
        created_at,
        media: { files: media } = {},
        media: { text } = {},
        bag,
        secondary_bags,
        sources,
        sources: { url } = {},
        sponsor,
        source_is_author,
        active,
      } = content || {};
      ///console.log(media)
      //setContentType(type)
      setAuthor(author);
      setTitle(title);
      setDesc(description);
      setMention(mentions ? mentions.map((el) => el.username) : null);
      setTotScore(totScore);
      setScore(score);
      setViews(views);
      setShare(share);
      setDate(created_at);
      setMedia(media ? media : null);
      setContentText(text ? text : "");
      setBag(bag);
      setSecBag(secondary_bags ? secondary_bags : null);
      setSource(sources ? sources.map((el) => el.text) : null);
      setSourceUrl(url);
      setSponsor(sponsor ? "Si" : "No");
      setIsAuthor(source_is_author ? "Autore" : "Esterna");
      setActive(active ? <Typography color="green">Attivo</Typography> : <Typography color="red">Rimosso</Typography>);
    };
    fetchContent();
  }, [content]);

  const htmlContent = marked(text ? text : ""); // Convert the Markdown text to HTML
  const htmlDescription = marked(description ? description : ""); // Convert the Markdown text to HTML

  let formattedDate = "";
  if (created_at) {
    try {
      const date = parseISO(created_at);
      formattedDate = format(date, "dd-MM-yyyy");
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteContent = () => {
    setOpenAlert(true);
  };
  //delete content
  const deleteBag = (id, value) => {
    deleteContent(`${CONTENT_URL}${id}`);
  };

  //snackbar delete
  const handleCloseDelSb = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnakbarDel(false);
  };

  const infoCard = [
    { text: "Bag:", desc: bag?.name },
    { text: "Bag Secondarie:", desc: secBag && secBag.map((bag) => bag?.name + ", ") },
    { text: "Creato il:", desc: formattedDate ? formattedDate : null },
    { text: "Sponsor:", desc: sponsor },
    { text: "Stato: ", desc: active },
    { text: "Tag : ", desc: mention },
  ];

  const authorCard = [
    { text: "Username:", desc: autor?.username },
    { text: "Abbonamento:", desc: autor?.subscription },
    {
      text: "Account:",
      desc: autor?.type === "simple" ? "utente" : autor?.type === "communicator" ? "divulgatore" : "business",
    },
    { text: "Fonte:", desc: source_is_author },
    {
      text: "Fonte url: ",
      desc: (
        <Link href={source} target="_blank" color="inherit">
          {source}
        </Link>
      ),
    },
  ];

  return (
    // <ContentPage data={content} />
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
            <Tooltip title="Score">
              <Box
                display="flex"
                justifyContent="space-evenly"
                width="50%"
                borderRight="1px solid"
                borderColor={colors.black[500]}>
                <ScoreboardIcon sx={{ color: colors.secondary[600] }} />
                <Typography variant="h4" fontWeight="bold">
                  {score ? score : "--"}
                </Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Total score">
              <Box display="flex" justifyContent="space-evenly" width="50%">
                <StarIcon sx={{ color: colors.secondary[600] }} />{" "}
                <Typography variant="h4" fontWeight="bold">
                  {totScore}
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
          {authorCard.map((item) => (
            <Box display="flex" p="5px 0" flexWrap="wrap">
              <TextItem text={item.text} />
              <Typography>{item.desc}</Typography>
            </Box>
          ))}
        </CustomCard>
      </CellGridCustom>

      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={alertTitle}
        desc={alertDesc}
        confirmModal={deleteBag}
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

export default BagContentPage;
