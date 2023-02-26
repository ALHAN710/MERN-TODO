
// RESTFUL API endpoints
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiTodosUrl = apiBaseUrl + '/tasks';

export const apiUsersUrl = apiBaseUrl + '/users';
export const apiUsersSignUpUrl = apiUsersUrl + '/signup';
export const apiUsersSignInUrl = apiUsersUrl + '/signin';

// ========== REACT ROUTER URL ==========
export const todosPath = import.meta.env.VITE_REACT_ROUTER_TODOS_PATH;
export const usersPath = import.meta.env.VITE_REACT_ROUTER_USERS_PATH;
export const signUp = usersPath + "/signup";
export const signIn = usersPath + "/signin";