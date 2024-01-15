import { styled } from 'styled-components';

export const StyledContainer = styled.div<{
  $isClickedUserCard: boolean | undefined;
}>`
  width: 75%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  @media ${({ theme }) => theme.device.tablet} {
    display: ${({ $isClickedUserCard }) => ($isClickedUserCard ? '' : 'none')};
    width: 100%;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  height: 7rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  gap: 2rem;
  font-size: ${({ theme }) => theme.size.medium};

  .undo-icon {
    font-size: 3.5rem;

    &:hover {
      scale: 1.1;
      background: linear-gradient(to right top, royalblue, pink);
      color: transparent;
      -webkit-background-clip: text;
    }
  }
`;

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-bottom: 7rem;
  gap: 2rem;
  overflow-y: scroll;
  height: calc(95% - 7rem);
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MessageItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledFooter = styled.div`
  display: flex;
  position: fixed;
  width: 60%;
  right: 5%;
  bottom: 5%;
  gap: 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};

  .send-icon {
    display: flex;
    font-size: 3.5rem;
    height: min-content;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      scale: 1.1;
      background: linear-gradient(to right top, royalblue, pink);
      color: transparent;
      -webkit-background-clip: text;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 90%;
  }
`;
