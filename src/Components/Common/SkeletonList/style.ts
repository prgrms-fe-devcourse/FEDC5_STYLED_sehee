import styled from 'styled-components';

export const StyledSkeletonWrapper = styled.ul`
  padding: ${({ theme }) => theme.size.medium} 0;
  overscroll-behavior: contain;
  overflow: hidden;
`;

export const StyledSkeletonContainer = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
  padding: ${({ theme }) => theme.size.medium};
  overflow: auto;
`;
