import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalAccessToken, getLocalCurrentUser } from "../utils/localStorage";

const useNavigateHome = () => {
  const navigate = useNavigate();
  const localUser = getLocalCurrentUser();
  const localToken = getLocalAccessToken();

  useEffect(() => {
    if (localUser && localToken) {
      navigate("/")
    }
  }, []);
};

export default useNavigateHome;