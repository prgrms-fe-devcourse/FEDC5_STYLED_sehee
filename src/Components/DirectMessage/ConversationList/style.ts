import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  width: 25%;
  min-width: 25rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    height: 100%;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  height: 7rem;
  padding: 2rem;

  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  justify-content: space-around;
  align-items: center;
  font-size: ${({ theme }) => theme.size.medium};

  .create-message-icon:hover {
    scale: 1.1;
    background: linear-gradient(to right top, royalblue, pink);
    color: transparent;
    -webkit-background-clip: text;
  }
`;

export const StyledBody = styled.div`
  height: calc(100% - 7rem);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
