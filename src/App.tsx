import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import SearchBar from './Components/Common/SearchBar';
import Button from './Components/Base/Button';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <SearchBar />
      <Button>hi</Button>
      <RouteManager />
    </ThemeProvider>
  );
};

export default App;
