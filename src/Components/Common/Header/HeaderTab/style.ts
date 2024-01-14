import { styled } from 'styled-components';

export const StyledUserContainer = styled.div`
  align-items: center;
  justify-content: right;
  display: flex;
  gap: 0.2rem;
`;

export const StyledButtonContainer = styled.div`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;

  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};

    & > :first-child {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
    }
  }
`;

export const StyledFocusedCircle = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 3.7rem;
  width: 1rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primaryReverse};
  border-radius: 3rem;

  transition:
    opacity 0.5s,
    visibility 0.5s ease;

  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;
