import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  width: 100%;
  height: 9.4rem;
  padding: 2rem 5rem;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.background};

  display: flex;
  position: fixed;
  z-index: 9;
`;

export const StyledDivider = styled.div`
  width: 100%;
  height: 2.7rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 2;
`;
