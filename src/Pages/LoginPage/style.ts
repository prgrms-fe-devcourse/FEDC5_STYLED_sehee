import styled from 'styled-components';

export const StyledWrap = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContainer = styled.div`
  width: 55rem;
  height: 60rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.size.medium};
  padding: 2rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.size.large};
`;
