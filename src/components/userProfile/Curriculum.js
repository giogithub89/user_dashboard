import { Box, useTheme } from "@mui/system";
import FabCustom from "../buttons/FabCustom";
import BoxCard from "../gridLayout/BoxCard";
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";

const Curriculum = ({ user }) => {
  let navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [id, setID] = useState(user?.id);

  const [experiences, setExp] = useState(user?.curriculum_vitae?.experiences);
  console.log(experiences);

  const onFabClick = () => {
    navigate(`/users/editCvPage/${id}`, { state: { exp: experiences } });
  };

  return (
    <BoxCard backgroundColor={colors.primary[400]} boxShadow={"rgba(0, 0, 0, 0.64) 0px 3px 8px"} rowGap="30px">
      <FabCustom onClick={onFabClick} text="Edit CV" icon={<Edit sx={{ mr: 1 }} size="medium" />} />
      {experiences.length === 0 ? (
        <Box gridColumn="span 12" width="80%">
          <Typography variant="h3" marginRight="10px">
            L'utente non ha aggiunto nessuna esperienza
          </Typography>
        </Box>
      ) : (
        experiences.map((el, index) => (
          <Box key={index} gridColumn="span 4" width="80%">
            <h2>{el.title}</h2>
            <Box display="flex" alignItems="center">
              <Typography variant="h5" marginRight="10px">
                Dal
              </Typography>
              <h4>{el.year_from}</h4>
              <Typography variant="h5" m="0 10px">
                Al
              </Typography>
              <h4>{el.year_to === "ongoing" && "in corso"}</h4>
            </Box>
            <p>{el.description}</p>
          </Box>
        ))
      )}
    </BoxCard>
  );
};

export default Curriculum;
