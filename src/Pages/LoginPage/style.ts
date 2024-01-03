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
  height: 60rem;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.size.medium};
  padding: ${({ theme }) => theme.size.large} 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.size.large};

  @media ${({ theme }) => theme.device.tablet} {
    width: ${({ theme }) => theme.size.full};
    border: none;
    justify-content: center;

    > .history-back-button {
      position: absolute !important;
      left: 9rem !important;
      top: 8rem !important;
    }
  }
`;
