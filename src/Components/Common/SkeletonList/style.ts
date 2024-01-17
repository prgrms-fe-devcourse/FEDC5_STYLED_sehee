import styled from 'styled-components';

export const StyledSkeletonWrapper = styled.ul`
  padding: ${({ theme }) => theme.size.small} 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledSkeletonContainer = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
  padding: ${({ theme }) => theme.size.medium};
`;
