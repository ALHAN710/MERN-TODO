import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { todosPath } from "../utils/config";

export const NotFound = () => {
  // Using to get the origin url location if it exists to redirect after login successfull
  const location = useLocation();

  //Redirect to the origin or tasks page
  const origin = location.state?.from?.pathname || todosPath;

  // const navigate = useNavigate();
  // const goBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   e.preventDefault();
  // 	navigate(-1);
  // }

  React.useEffect(() => {
    const bdy = window.document.body;
    bdy.classList.add("error");
    bdy.classList.add("text-center");

    return () => {
      bdy.classList.remove("error");
      bdy.classList.remove("text-center");
    };
  }, []);

  return (
    <>
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 mr-auto mt-5 text-md-left text-center">
            <a href="#" className="ml-md-5">
              <img
                alt="image-404"
                src="../../public/img/logo.svg"
                className="dark-element theme-logo"
              />
              <img
                alt="image-404"
                src="../../public/img/logo2.svg"
                className="light-element theme-logo"
              />
            </a>
          </div>
        </div>
      </div> */}
      <div className="container-fluid error-content">
        <div className="">
          <h1 className="error-number">404</h1>
          <p className="mini-text">Ooops!</p>
          <p className="error-text mb-5 mt-1">
            The page you requested was not found!
          </p>
          <img
            src="../../public/img/error.svg"
            alt="error-404"
            className="error-img"
          />
          <Link to={origin} replace className="btn btn-dark mt-5">
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
};
