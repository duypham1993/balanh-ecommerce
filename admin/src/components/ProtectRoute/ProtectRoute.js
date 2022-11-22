import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLocalAccessToken, getLocalCurrentUser } from "../../services/localStorage";

const ProtectRoute = () => {
  const currentUser = getLocalCurrentUser();
  const accessToken = getLocalAccessToken();
  const location = useLocation();

  return (
    currentUser && accessToken ?
      <Outlet /> :
      <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectRoute;