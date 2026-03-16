import React from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@mui/material';

import  palette  from './palette';
import typography from './typography';
import { shadows } from './shadows';
import { components } from './components';
import { breakpoints } from './breakpoints';

export const theme = createTheme({
  palette,
  typography,
  breakpoints,
  shape: {
    borderRadius: 12, // Default cards, modals, inputs
  },
  shadows,
  components,
});

export const EcommerceThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
