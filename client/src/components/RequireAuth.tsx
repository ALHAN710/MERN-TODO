import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkIsAuthenticated } from "../services/auth/isAuthenticated";
import { Props } from "../types/utils";
import { signIn } from "../utils/config";
import { modalBackdrop } from "../utils/todo";

const RequireAuth: React.FC<Props> = ({ children }) => {
  // Get the global state isAuthenticated from redux store management
  const isAuthenticated = checkIsAuthenticated();

  const location = useLocation();

  // const navigate = useNavigate();
  // console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    // Hide overlay
    // modalBackdrop(false);
    
    return <Navigate to={signIn} replace state={{ from: location }} />;
  } else {
    return <>{children}</>;
  }
};

export default RequireAuth;
