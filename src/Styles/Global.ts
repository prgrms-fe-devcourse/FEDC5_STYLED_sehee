import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './fonts/PretendardVariable.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  ::-webkit-scrollbar {
    width: 1rem;
    padding: 0;
    margin: 0;
    border: none;
  }

  ::-webkit-scrollbar-track {
    background: transparent
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollBarThumb};
    border-radius: 4px;
    transition: all 1s;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scrollBarThumbHover};
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};

    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  #app {
    position: relative;

  }

  #root {
    overflow-y: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    background-color: Transparent;
    border: none;
    user-select: none;
  }

  input, button, textarea, select {
    font-family: inherit;
  }

  ol, ul{
    list-style: none;
  }
`;

export default GlobalStyle;
