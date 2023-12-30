import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import SearchBar from './Components/Common/SearchBar';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <SearchBar />
      <RouteManager />
    </ThemeProvider>
  );
};

export default App;
