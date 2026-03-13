import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows, customShadows } from './shadows';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { componentsOverrides } from './components';

export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows: shadows,
      customShadows: customShadows,
      breakpoints,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
