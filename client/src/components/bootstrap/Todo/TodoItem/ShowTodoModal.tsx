import React from "react";
import { T_Task } from "../../../../types/models/@task";

type Props = {
  todo: T_Task | null;
  setTodoToDisplay: React.Dispatch<React.SetStateAction<T_Task | null>>
};
const ShowTodoModal: React.FC<Props> = ({ todo, setTodoToDisplay }) => {

  const open = React.useMemo(() => todo !== null, [todo]);

  const {current: el} = React.useRef<HTMLDivElement | undefined>();

  const closeModal = () => {
    const modalBackdrop = document.querySelector('.modal-backdrop') as HTMLDivElement;
    document.body.removeChild(modalBackdrop);
    document.body.classList.remove('modal-open');
    document.body.style.cssText = "";
    setTodoToDisplay(null);
  };

  React.useEffect(() => {
    // el?.style.display = 'none'; 

  }, [open]);

  return (
    <div
      className={`modal fade ${open ? "show" : ""}`}
      id="todoShowListItem"
      tabIndex={-1}
      role="dialog"
      aria-hidden={open ? "false" : "true"}
      aria-modal={open ? "true" : "false"}
      style={{ display: open ? "block" : "none"}}
      // ref={el}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="task-heading modal-title mb-0">{todo?.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal} 
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <div className="compose-box">
              <div className="compose-content">
                <p className="task-text">{todo?.description}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn" data-bs-dismiss="modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTodoModal;
