import { useNavigate } from "react-router-dom";
import "./not-found.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="rejected">
      <div className="rejected__content">
        <h3 className="rejected__title">
          404 <span>Page Not Found</span>
        </h3>
        <h5 className="rejected__desc">
          Oops, something went wrong.
        </h5>
        <h5 className="rejected__desc">
          The Page you are looking for doesn't exist or an other error occurred.
        </h5>
        <button className="btn-df" onClick={(e) => navigate("/", { replace: true })}>Back To Home</button>
      </div>
    </div>
  )
};

export default NotFound;