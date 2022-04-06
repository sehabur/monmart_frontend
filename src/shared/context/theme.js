import { createTheme } from '@mui/material/styles';

import { grey } from '@mui/material/colors';

const monmartColors = {
  blue: '#1F456E',
  pink: '#FFAE78',
  orange: '#FF834F',
  red: '#FF4949',
};

export default createTheme({
  palette: {
    monmartBlue: {
      main: monmartColors.blue,
      contrastText: '#FFF',
    },
    monmartPink: {
      main: monmartColors.pink,
      dark: '#ff8a65',
      contrastText: '#000',
    },
    monmartOrange: {
      main: monmartColors.orange,
      light: monmartColors.pink,
      dark: '#ff7043',
      contrastText: '#FFF',
    },
    monmartRed: {
      main: monmartColors.red,
      contrastText: '#FFF',
    },
    background: {
      default: grey[100],
    },
  },

  components: {
    MuiTypography: {
      // Changing default props //
      defaultProps: {
        variant: 'body2',
      },
    },
    MuiButton: {
      // Style overrides //
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
