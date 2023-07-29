import { LoadingButton } from "@mui/lab";
import React from "react";

const LoadingBtn = ({ loading, text }) => {
  return (
    <LoadingButton loading={loading} variant="contained" color="secondary" type="submit" sx={{ borderRadius: 2 }}>
      {text}
    </LoadingButton>
  );
};

export default LoadingBtn;
