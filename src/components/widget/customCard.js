import { Paper } from "@mui/material";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";

const CustomCard = ({ children, flexDirection, m, p, alignItems }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper
      sx={{
        m: m,
        p: p,
        borderRadius: "15px",
        display: "flex",
        flexDirection: { flexDirection },
        alignItems: { alignItems },
        backgroundColor: colors.primary[400],
      }}
      elevation={3}
      height="70%">
      {children}
    </Paper>
  );
};

export default CustomCard;
