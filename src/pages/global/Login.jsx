import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography, InputAdornment, IconButton, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import SnackBarCustom from "../../components/widget/SnackBarCustom";
import CustomForm from "../../components/form/customForm";
import { useFetchLogin } from "../../api/loginAPI/login";
import { setUserSession } from "../../script/useSessionStorage";

const LOGIN_URL = "/staff/login";

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [helperText, setHelperText] = useState({});
  const [emailErrMsg, setEmailErrMsg] = useState();
  const [pswdErrMsg, setPaswErrMsg] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, errMessage, open, openSnackbar: setOpenSnackbar, mutate } = useFetchLogin();
  const navigate = useNavigate();

  //manage show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email: email, password: pswd };
    //mutate(LOGIN_URL, data);
    if (data) {
      navigate("/");
      setUserSession(email);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <CustomForm>
      <Box m="30px 0px 40px 0px">
        <Typography variant="h1" textAlign="center" fontWeight="bold">
          STAFF LOGIN
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" height="40vh" justifyContent="space-around">
          <label htmlFor="email">Email</label>
          <TextField
            //focused
            error={emailErrMsg}
            helperText={emailErrMsg}
            type="email"
            id="email"
            inputRef={emailRef}
            fullWidth
            autoComplete="on"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}></TextField>

          <FormControl variant="outlined">
            <label htmlFor="password">Password</label>
            <OutlinedInput
              error={helperText.pswd}
              aria-describedby="password-helper-text"
              type={showPassword ? "text" : "password"}
              id="password"
              value={pswd}
              onChange={(e) => setPswd(e.target.value)}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {helperText.pswd && <FormHelperText id="password-helper-text">{helperText.pswd}</FormHelperText>}
          </FormControl>

          <Box m="20px 0px 0px 0px" display="flex" justifyContent="center">
            <LoadingButton
              loading={isLoading}
              sx={{ borderRadius: 2, width: "50%" }}
              color="primary"
              variant="contained"
              type="submit">
              Login
            </LoadingButton>
          </Box>
          <Box marginTop="30px">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography color="white" sx={{ ":hover": { color: "rgb(51,198,182)" } }}>
                Invitation code? Register here
              </Typography>
            </Link>
            <Link to="/password-reset" style={{ textDecoration: "none" }}>
              <Typography color="white" sx={{ ":hover": { color: "rgb(51,198,182)" } }}>
                Forgot Password
              </Typography>
            </Link>
          </Box>
        </Box>
      </form>
      <SnackBarCustom severity="error" open={open} onClose={handleCloseSnackbar} text={errMessage} />
    </CustomForm>
  );
};

export default Login;
