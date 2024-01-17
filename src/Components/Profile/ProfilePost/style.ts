import styled from 'styled-components';

export const StyledProfilePostContainer = styled.div`
  padding: 2rem 0 15rem 0;
  justify-content: center;
  display: flex;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 0 10rem 0;
  }
`;

export const StyledGridPost = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  width: 65%;

  @media ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
`;
