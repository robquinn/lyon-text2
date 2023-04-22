import { ThemeProvider, styled } from '@mui/material/styles';
import React from 'react';
import { Provider } from 'react-redux';

import SendSmsPage from '../pages/SendSms';
import { store } from '../redux/store';
import theme from './Theme';

const GlobalStyles = styled('div')(({ theme: appTheme }) => ({
  '::selection, *::selection': {
    color: appTheme.palette.primary.contrastText,
    backgroundColor: appTheme.palette.primary.main,
  },
}));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles>
            <SendSmsPage />
          </GlobalStyles>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
