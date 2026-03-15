import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import palette from "./palette";
import typography from "./typography";

export const ColorModeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {

  const [mode, setMode] = useState(localStorage.getItem("theme") ?? "light")


  const toggleTheme = () => {
    setMode((prev) => {
      const theme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme)
      return theme
    });
  };


  const theme = useMemo(() => {
    return createTheme({
      palette: palette(mode),
      typography
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWrapper;