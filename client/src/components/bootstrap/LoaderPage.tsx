import React from "react";

type Props = {
  show: boolean;
};
const LoaderPage: React.FC<Props> = ({ show }) => {
  return (
    // <!-- BEGIN LOADER -->
    <div id="load_screen" className={`${ !show ? "d-none" : ""}`}>
      {" "}
      <div className="loader">
        {" "}
        <div className="loader-content">
          <div className="spinner-grow align-self-center"></div>
        </div>
      </div>
    </div>
    // <!--  END LOADER -->
  );
};

export default LoaderPage;
