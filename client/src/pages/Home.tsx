import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { checkIsAuthenticated } from '../services/auth/isAuthenticated'
import { signIn, todosPath } from '../utils/config';
import { modalBackdrop } from '../utils/todo';

const Home = () => {
  // Get the global state isAuthenticated from redux store management
  const isAuthenticated = checkIsAuthenticated();

  const location = useLocation();

  // const navigate = useNavigate();
  // console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={signIn} replace state={{ from: location }} />;
  } else {
    return <Navigate to={todosPath} replace state={{ from: location }} />;;
  }
}

export default Home