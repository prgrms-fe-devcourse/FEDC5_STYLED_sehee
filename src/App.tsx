import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import DropDown from './Components/Common/DropDown';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

const App = () => {
  const handleSelect = (option: string) => {
    console.log(option);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouteManager />

        {/* 테스트코드 */}
        <DropDown
          options={['전체', '클래식', '스트릿']}
          onSelect={handleSelect}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
