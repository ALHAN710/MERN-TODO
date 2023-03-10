import React from "react";

const Footer = () => {
  return (
    <div className="footer-wrapper mt-0 flex flex-col justify-center items-center md:flex-row md:justify-between">
      <div className="footer-section f-section-1">
        <p className="">
          Copyright © <span className="dynamic-year">2023</span> , All rights
          reserved.
        </p>
      </div>
      <div className="footer-section">
        <p className="">
          Coded with{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-heart"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>{" "}
          by{" "}
          <a
            href="https://www.linkedin.com/in/pascal-alhadoum-7454a5a4/"
            target={"_blank"}
            className="text-[#6c757d]"
          >
            Pascal ALHADOUM
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
