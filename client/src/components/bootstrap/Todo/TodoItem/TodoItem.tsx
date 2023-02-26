import React from "react";
import { Skeleton } from "@mui/material";
import { priorityColor } from "../../../../types/@todoType";
import { T_Task } from "../../../../types/models/@task";
import EditPriorityMenu from "./EditPriorityMenu";
import ShowPriority from "./ShowPriority";
import { ReactQueryStatus } from "../../../../types/utils";
import { UseMutationResult } from "@tanstack/react-query";
import ActionsMenu from "./ActionsMenu";
import { TActionModal } from "../../../../pages/Todos";
import { v4 as uuid } from "uuid";
import { modalBackdrop } from "../../../../utils/todo";

type Props = {
  todo: T_Task;
  setTodoToDisplay: React.Dispatch<React.SetStateAction<T_Task | null>>;
  setActionModal: React.Dispatch<React.SetStateAction<TActionModal>>;
  mutation: UseMutationResult<
    {
      data: T_Task;
    },
    unknown,
    T_Task,
    {
      previousTodos: [] | T_Task[] | undefined;
    }
  >;
};

const TodoItem: React.FC<Props> = ({
  todo,
  setTodoToDisplay,
  setActionModal,
  mutation,
}) => {
  const [isChecked, setIsChecked] = React.useState<boolean>(todo.isDone);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      // TODO: Handle the checkbox change event to Update the todo item isDone property
      console.log(e.target.checked);
      setIsChecked(e.target.checked);
      todo.isDone = e.target.checked;
      console.log(todo);
      modalBackdrop(true, true);
      mutation.mutateAsync(todo);
    },
    []
  );

  const openModal = React.useCallback((action: string) => {
    switch (action) {
      case "show":
        setTodoToDisplay(todo);
        const bdy = window.document.body;
        bdy.classList.add("modal-open");
        bdy.style.cssText = "overflow: hidden; padding-right: 0px;";
        const el = document.createElement("div");
        el.className = "modal-backdrop fade show";
        // console.log(el);
        bdy.appendChild(el);

        break;

      case "edit":
        // open edit modal
        setActionModal({
          action: "editTask",
          todo,
        });

        break;

      default:
        break;
    }
  }, []);

  return (
    <div
      className={`todo-item ${isChecked ? "todo-task-done" : ""}`}
      
    >
      <div className="todo-item-inner">
        <div className="n-chk text-center">
          <div
            className="form-check form-check-primary form-check-inline mt-1 me-0"
            data-bs-toggle="collapse"
            data-bs-target
          >
            <input
              className="form-check-input inbox-chkbox"
              type="checkbox"
              checked={isChecked}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="todo-content" onClick={() => openModal("show")}>
          <h5 className="todo-heading">{todo.title}</h5>
          <p className="todo-text">{todo.description}</p>
        </div>

        <div className="priority-dropdown custom-dropdown-icon">
          <div className="dropdown p-dropdown">
            {/* <ShowPriority color={priorityColor[todo.priority]} /> */}

            {/* <EditPriorityMenu color={priorityColor[todo.priority]}/> */}
            {/* <a className="bs-tooltip">Priority : {todo.priority}</a> */}
            <a
              className={`dropdown-toggle ${
                priorityColor[todo.priority]
              } bs-tooltip`}
              href="#"
              role="button"
              id="dropdownMenuLink-1"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              // onClick={handleClick}
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
          </div>
        </div>

        <div className="action-dropdown custom-dropdown-icon me-2">
          <div className="dropdown">
            {/* <ActionsMenu todo={todo} /> */}
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink-2"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => openModal("edit")}
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
                className="feather feather-edit-2"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
              {/* <svg
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
              </svg> */}
            </a>

            {/* <div
              className="dropdown-menu left"
              aria-labelledby="dropdownMenuLink-2"
            >
              <a className="edit dropdown-item" href="#">
                Edit
              </a>
              <a className="important dropdown-item" href="#">
                Important
              </a>
              <a className="dropdown-item delete" href="#">
                Delete
              </a>
              <a className="dropdown-item permanent-delete" href="#">
                Permanent Delete
              </a>
              <a className="dropdown-item revive" href="#">
                Revive Task
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
