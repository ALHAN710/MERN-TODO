import React, { ReactNode } from "react";

type TAlertProps = {
  open?: boolean;
  color?: "primary" | "secondary" | "danger" | "warning" | "info";
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SeverityMessage: { [name: string]: string } = {
  danger: "Error",
  warning: "Warning",
  info: "Info",
};

const alertSvgIcon: { [name: string]: ReactNode } = {
  danger: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>,
  warning: <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="feather feather-alert-triangle"
>
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
  <line x1="12" y1="9" x2="12" y2="13"></line>
  <line x1="12" y1="17" x2="12" y2="17"></line>
</svg>,
  
}

const AlertNotification: React.FC<TAlertProps> = ({
  open,
  color,
  message,
  setOpen,
}) => {
  return (
    <div
      className={`alert alert-icon-left alert-light-${color} alert-dismissible fadeInDown mb-4 ${
        open ? "show" : "d-none"
      }`}
      role="alert"
    >
      <button
        type="button"
        className="btn-close ms-2"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => {
          setOpen(false);
        }}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-bs-dismiss="alert"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x close"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      {alertSvgIcon[color as string]}
      {message}
    </div>
  );
};

export default AlertNotification;
