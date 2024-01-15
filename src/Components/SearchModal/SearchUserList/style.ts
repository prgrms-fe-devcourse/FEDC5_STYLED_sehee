import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledContainer = styled.div`
  padding: 2rem;
  font-size: ${({ theme }) => theme.size.medium};
  border-bottom: 1px ${({ theme }) => theme.colors.backgroundGrey} solid;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGray};

    p {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  &:last-child {
    border: none;
  }

  cursor: pointer;

  p {
    font-size: ${({ theme }) => theme.size.medium};
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const StyledNoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.backgroundGrey};
  font-size: ${({ theme }) => theme.size.doubleLarge};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  user-select: none;
`;
