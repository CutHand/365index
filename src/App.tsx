import * as React from "react";
import { Box } from "@mui/material";

import { useSelector } from "react-redux";
import { theme } from "./store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import {Outlet} from "react-router-dom"

import Header from "./components/Header";


export default function App() {
  const currentTheme = useSelector(theme);
  const themeMode = createTheme({
    palette: {
      mode: currentTheme,
      ...(currentTheme === "light"
        ? {
            // primary: amber,
            // divider: amber[200],
            text: {
              primary: grey[800],
              secondary: grey[700],
            },
            background: {
              default: "#f8f6f7",
              // paper: "#E4F3F6",
            },
          }
        : {
            primary: {
              main: "#66b2ff",
              contrastText: "#fff",
            },
            divider: "#66b2ff",
            background: {
              default: "#0a1929",
              paper: "#001e3c",
            },
            text: {
              primary: "#66b2ff",
              secondary: grey[500],
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={themeMode}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
