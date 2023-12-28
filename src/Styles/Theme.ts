import { DefaultTheme } from 'styled-components';

const commonTheme = {
  online: '#05FF00', // 접속 중 색상
  read: '#0095F6', // 읽음 처리 색상
  alert: '#FF0000', // 알림 색상
  border: '#CCCCCC', // 보더 색상
  backgroundGrey: '#D1CCC7', // 회색 배경 색상
  backgroundWhite: '#FFFFFF', // 배경 흰색 색상
  focusHover: '#F2F2F2', // 포커스 및 호버 색상
  overlay: 'rgba(0, 0, 0, 0.4)', // 오버레이 색상
  buttonClickHover: 'rgba(0, 0, 0, 0.3)', // 버튼 클릭 시 호버 색상
  follow: 'rgba(119, 82, 254, 1)', // 팔로우 색상
};

const size = {
  extraSmall: '0.5rem',
  small: '1rem',
  medium: '1.5rem',
  large: '2rem',
  extraLarge: '2.5rem',
  doubleLarge: '3rem',
  full: '100%',
  half: '50%',
  none: '0%',
};

const device = {
  mobile: `(max-width: 480px)`,
  tablet: `(max-width: 768px)`,
  laptop: `(max-width: 1024px)`,
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#000000', // 메인 색상
    text: '#000000', // 글자 색상
    buttonText: '#FFFFFF', // 버튼 텍스트 색상
    buttonBackground: '#000000', // 버튼 배경 색상
    ...commonTheme,
  },
  size,
  device,
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#FFFFFF', // 메인 색상
    text: '#FFFFFF', // 글자 색상
    buttonText: '#000000', // 버튼 텍스트 색상
    buttonBackground: '#FFFFFF', // 버튼 배경 색상
    ...commonTheme,
  },
  size,
  device,
};

export type ThemeTypes = typeof lightTheme;
