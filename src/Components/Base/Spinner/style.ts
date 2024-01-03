import styled, { keyframes } from 'styled-components';
import { StyledBackgroundProp, StyledSpinnerProp } from './type';

const rotate = keyframes`
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

export const StyledBackground = styled.div<StyledBackgroundProp>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 8;

  ${({ $isBackground }) => $isBackground && 'display:block'}
`;

export const StyledSpinner = styled.div<StyledSpinnerProp>`
  display: ${({ $display }) => $display};
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  z-index: 9;

  ${({ $isFixedCenter }) =>
    $isFixedCenter &&
    `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `}

  div {
    position: absolute;
    width: ${({ $size }) => ($size ? $size * 0.075 : 6)}px;
    height: ${({ $size }) => ($size ? $size * 0.075 : 6)}px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
    animation: ${rotate} 1.2s linear infinite;
  }

  div:nth-child(1) {
    animation-delay: 0s;
    top: ${({ $size }) => ($size ? $size * 0.4625 : 37)}px;
    left: ${({ $size }) => ($size ? $size * 0.825 : 66)}px;
  }

  div:nth-child(2) {
    animation-delay: -0.1s;
    top: ${({ $size }) => ($size ? $size * 0.275 : 22)}px;
    left: ${({ $size }) => ($size ? $size * 0.775 : 62)}px;
  }

  div:nth-child(3) {
    animation-delay: -0.2s;
    top: ${({ $size }) => ($size ? $size * 0.1375 : 11)}px;
    left: ${({ $size }) => ($size ? $size * 0.65 : 52)}px;
  }

  div:nth-child(4) {
    animation-delay: -0.3s;
    top: ${({ $size }) => ($size ? $size * 0.0875 : 7)}px;
    left: ${({ $size }) => ($size ? $size * 0.4625 : 37)}px;
  }

  div:nth-child(5) {
    animation-delay: -0.4s;
    top: ${({ $size }) => ($size ? $size * 0.1375 : 11)}px;
    left: ${({ $size }) => ($size ? $size * 0.275 : 22)}px;
  }

  div:nth-child(6) {
    animation-delay: -0.5s;
    top: ${({ $size }) => ($size ? $size * 0.275 : 22)}px;
    left: ${({ $size }) => ($size ? $size * 0.1375 : 11)}px;
  }

  div:nth-child(7) {
    animation-delay: -0.6s;
    top: ${({ $size }) => ($size ? $size * 0.4625 : 37)}px;
    left: ${({ $size }) => ($size ? $size * 0.0875 : 7)}px;
  }

  div:nth-child(8) {
    animation-delay: -0.7s;
    top: ${({ $size }) => ($size ? $size * 0.65 : 52)}px;
    left: ${({ $size }) => ($size ? $size * 0.1375 : 11)}px;
  }

  div:nth-child(9) {
    animation-delay: -0.8s;
    top: ${({ $size }) => ($size ? $size * 0.775 : 62)}px;
    left: ${({ $size }) => ($size ? $size * 0.275 : 22)}px;
  }

  div:nth-child(10) {
    animation-delay: -0.9s;
    top: ${({ $size }) => ($size ? $size * 0.825 : 66)}px;
    left: ${({ $size }) => ($size ? $size * 0.4625 : 37)}px;
  }

  div:nth-child(11) {
    animation-delay: -1s;
    top: ${({ $size }) => ($size ? $size * 0.775 : 62)}px;
    left: ${({ $size }) => ($size ? $size * 0.65 : 52)}px;
  }

  div:nth-child(12) {
    animation-delay: -1.1s;
    top: ${({ $size }) => ($size ? $size * 0.65 : 52)}px;
    left: ${({ $size }) => ($size ? $size * 0.775 : 62)}px;
  }
`;
