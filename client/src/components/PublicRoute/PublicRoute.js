import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLocalAccessToken, getLocalCurrentUser } from "../../utils/localStorage";

const PublicRoute = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const localUser = getLocalCurrentUser();
  const localToken = getLocalAccessToken();
  const location = useLocation();

  return (
    Object.keys(currentUser).length || localUser && localToken ?
      <Navigate to="/profile" state={{ from: location }} replace />
      :
      <Outlet />
  )
}

export default PublicRoute;