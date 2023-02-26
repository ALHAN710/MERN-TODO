import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import DarkModeBtn from "./components/bootstrap/DarkModeBtn";
import { toast, ToastContainer } from "react-toastify";
import { ContextAPI, TContextAPI } from "./context/ContextAPI";
import LoaderPage from "./components/bootstrap/LoaderPage";
import * as config from "./utils/config";
import NavBar from "./components/bootstrap/NavBar";
import Tasks from "./pages/Todos";
import { NotFound } from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  const [showLoaderPage, setShowLoaderPage] = React.useState(true);

  const { theme: mode_ } = React.useContext(ContextAPI) as TContextAPI;
  console.log("App Theme Mode = ", mode_);
  const mode = React.useMemo(() => mode_, [mode_]);

  React.useEffect(() => {
    console.log("BASE URL", import.meta.env.BASE_URL)
    setShowLoaderPage(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={theme}> */}
      <div className="hidden lg:contents">
        <DarkModeBtn />
      </div>
      <LoaderPage show={showLoaderPage} />
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={config.signIn} element={<Login />} />
          <Route path={config.signUp} element={<Register />} />
          <Route
            path={config.todosPath}
            element={
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position={toast.POSITION.BOTTOM_LEFT}
        theme={mode !== "dark" ? "colored" : mode}
      />
      {/* </ThemeProvider> */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}

export default App;
