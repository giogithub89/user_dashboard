import { Add } from "@mui/icons-material";
import { IconButton, MenuItem, Select, Tooltip, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { tokens } from "../../theme";
import CategoryChip from "../widget/categoryChip";
import useFetchInterests from "../../api/interestAPI/fetchInterests";
import { useFetchCategories } from "../../api/categoriesAPI/fetchCategories";
import { useFetchBag } from "../../api/bagAPI/fetchBag";

const AREAS_URL = "/staff/areas/";

const InterestsTab = ({ user, sendBagArray }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [interest, setInterest] = useState("");
  const [category, setCategory] = useState("");
  const [bag, setBag] = useState();
  const [chipList, setChipList] = useState(user?.bags ? user?.bags : []);
  const [allChips, setAllChips] = useState(user?.bags);
  const [id, setId] = useState(19);
  const [currentCatId, setCatId] = useState(95);
  const { cards } = useFetchInterests(AREAS_URL);
  const { catList } = useFetchCategories(AREAS_URL, id);
  const { bagList, loading } = useFetchBag(id, currentCatId);
  const [bagId, setBagId] = useState();
  const [selectedBagList, setBagList] = useState([]);

  const changeInterest = (event) => {
    setInterest(event.target.value);
  };
  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const changeBag = (event) => {
    setBag(event.target.value);
  };

  //change interest id
  const selectID = (index) => () => {
    let selectedInterestId = cards[index].id;
    setId(selectedInterestId);
  };
  //change category id
  const selectCatID = (index) => () => {
    let selectedCatId = catList[index].id;
    setCatId(selectedCatId);
  };
  //select bag id
  const handleBagId = (index) => () => {
    let selectedBagId = bagList[index]?.id;
    setBagId(selectedBagId);
  };

  const addNewBag = (event, obj) => {
    let item = chipList.find((item) => item === bag);
    if (bag == null || item) {
      return null;
    } else {
      if (chipList.length < 5) {
        setChipList([...chipList, bag]);
        setBagList([...selectedBagList, bagId]);
        sendBagArray([...selectedBagList, bagId]);
      }
    }
    // const key = obj.key.replace(".$", "");
    // setBagId((previous) => [...previous, key]);
    // console.log(key);
  };

  const handleDelete = (index) => {
    const list = [...chipList];
    list.splice(index, 1);
    setChipList(list);
    const newList = [...selectedBagList];
    newList.splice(index, 1);
    setBagList(newList);
    sendBagArray(newList);
  };

  // useEffect(() => {
  //   if (allChips != null) {
  //     const initialState = allChips.map((obj) => obj);
  //     setChip(initialState);
  //     console.log(initialState);
  //   } else {
  //     setChip([]);
  //   }
  // }, []);

  return (
    <Box>
      <Box display="flex" width="100%">
        <Box display="flex" flexDirection="column" flex={1} m="0px 30px 0px 20px">
          <label htmlFor="iterests-label">Aree di interesse</label>
          <Select labelId="iterests-label" id="iterests-select" value={interest} size="small" onChange={changeInterest}>
            {cards.map((el, i) => (
              <MenuItem key={i} value={el.name} onClick={selectID(i)}>
                {el.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" flexDirection="column" flex={1} m="0px 30px">
          <label htmlFor="iterests-label">Categorie</label>
          <Select labelId="iterests-label" id="iterests-select" value={category} size="small" onChange={changeCategory}>
            {catList.map((el, index) => (
              <MenuItem key={index} value={el.name} onClick={selectCatID(index)}>
                {el.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" flexDirection="column" flex={1} m="0px 30px">
          <label htmlFor="categories-label">Bag</label>
          <Select labelId="categories-label" id="categories-select" value={bag} size="small" onChange={changeBag}>
            {bagList.map((element, i) => (
              <MenuItem key={i} value={element.name} onClick={handleBagId(i)}>
                {element.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" flexDirection="column" flex={1} marginTop="15px">
          <Box display="flex" alignItems="center">
            <Tooltip title="Aggiungi interesse">
              <IconButton sx={{ border: "1px solid", borderColor: colors.secondary[600] }} onClick={addNewBag}>
                <Add sx={{ color: colors.secondary[400] }}></Add>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box m="20px 0px 30px 20px" display="flex" minHeight="30px">
        {chipList.map((widget, index) => (
          <Box>
            <CategoryChip key={index} onDelete={() => handleDelete(index)} label={widget.name ? widget.name : widget} />{" "}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InterestsTab;
