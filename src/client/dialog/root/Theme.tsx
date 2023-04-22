import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const rlsir = {
  blue: '#0d223f',
  gold: '#C29B40',
};

const theme = createTheme({
  palette: {
    primary: {
      main: rlsir.blue,
      contrastText: '#ffffff',
    },
    secondary: {
      main: rlsir.gold,
    },
    action: {
      disabledBackground: grey[200],
      disabled: rlsir.blue,
    },
  },
});
export default theme;
