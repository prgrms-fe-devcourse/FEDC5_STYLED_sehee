import { ThemeProvider } from 'styled-components';
import { lightTheme } from './Styles/Theme';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <div>test</div>
    </ThemeProvider>
  );
};

export default App;
