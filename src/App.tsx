import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import Button from './Components/Base/Button';

const App = () => {
  const handleClick = (isActive: boolean) => {
    console.log(isActive);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <RouteManager />
      <Button
        width="12rem"
        isToggleButton
        style={{ padding: '10px 20px' }}
        onClick={handleClick}
      >
        버튼
      </Button>
    </ThemeProvider>
  );
};

export default App;
