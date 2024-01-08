import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import { checkAuth, login, signUp } from './Services/Auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

const App = () => {
  const handleLogin = async () => {
    const data = await login({ email: 'test1', password: 'test1' });
    console.log(data);
  };

  const handleSignUp = async () => {
    await signUp({ email: 'test6', password: 'test6', fullName: '테스트5' });
  };

  const check = async () => {
    const data = await checkAuth();
    console.log(data);
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <button
          type="button"
          onClick={handleLogin}
        >
          버튼
        </button>
        <button
          type="button"
          onClick={handleSignUp}
        >
          버튼2
        </button>
        <RouteManager />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
