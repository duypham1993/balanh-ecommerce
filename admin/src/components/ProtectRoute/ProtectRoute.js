import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const accessToken = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();

  return (
    currentUser && accessToken ?
      <Outlet /> :
      <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectRoute;