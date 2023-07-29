import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ totalCards, cardsPerPage, onChange, page, sx }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pages.push(i);
  }

  return (
    <Stack spacing={2}>
      <Pagination count={pages.length} color="primary" onChange={onChange} page={page} sx={sx} />
    </Stack>
  );
}
