import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme, darkTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import { useDarkModeStore } from './Stores';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

const App = () => {
  const { isDarkMode } = useDarkModeStore();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouteManager />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
