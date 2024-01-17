import styled from 'styled-components';

export const StyledWrap = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContainer = styled.div`
  width: 55rem;
  height: 70rem;
  background-color: ${({ theme }) => theme.colors.background};

  padding: ${({ theme }) => theme.size.large} 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.size.large};

  > .history-back-button {
    position: absolute;
    left: 3rem;
    top: 3rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: ${({ theme }) => theme.size.full};
    border: none;
    justify-content: center;
    padding: 0 5rem;

    > .history-back-button {
      position: absolute;
      left: 4rem;
      top: 4rem;
    }
  }
`;
