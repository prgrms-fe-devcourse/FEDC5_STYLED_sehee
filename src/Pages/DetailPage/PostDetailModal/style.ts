import styled from 'styled-components';

export const StyledImageCardContainer = styled.div`
  width: 40%;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const StyledIcon = styled.img``;

export const StyledPostContentContainer = styled.div`
  width: 60%;
  border-radius: 0.5rem 0.5rem 0 0;
`;

export const StyledAuthorInfo = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  .post-detail-user-card {
    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }

    & > :nth-child(2) {
      width: auto;
      flex-grow: 0;
      padding-right: 1rem;
    }
  }
`;

export const StyledPostMainInfo = styled.div``;

export const StyledLikeCommentChat = styled.div``;
