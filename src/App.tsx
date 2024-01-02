import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import Input from './Components/Base/Input';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <RouteManager />
      <Input
        errorMessage="ㅗㅑ"
        label="네임"
      />
    </ThemeProvider>
  );
};

export default App;
