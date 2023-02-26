import React from "react";

type Props = { 
    color: "primary" | "warning" | "danger";
};

const ShowPriority: React.FC<Props> = ({color}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // TODO: Handle the click event to display the submenu edit task priority
  }
  
  return (
    <a
      className={`dropdown-toggle ${color}`}
      href="#"
      role="button"
      id="dropdownMenuLink-1"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="true"
      onClick={handleClick}
    >
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
        className="feather feather-alert-octagon"
      >
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12" y2="16"></line>
      </svg>
    </a>
  );
};

export default ShowPriority;
