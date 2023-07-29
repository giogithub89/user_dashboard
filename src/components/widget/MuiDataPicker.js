import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

export const MuiDataPicker = ({ dob, size }) => {
  const [selectedDate, setSelectedDate] = useState(dob);

  return (
    <DatePicker
      //label="Date Picker"
      renderInput={(params) => <TextField {...params} size={size} />}
      value={selectedDate}
      onChange={(newValue) => {
        setSelectedDate(newValue);
      }}></DatePicker>
  );
};
