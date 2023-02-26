import React from "react";
import { T_Task } from "../../../../types/models/@task";

type Props = {
    todo: T_Task;
}
const ActionsMenu: React.FC<Props> = ({todo}) => {

  const [showActionsMenu, setShowActionsMenu] = React.useState(false);

  const myDiv = React.useRef<HTMLDivElement>(null);

  const toggleShowActionsMenu = () => {
    setShowActionsMenu(!showActionsMenu);
    if (myDiv.current) {
      myDiv.current.style.cssText = !showActionsMenu
        ? "position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 23px);"
        : "";
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // TODO: Handle the click event to edit the specific task
    // const priority = e.currentTarget.getAttribute("data-priority");
    // console.log(priority);
    // toggleShowActionsMenu();
  };

  return (
    <>
      <a
        className={`dropdown-toggle ${showActionsMenu ? "show" : ""}`}
        href="#"
        role="button"
        id="dropdownMenuLink-2"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={toggleShowActionsMenu}
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
          className="feather feather-more-vertical"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </a>

      <div className={`dropdown-menu left ${showActionsMenu ? "show" : ""}`} aria-labelledby="dropdownMenuLink-2">
        <a className={`edit dropdown-item ${todo.isTrashed ? "d-none" : ""}`} href="#" data-action={"edit"} onClick={handleClick}>
          Edit
        </a>
        <a className={`important dropdown-item ${todo.isTrashed ? "d-none" : ""}`} href="#" data-action={"important"} onClick={handleClick}>
          Important
        </a>
        <a className={`dropdown-item delete ${todo.isTrashed ? "d-none" : ""}`} href="#" data-action={"delete"} onClick={handleClick}>
          Delete
        </a>
        <a className={`dropdown-item permanent-delete ${!todo.isTrashed ? "d-none" : ""}`} href="#" data-action={"permanent-delete"} onClick={handleClick}>
          Permanent Delete
        </a>
        <a className={`dropdown-item revive ${!todo.isTrashed ? "d-none" : ""}`} href="#" data-action={"revive"} onClick={handleClick}>
          Revive Task
        </a>
      </div>
    </>
  );
};

export default ActionsMenu;
