// Material UI expects shadows to be an array of exactly 25 strings. 
// We are primarily using component-specific box-shadows in our theme, 
// so we can export the default theme shadows or customize them here if needed.
// For now, we rely on component overrides for our elevated surfaces.

import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();
export const shadows = defaultTheme.shadows;
