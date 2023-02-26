import React from "react";
import { priorityColor } from "../../../../types/@todoType";

const priorityText = ["High", "Middle", "Low"];

type Props = { 
  color: "primary" | "warning" | "danger";
};

const EditPriorityMenu: React.FC<Props> = ({color}) => {

  const [showEditPriorityMenu, setShowEditPriorityMenu] = React.useState(false);
  
  const myDiv = React.useRef<HTMLDivElement>(null);

  const toggleShowEditPriorityMenu = () => {
    setShowEditPriorityMenu(!showEditPriorityMenu);
    if(myDiv.current) {
      myDiv.current.style.cssText = !showEditPriorityMenu ? "position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 31px);" : "";
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // TODO: Handle the click event to edit the priority of the specific task
    const priority = e.currentTarget.getAttribute("data-priority");
    console.log(priority);
    toggleShowEditPriorityMenu();
  };

  return (
    <>
      <a
        className={`dropdown-toggle ${color} ${showEditPriorityMenu ? "show" : ""}`}
        href="#"
        role="button"
        id="dropdownMenuLink-1"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={showEditPriorityMenu ? "true" : "false"}
        onClick={toggleShowEditPriorityMenu}
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
      <div className={`dropdown-menu left ${showEditPriorityMenu ? "show" : ""}`} aria-labelledby="dropdownMenuLink-1" ref={myDiv}>
        {priorityText.map((priority) => (
          <a
            className={`dropdown-item ${
              priorityColor[priority.toUpperCase()]
            }`}
            href="#"
            data-priority={priority.toUpperCase()}
            key={priority.toUpperCase()}
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
            </svg>{" "}
            {priority}
          </a>
        ))}
      </div>
    </>
  );
};

export default EditPriorityMenu;
