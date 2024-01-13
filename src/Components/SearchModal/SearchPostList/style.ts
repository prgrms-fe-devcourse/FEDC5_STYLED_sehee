import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const StyledContainer = styled.div``;
export const StyledNoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.backgroundGrey};
  font-size: ${({ theme }) => theme.size.doubleLarge};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
