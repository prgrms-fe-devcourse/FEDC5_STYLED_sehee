import { DefaultTheme } from 'styled-components';

const color = {
  primaryNormal: '#F0EFEC',
  primaryDark: '#A5A49E',
  primaryReverse: '#252525',

  red: '#ED4044',
  green: '#80D38D',
  blue: '#53A1F5',

  white: '#ffffff',
  gray: '#D9D9D9',
  black: '#252525',
};

const commonTheme = {
  online: color.green,
  read: color.blue,
  alert: color.red,
  backgroundGrey: color.gray,
  lightGray: color.gray,
  focusHover: color.primaryReverse,
  focusHoverText: color.primaryNormal,
  overlay: 'rgba(0, 0, 0, 0.4)',
  follow: 'rgba(119, 82, 254, 1)',
};

const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
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
    primary: color.primaryNormal,
    background: color.primaryNormal,
    backgroundReverse: color.primaryReverse,
    text: color.primaryReverse,
    textNonSelect: color.primaryDark,
    textReverse: color.primaryNormal,

    buttonText: color.primaryReverse,
    buttonBackground: color.primaryNormal,
    buttonBorder: color.primaryReverse,

    buttonHoverText: color.primaryNormal,
    buttonHoverBackground: color.primaryReverse,

    followBackground: color.primaryNormal,
    followText: color.primaryReverse,
    followingBackground: color.primaryReverse,
    followingText: color.primaryNormal,
    followBorder: color.primaryNormal,

    scrollBarThumb: color.gray,
    scrollBarThumbHover: color.primaryDark,

    border: color.primaryDark,

    ...commonTheme,
    ...color,
  },
  size,
  device,
  fontWeight,
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: color.primaryReverse,
    background: color.primaryReverse,
    backgroundReverse: color.primaryNormal,

    text: color.primaryNormal,
    textNonSelect: color.primaryDark,
    textReverse: color.primaryReverse,

    buttonText: color.primaryNormal,
    buttonBackground: color.primaryReverse,
    buttonBorder: color.primaryNormal,

    buttonHoverText: color.primaryReverse,
    buttonHoverBackground: color.primaryNormal,

    followBackground: color.primaryReverse,
    followText: color.primaryNormal,
    followingBackground: color.primaryNormal,
    followingText: color.primaryReverse,
    followBorder: color.primaryReverse,

    scrollBarThumb: color.primaryDark,
    scrollBarThumbHover: color.gray,

    border: color.primaryNormal,

    ...commonTheme,
    ...color,
  },
  size,
  device,
  fontWeight,
};

export type ThemeTypes = typeof lightTheme;
