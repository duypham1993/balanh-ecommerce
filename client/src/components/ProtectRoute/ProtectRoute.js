import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLocalAccessToken, getLocalCurrentUser } from "../../utils/localStorage";

const ProtectRoute = () => {
  const localUser = getLocalCurrentUser();
  const localToken = getLocalAccessToken();
  const location = useLocation();

  return (
    localUser && localToken ?
      <Outlet /> :
      <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectRoute;