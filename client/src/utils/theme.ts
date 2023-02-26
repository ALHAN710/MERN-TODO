import { createTheme } from "@mui/material";
import { createRoot } from "react-dom/client";
import { T_Theme } from "../context/ContextAPI";
// import { T_Theme } from "../context/ContextAPI"
// import {  } from "../context/C";
const rootElement = document.getElementById("root");

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.

const getCustomTheme = (mode: T_Theme) => {
  return createTheme({
    typography: {
      fontFamily: "'Nunito', sans-serif",
    },
    palette: {
      mode: mode === "dark" ? "dark" : "light",
      primary: {
        main: "#0d6efd",
        dark: "#0d6efd",
        light: "#0d6efd",
      },
      secondary: {
        main: "#6c757d",
        dark: "#A95006",
        light: "#FF9D4B",
      },
      error: {
        main: "#dc3545",
        dark: "#E31B0C",
        light: "#F88078",
      },
      warning: {
        main: "#ffc107",
        dark: "#C77700",
        light: "#FFB547",
      },
      info: {
        main: "##0dcaf0;",
        dark: "#0B79D0",
        light: "#64B6F7",
      },
      success: {
        main: "#198754",
        dark: "#3B873E",
        light: "#7BC67E",
      },
      text: {
        primary: "#2F3349",
        secondary: "#7A7E98",
        disabled: "#85889B",
      },
      action: {
        active: "rgba(0, 0, 0, 0.54)",
      },
    },
    components: {
      MuiCard: {
        defaultProps: {
            className: "relative flex flex-col min-w-0"
        }
      },
      MuiPaper: {
        defaultProps: {
          elevation: 4,
          // className: "p-[1.5rem]"
        },
      },
      MuiTable: {
        defaultProps: {
          className: "dark:text-zinc-200",
        },
      },
      MuiTableCell: {
        defaultProps: {
          className: "dark:text-zinc-400",
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: false,
          className: "dark:text-zinc-400",
        },
      },
      MuiSelect: {
        defaultProps: {
          className: "dark:text-zinc-200",
          inputProps: {
            className: "dark:text-zinc-400",
          },
          // IconComponent: {
          //   className: "dark:text-zinc-200"
          // }
        },
      },
      MuiIcon: {
        defaultProps: {
          className: "dark:text-zinc-200",
        },
      },
      MuiMenuItem: {
        defaultProps: {
          className: "dark:text-zinc-200",
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          className: "dark:text-zinc-200",
        },
      },
      MuiPaginationItem: {
        defaultProps: {
          className: "dark:text-zinc-400",
        },
      },
      MuiTextField: {
        defaultProps: {
          InputProps: {
            className: "dark:text-zinc-300 dark:border-red-500",
          },
          InputLabelProps: {
            className: "",
          },

          // className: "dark:text-slate-400 border-white",
          sx: {
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {},
            },
          },
        },
      },
      MuiTablePagination: {
        defaultProps: {
          className: "dark:text-zinc-200",
        },
      },
      MuiInputBase: {
        defaultProps: {
          className: "dark:text-zinc-200",
        },
      },
      MuiInputLabel: {
        defaultProps: {
          // className: "dark:text-slate-400",
        },
      },
      MuiTypography: {
        defaultProps: {
          color: "textPrimary",
          // className: "dark:text-slate-300",
        },
      },
    },
  });
};
export default getCustomTheme;
