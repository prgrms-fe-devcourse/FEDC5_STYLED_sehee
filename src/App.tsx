import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import Header from './Components/Common/Header';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <RouteManager />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
