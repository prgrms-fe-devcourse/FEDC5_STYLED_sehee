import { keyframes } from 'styled-components';

export const rotate = keyframes`
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;
