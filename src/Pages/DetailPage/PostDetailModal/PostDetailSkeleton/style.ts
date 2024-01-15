import styled from 'styled-components';

export const StyledUserCard = styled.div`
  padding: 1rem;
  width: 40%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
  background-color: ${({ theme }) => theme.colors.background};

  > :last-child {
    display: flex;
    width: 100%;
  }
`;

export const StyledCommentUserCard = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
  background-color: ${({ theme }) => theme.colors.background};

  > :nth-child(2) {
    display: flex;
    width: 20%;
  }

  > :last-child {
    display: flex;
    width: 40%;
  }
`;

export const StyledAuthorInfo = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const StyledPostMainInfo = styled.div`
  height: 50%;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  overflow-y: auto;
  flex-grow: 1;
`;

export const StyledPostMainTopContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  > :last-child {
    width: 50%;
    display: flex;
    margin-left: 5rem;
  }
`;

export const StyledCommentHistory = styled.div`
  padding: 1rem 0;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  height: 3rem;
  gap: 1rem;
  padding: 0.5rem 1rem;
`;

export const StyledLikeContainer = styled.div`
  display: flex;
  align-items: center;

  > :first-child {
    width: 60%;
  }
`;
