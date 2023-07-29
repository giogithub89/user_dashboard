import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Chats from "./pages/drawer_menu/Chats";
import Dashboard from "./pages/drawer_menu/Dashboard";
import Users from "./pages/drawer_menu/user/Users";
import BagContentsLayout from "./pages/drawer_menu/bag_content/BagContentsLayout";
import BagContentsList from "./pages/drawer_menu/bag_content/BagContentsList";
import BagContentPage from "./pages/drawer_menu/bag_content/BagContentPage";
import CreateContent from "./pages/drawer_menu/bag_content/CreateContent";
import Subscription from "./pages/drawer_menu/Subscription";
import Staff from "./pages/drawer_menu/Staff";
import Sponsor from "./pages/drawer_menu/sponsor_content/CreateSponsor";
import SponsorList from "./pages/drawer_menu/sponsor_content/SponsorList";
import SponsorPage from "./pages/drawer_menu/sponsor_content/SponsorPage";
import UserProfile from "./pages/drawer_menu/user/UserProfile";
import AddNewUser from "./pages/drawer_menu/user/AddNewUser";
import EditCVPage from "./pages/drawer_menu/user/EditCVPage";
import AreeTematiche from "./pages/drawer_menu/interests/AreeTematiche";
import CategoriesPage from "./pages/drawer_menu/interests/CategoriesPage";
import BagsPage from "./pages/drawer_menu/interests/BagsPage";
import CommunicatorInvitations from "./pages/drawer_menu/invitations/CommunicatorInvitations";
import ContentsReports from "./pages/drawer_menu/contents_reports/ContentsReport";
import ContentReportPage from "./pages/drawer_menu/contents_reports/ContentReportPage";
import AccountPage from "./pages/account/AccountPage";
import RequireAuth from "./script/RequireAuth";
import Login from "./pages/global/Login";
import Homepage from "./pages/global/Homepage";
import Layout from "./pages/global/Layout";
import Register from "./pages/global/Register";
import ResetPswd from "./pages/global/ResetPswd";
import ValidateResetPswd from "./pages/global/ValidateResetPswd";
import ConfirmResetPswd from "./pages/global/ConfirmResetPswd";
import NotFound404 from "./pages/global/NotFound404";
import Userstats from "./components/dashboard/userstats";

import AccountReports from "./pages/drawer_menu/account_reports/AccountReports";
import { useEffect, useState } from "react";
import { removeUserSession } from "./script/useSessionStorage";

function App() {
  const [theme, colorMode] = useMode();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS;

  const handleBeforeUnload = () => {
    setIsRefreshing(true);
  };

  // useEffect(() => {
  //   // Initialize usePlacesAutocomplete here once the Google Maps API has loaded
  //   const script = document.createElement("script");
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  //   script.onload = () => {
  //     // Load the PlacesAutocomplete component here to initialize usePlacesAutocomplete
  //     PlacesAutocomplete();
  //   };
  //   document.body.appendChild(script);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!isRefreshing) {
  //     removeUserSession();
  //   }
  // }, [isRefreshing]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}></Route>
                <Route path="/password-reset" element={<ResetPswd />} />
                <Route path="/password-reset/validate/" element={<ValidateResetPswd />} />
                <Route path="/password-reset/confirm/" element={<ConfirmResetPswd />} />
                <Route path="*" element={<NotFound404 />} />

                <Route element={<RequireAuth allowedRoles={"admin"} />}>
                  <Route path="/" element={<Homepage />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/users-stats" element={<Userstats />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:userId" element={<UserProfile />} />
                    <Route path="/users/editCvPage/:userId" element={<EditCVPage />} />

                    <Route path="/addNewUser" element={<AddNewUser />} />

                    <Route path="/communicator-invitations" element={<CommunicatorInvitations />} />

                    <Route path="/staff" element={<Staff />} />
                    <Route path="/interests" element={<AreeTematiche />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/bags" element={<BagsPage />} />

                    <Route path="/interests/:id/categories" element={<CategoriesPage />} />

                    <Route path="/interests/:id/categories/:id/bags" element={<BagsPage />} />

                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/bagLayout" element={<BagContentsLayout />}>
                      <Route path="/bagLayout/bag-content" element={<BagContentsList />} />
                      <Route path="/bagLayout/bag-content/:id" element={<BagContentPage />} />
                      <Route path="/bagLayout/create-content" element={<CreateContent />} />
                    </Route>
                    <Route path="/create-sponsor-content" element={<Sponsor />} />
                    <Route path="/sponsor-content/:id" element={<SponsorPage />} />
                    <Route path="/sponsor-content-list" element={<SponsorList />} />
                    <Route path="/contents-reports" element={<ContentsReports />} />
                    <Route path="/contents-reports/:id" element={<ContentReportPage />} />
                    <Route path="/chats-report" element={<Chats />} />
                    <Route path="/account-reports" element={<AccountReports />} />
                    <Route path="/my-account" element={<AccountPage />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
}

export default App;

//  webpack-dev-server --mode development --open --hot
//  webpack --mode production

//react-scripts start
//react-scripts build
//homepage: "dashboard.bigbag-web.com"
