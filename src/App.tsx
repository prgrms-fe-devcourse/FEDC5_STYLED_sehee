import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import logo from '@/Assets/Images/STYLED-logo-black.png';
import ImageCard from './Components/Common/ImageCard';

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
        <ImageCard
          src={logo}
          alt="img"
          comment={20}
          heart={20}
        />
        <RouteManager />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
