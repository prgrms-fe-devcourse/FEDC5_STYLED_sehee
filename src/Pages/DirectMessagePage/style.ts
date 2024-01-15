import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: calc(100vh - 9.4rem);
  top: 9.4rem;

  overflow: hidden;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

export const StyledDiv = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primaryDark};

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
