import gif from "../../assets/imgs/404-light.gif";

const PageNotFound = () => {
  return (
    <div className="bg-404 text-center px-3 py-3 px-md-0 py-md-5">
      <img src={gif} alt="404 page not found" className="mw-100" />
    </div>
  );
};

export default PageNotFound;