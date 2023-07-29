import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ label, option, onChange, disabled, value, loadOptions }) {
  //avoid duplicates headers
  const sortedOptions = [...option].sort((a, b) => {
    const areaA = a?.area?.name || "";
    const areaB = b?.area?.name || "";
    return areaA.localeCompare(areaB);
  });

  const [options, setOptions] = useState(sortedOptions ? sortedOptions : []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadInitialOptions();
  }, []);

  const loadInitialOptions = async () => {
    setLoading(true);
    const initialOptions = await loadOptions(page);
    setOptions(initialOptions);
    setLoading(false);
  };

  const handleScroll = async (event) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight && !loading) {
      setLoading(true);
      const newOptions = await loadOptions(page + 1);
      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
      setLoading(false);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <label>{label}</label>
      <Autocomplete
        // loading={loading}
        // onScroll={handleScroll}
        // loadingText="Loading..."
        disablePortal
        multiple
        filterSelectedOptions
        disabled={disabled}
        value={value}
        freeSolo
        //isOptionEqualToValue={}
        onChange={onChange}
        id="combo-box-demo"
        options={sortedOptions}
        groupBy={(option) => option?.area?.name}
        key={(option) => option.id}
        sx={{ width: 300 }}
        getOptionLabel={(option) => (option?.username ? option?.username : option?.name)}
        renderInput={(params) => <TextField {...params} placeholder="Search..." />}
      />
    </>
  );
}
