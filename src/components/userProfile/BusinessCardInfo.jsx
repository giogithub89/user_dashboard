import { Box, TextField, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import CellGridCustom from "../gridLayout/CellGridCustom";
import BoxCard from "../gridLayout/BoxCard";
import ContainedButton from "../buttons/ContainedButton";
import { tokens } from "../../theme";
import CustomCard from "../widget/customCard";

const BusinessCardInfo = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const rSocialeRef = useRef(null);
  const vatNumberRef = useRef();
  const nCivicoRef = useRef();
  const addressRef = useRef();
  const zipCodeRef = useRef();

  const [rSociale, setRSociale] = useState(user?.business_name);
  const [vat_number, setVatNumber] = useState(user?.vat_number);
  const [address, setAddress] = useState(user?.address);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("inputRef " + rSocialeRef.current.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <CustomCard>
        <BoxCard backgroundColor={colors.primary[400]} rowGap="30px">
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="rSociale">Ragione Sociale</label>
            <TextField
              inputRef={rSocialeRef}
              type="text"
              id="rSociale"
              required
              onChange={(event) => setRSociale(event.target.value)}
              value={rSociale}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="vatNumber">P. Iva</label>
            <TextField
              inputRef={vatNumberRef}
              type="text"
              id="vatNumber"
              required
              onChange={(event) => setVatNumber(event.target.value)}
              value={vat_number}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%"></CellGridCustom>
          {/*ROW 2 */}
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="nCivico">N.civico</label>
            <TextField inputRef={nCivicoRef} id="nCivico" type="text" required></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="address">Indirizzo</label>
            <TextField
              inputRef={addressRef}
              type="text"
              id="address"
              required
              onChange={(event) => setAddress(event.target.value)}
              value={address}></TextField>
          </CellGridCustom>
          <CellGridCustom gridColumn="span 4" width="90%">
            <label htmlFor="zipCode">Codice Postale</label>
            <TextField inputRef={zipCodeRef} type="text" id="zipCode" required></TextField>
          </CellGridCustom>
          {/* ROW 3 */}
          <Box gridColumn="span 10" display="flex" alignItems="center" justifyContent="center"></Box>
          <Box gridColumn="span 2" display="flex" alignItems="center" justifyContent="center">
            <ContainedButton text="salva modifiche" variant="contained" color="secondary"></ContainedButton>
          </Box>
        </BoxCard>
      </CustomCard>
    </form>
  );
};

export default BusinessCardInfo;
