import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: 1;
  margin-bottom: 4rem;
  gap: 1rem;

  /* TODO: 반응형 추후 보완 */
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    gap: 0.6rem;

    > * {
      width: 100%;
      flex-grow: 1;
    }
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: 1;
  gap: 1.2rem;

  font-size: ${({ theme }) => theme.size.large};
`;
