import { Box, useTheme } from "@mui/material";
import Fab from "@mui/material/Fab";

import { tokens } from "../../theme";

const BottomFabCustom = ({ onClick, text, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box position="fixed" zIndex="99" right="0" bottom="100px" marginRight="20px">
      <Fab
        onClick={onClick}
        variant="extended"
        sx={{
          backgroundColor: colors.white[900],
          color: colors.black[100],
          ":hover": { color: "#ffffff !important", backgroundColor: colors.blue[500] },
        }}>
        {icon}
        {text}
      </Fab>
    </Box>
    // sx={{ "& > :not(style)": { m: 1 } }}
  );
};

export default BottomFabCustom;
