import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: 1;
  margin-bottom: 4rem;

  /* TODO: 반응형 추후 보완 */
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    gap: 6px;

    > * {
      width: 100%;
    }
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: 1;
  gap: 12px;

  font-size: ${({ theme }) => theme.size.large};
`;
