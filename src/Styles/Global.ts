import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../Assets/Fonts/Fonts.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

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
    color: #333;
    background-color: #f2f2f2;

    font-size: 1.6rem;
    font-family: "Pretendard-Regular", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;

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
  }

  input, button, textarea, select {
    font-family: inherit;
  }

  ol, ul{
    list-style: none;
  }
`;

export default GlobalStyle;
