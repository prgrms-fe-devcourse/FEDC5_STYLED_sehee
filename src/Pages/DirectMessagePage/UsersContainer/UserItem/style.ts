import { styled } from 'styled-components';

export const StyledWrapper = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.size.large};
  gap: ${({ theme }) => theme.size.large};
  &:hover {
    background-color: ${({ theme }) => theme.colors.focusHover};
  }
`;

export const StyledItemWrapper = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.extraSmall};
`;

export const StyledUserName = styled.div`
  font-size: ${({ theme }) => theme.size.medium};
`;

export const StyledBody = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
