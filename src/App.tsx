import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { lightTheme, darkTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './Components/Common/Header';
import { useDarkModeStore } from './Stores';
import DarkMode from './Components/DarkMode';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, refetchOnMount: false },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
});

const App = () => {
  const { isDarkMode } = useDarkModeStore();
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: asyncStoragePersister,
          dehydrateOptions: {
            shouldDehydrateQuery: (query) =>
              query.options.meta?.persist === true,
          },
        }}
      >
        <GlobalStyle />
        <Header
          activeHeader={pathname !== '/login' && pathname !== '/signup'}
        />
        <RouteManager />
        <DarkMode />
        <ReactQueryDevtools initialIsOpen />
      </PersistQueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
