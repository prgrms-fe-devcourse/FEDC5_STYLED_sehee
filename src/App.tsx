import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import Header from './Components/Common/Header';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Header />
      <RouteManager />
    </ThemeProvider>
  );
};

export default App;
