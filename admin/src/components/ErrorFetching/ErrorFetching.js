import "./error-fetching.scss";

const ErrorFetching = () => {
  return (
    <div className="rejected">
      <div className="rejected__content">
        <h3 className="rejected__title">
          500 <span>Server Error</span>
        </h3>
        <h5 className="rejected__desc">
          Oops, something went wrong.
        </h5>
        <h5 className="rejected__desc">
          Try to <i onClick={(e) => { window.location.reload() }}>refresh</i> this page or feel free to contact us if the problem persists.
        </h5>
      </div>
    </div>
  )
};

export default ErrorFetching;