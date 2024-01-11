import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: calc(100vh - 9.4rem);
  top: 9.4rem;
  background-color: white;
  overflow: hidden;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

export const StyledDiv = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
