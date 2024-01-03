import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import Header from './Components/Common/Header';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Header />
        <RouteManager />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
