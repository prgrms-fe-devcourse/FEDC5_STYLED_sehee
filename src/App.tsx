import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import { getOnlineUsers, getUser, getUsers } from './Services/User';
import { login, logout, signUp } from './Services/Auth';
import { updateMyName } from './Services/Setting';

const adminEmail = 'admin@programmers.co.kr';
const adminPassword = 'programmers';

const email = 'test1';
const password = 'test1';

const App = () => {
  const test = async () => {
    // login({ email: adminEmail, password: adminPassword });
    // logout();
    // signUp({ email: 'test1', fullName: 'testfullname', password: 'test1' });
    // console.log(getUser('658fd0a3be49cd1fd616154d'));
    // console.log(getUser('64edba4d7c54f2128e46cce5'));

    const data = await getUsers();

    console.log(data);
  };

  const test2 = async () => {
    await login({ email, password });
    await updateMyName({ fullName: 'updateTest1', username: 'updateTest1' });
    await getUsers();
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <RouteManager />
      <button
        type="button"
        onClick={() => test()}
      >
        login 테스트 버튼
      </button>
      <button
        type="button"
        onClick={() => test2()}
      >
        login한 유저 불러오는 테스트 버튼
      </button>
    </ThemeProvider>
  );
};

export default App;
