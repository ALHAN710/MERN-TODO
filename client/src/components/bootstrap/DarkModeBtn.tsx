import React from "react";
import { ContextAPI, TContextAPI } from "../../context/ContextAPI";

const DarkModeBtn = () => {
  const { toggleTheme, theme } = React.useContext(ContextAPI) as TContextAPI;
  const mode = theme === "dark" ? true : false;
  const [darkMode, setDarkMode] = React.useState<Boolean>(mode);

  const handleClick = () => {
    toggleTheme(!darkMode ? "dark" : "light");
    setDarkMode(!darkMode);
  };
// 0 10px 20px -10px #2c2c2d
  return (
    <div
      className={`dark-mode-btn cursor-pointer border-[1px] border-solid border-[#e0e6ed] shadow-[0_10px_20px_-10px_rgba(44, 44, 45, 0.851) dark:shadow-[0_10px_20px_-10px_rgba(153, 155, 157, 0.851)] dark:border-[#191e3a] rounded-l-md md:fixed md:top-[40%] md:right-0 md:translate-x-[50%] md:translate-y-[50%] md:p-2 hover:-translate-x-10 hover:shadow-none  transition-all ease-in-out duration-1000 dark:hover:shadow-none
      dark:transition-all dark:ease-in-out dark:duration-1000`}
      onClick={handleClick}
    >
      <a
        href="#"
        className={`theme-toggle`}
        
      >
        {!darkMode ? (
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
            className="feather feather-moon dark-mode"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ) : (
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
            className={`feather feather-sun light-mode ${
              darkMode && "text-[#e2a03f] fill-[#e2a03f]"
            }`}
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </a>
    </div>
  );
};

export default DarkModeBtn;
