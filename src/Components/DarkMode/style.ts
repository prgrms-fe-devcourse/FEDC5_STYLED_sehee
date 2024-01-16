import styled, { css } from 'styled-components';
import { flip } from '@/Styles/Animation';

const Wrapper = styled.div<{ $isDarkMode: boolean; $isAnimation: number }>`
  position: absolute;
  left: 4rem;
  bottom: 4rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;

  transition: transform 0.2s ease-in-out;

  ${({ $isAnimation }) =>
    $isAnimation &&
    css`
      animation: ${flip} 0.3s linear;
    `}

  &:hover {
    transform: scale(1.2);
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

export default Wrapper;
