import styled from 'styled-components';

export const StyledItem = styled.li<{ $isSeen: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.size.medium};
  font-size: ${({ theme }) => theme.size.medium};
  color: ${({ theme }) => theme.colors.text};
  gap: ${({ theme }) => theme.size.small};
  order: ${({ $isSeen }) => ($isSeen ? 1 : 0)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: pointer;

    div {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

export const StyledContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledDate = styled.span``;

export const StyledIsSeen = styled.div`
  width: ${({ theme }) => theme.size.small};
  height: ${({ theme }) => theme.size.small};
  border-radius: ${({ theme }) => theme.size.half};
  background-color: ${({ theme }) => theme.colors.read};
  flex-shrink: 0;
`;
