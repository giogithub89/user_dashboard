import * as React from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtonsMultiple() {
  const [formats, setFormats] = React.useState(() => []); //["bold", "italic"]

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting" sx={{ marginTop: "20px" }}>
      <ToggleButton value="bold" aria-label="bold">
        <FormatBoldIcon />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <FormatUnderlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
