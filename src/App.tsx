import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme } from '@/Styles/Theme';
import GlobalStyle from '@/Styles/Global';
import RouteManager from '@/Routes/Router';
import SearchBar from './Components/Common/SearchBar';

const ex = [
  {
    name: 'hi',
    id: 1,
  },
  {
    name: 'bye',
    id: 2,
  },
  {
    name: 'k',
    id: 3,
  },
  {
    name: 'h',
    id: 4,
  },
  {
    name: 'i',
    id: 5,
  },
];

const App = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState(ex);
  const onChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };
  const onClick = () => {
    setData(data.filter((item) => item.name === input));
    console.log('data', data);
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <SearchBar
        onChange={onChange}
        onClick={onClick}
      />
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <RouteManager />
    </ThemeProvider>
  );
};

export default App;
