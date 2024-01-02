import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import Alert from './Components/Common/Alert';

const App = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <RouteManager />
      <button
        type="button"
        onClick={() => setIsShow(true)}
      >
        test버튼
      </button>
      {isShow && (
        <Alert
          onChangeOpen={setIsShow}
          message="정말 삭제하시겠습니까?"
          mode="confirm"
        />
      )}
    </ThemeProvider>
  );
};

export default App;
