import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { getToken } from "./useSessionStorage";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  //check if email is logged in
  return getToken() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;

  //return auth?.email ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;

  // auth?.roles?.find(role => allowedRoles?.includes(role))
  // ? <Outlet />
  // : auth?.user
  //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
  //     : <Navigate to="/login" state={{ from: location }} replace />
};

export default RequireAuth;
