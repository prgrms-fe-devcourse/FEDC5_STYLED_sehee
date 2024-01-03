import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import Avatar from './Components/Base/Avatar';
import Badge from './Components/Base/Badge';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <RouteManager />
      <Avatar>
        <Badge>144</Badge>
      </Avatar>
    </ThemeProvider>
  );
};

export default App;
