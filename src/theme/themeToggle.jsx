import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ColorModeContext } from "./themeProvider";

const ThemeToggle = () => {

  const { toggleTheme, mode } = useContext(ColorModeContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeToggle;