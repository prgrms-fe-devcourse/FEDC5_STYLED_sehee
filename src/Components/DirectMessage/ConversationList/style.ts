import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  width: 30%;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    height: 100%;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  height: 7rem;
  padding-right: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: space-around;
  align-items: center;
  font-size: ${({ theme }) => theme.size.medium};

  .create-message-icon:hover {
    scale: 1.1;
    background: linear-gradient(to right top, royalblue, pink);
    color: transparent;
    -webkit-background-clip: text;
  }

  .conversation-list-header {
    flex-grow: 0;
    & > :nth-child(2) {
      h1 {
        display: inline;
      }
    }
  }
`;

export const StyledBody = styled.div`
  height: calc(100% - 7rem);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
