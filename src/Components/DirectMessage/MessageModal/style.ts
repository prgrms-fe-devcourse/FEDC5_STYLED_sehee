import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 1.5rem;
`;

export const StyledHeader = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.size.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
`;

export const StyledBody = styled.div`
  width: 75%;
  height: 65%;
  overflow: scroll;
  margin-top: 1rem;
`;

export const StyledUserContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.focusHover};
    border-radius: 1rem;
  }
`;

export const StyledUserItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.focusHover};
    // border-radius: 1rem;
  }
  padding-right: 1rem;
`;
