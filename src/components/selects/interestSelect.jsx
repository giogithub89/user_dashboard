import { Box, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";

export const InterestSelect = ({
  labelId,
  id,
  fullWidth,
  areaId,
  list,
  //navigate,
  setInterestId,
  ...props
}) => {
  const [interest, setInterest] = useState(props.interestName);
  const [currentIntId, setIntId] = useState(areaId ? areaId : 19);

  const onChange = (event) => {
    setInterest(event.target.value);
  };

  //change category id
  const selectIntID = (index) => () => {
    let selectedId = list[index].id;
    setIntId(selectedId);
    setInterestId(selectedId);
    //navigate();
    //setCurrentPage(1);
  };

  return (
    <Box width="40%">
      <Select labelId={labelId} id={id} value={interest} size="small" onChange={onChange} fullWidth={fullWidth}>
        {list.map((el, index) => (
          <MenuItem key={index} value={el.name} onClick={selectIntID(index)}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
