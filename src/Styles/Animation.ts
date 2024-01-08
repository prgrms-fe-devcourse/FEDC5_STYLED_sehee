import { keyframes } from 'styled-components';

export const skeletonZoomIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const skeletonLoading = keyframes`
  0% {
    background-position-x: 100%;
  }
  50% {
    background-position-x: -100%;
  }
  100% {
    background-position-x: -100%;
    }
  `;

export const rotate = keyframes`
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;
