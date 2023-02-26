import { Skeleton } from "@mui/material";
import React from "react";
import TodoMenuOptionsLoader from "../../mui/Loader/Todo/TodoMenuOptionsLoader";
import { ReactQueryStatus } from "../../../types/utils";
import { T_Task } from "../../../types/models/@task";
import { T_TodosToDisplay } from "../../../types/@todoType";
import { TActionModal } from "../../../pages/Todos";

type Props = {
  status: ReactQueryStatus;
  show: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  setActionModal: React.Dispatch<React.SetStateAction<TActionModal>>
  todos: T_Task[] | [];
  setTypeFilter: React.Dispatch<React.SetStateAction<T_TodosToDisplay>>;
};

const TodoSideMenu: React.FC<Props> = ({
  status,
  show,
  todos,
  setTypeFilter,
  setActionModal,
}) => {
  const { current: myLinks } = React.useRef<HTMLAnchorElement[]>([]);

  const addLink = React.useCallback(
    (link: HTMLAnchorElement) => {
      if (link && !myLinks.includes(link)) {
        myLinks.push(link);
      }
    },
    [],
  );

  React.useEffect(() => {
    //   console.log(myLinks);

    return () => {};
  }, []);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const linkClicked = e.target as HTMLAnchorElement;
      // console.log(linkClicked.getAttribute("id"));
      if (!linkClicked.classList.contains("active"))
        linkClicked.classList.add("active");
      linkClicked.setAttribute("aria-selected", "true");

      for (let link of myLinks) {
        if (link.getAttribute("id") !== linkClicked.getAttribute("id")) {
          if (link.classList.contains("active"))
            link.classList.remove("active");
          link.setAttribute("aria-selected", "false");
        }
      }

      setTypeFilter(linkClicked.getAttribute("data-type") as T_TodosToDisplay);
    },
    []
  );

  const menuOptions = React.useMemo(
    () => [
      <a
        className="nav-link list-actions active"
        id="all-list"
        data-toggle="pill"
        data-type="all list"
        href="#"
        role="tab"
        aria-selected="true"
        ref={addLink}
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
          className="feather feather-list"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3" y2="6"></line>
          <line x1="3" y1="12" x2="3" y2="12"></line>
          <line x1="3" y1="18" x2="3" y2="18"></line>
        </svg>{" "}
        Inbox{" "}
        <span className="d-inline-flex items-center justify-center todo-badge badge">
          {todos.length}
        </span>
      </a>,
      <a
        className="nav-link list-actions"
        id="todo-task-done"
        data-toggle="pill"
        data-type="isDone"
        href="#"
        role="tab"
        aria-selected="false"
        ref={addLink}
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
          className="feather feather-thumbs-up"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>{" "}
        Done{" "}
        <span className="d-inline-flex items-center justify-center todo-badge badge">
          {todos.filter((todo: T_Task) => todo.isDone).length}
        </span>
      </a>,
      <a
        className="nav-link list-actions"
        id="todo-task-important"
        data-toggle="pill"
        data-type="isImportant"
        href="#"
        role="tab"
        aria-selected="false"
        ref={addLink}
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
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>{" "}
        Important{" "}
        <span className="items-center justify-center d-inline-flex todo-badge badge">
          {todos.filter((todo: T_Task) => todo.isImportant).length}
        </span>
      </a>,
      <a
        className="nav-link list-actions"
        id="todo-task-trash"
        data-toggle="pill"
        data-type="isTrashed"
        href="#"
        role="tab"
        aria-selected="false"
        ref={addLink}
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
          className="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>{" "}
        Trash{" "}
        <span
          className="d-inline-flex items-center justify-center text-danger todo-badge badge"
          style={{ borderColor: "#e7515a" }}
        >
          {todos.filter((todo: T_Task) => todo.isTrashed).length}
        </span>
      </a>,
    ],
    [todos]
  );

  return (
    <div className={`tab-title ${show ? "mail-menu-show" : ""}`}>
      <div className="row">
        <div className="col-md-12 col-sm-12 col-12 text-center">
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
            className="feather feather-clipboard"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <h5 className="app-title">Todo List</h5>
        </div>
        
        <div className="col-md-12 col-sm-12 col-12 ps-0">
          <div className="todoList-sidebar-scroll mt-4">
            <ul className="nav nav-pills d-block" id="pills-tab" role="tablist">
              {menuOptions.map((option, index) => (
                <li className="nav-item" key={`nav-item-${index}`}>
                  {status !== "loading" ? option : <TodoMenuOptionsLoader />}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-12 col-sm-12 col-12">
          {status !== "loading" ? (
            <a className="btn btn-secondary" id="addTask" href="#" onClick={() => setActionModal({action: "createTask", todo: null})}>
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
                className="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>{" "}
              New Task
            </a>
          ) : (
            <Skeleton
              variant={"rounded"}
              animation={"pulse"}
              sx={{ mx: "auto" }}
              width={"70%"}
              height={"40px"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoSideMenu;
