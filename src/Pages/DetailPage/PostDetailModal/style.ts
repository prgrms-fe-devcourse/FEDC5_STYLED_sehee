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
  display: flex;
  flex-direction: column;
  width: 60%;

  .post-detail-user-card {
    h1 {
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.colors.backgroundGrey};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;

export const StyledAuthorInfo = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  .post-detail-user-card {
    & > :nth-child(2) {
      width: auto;
      flex-grow: 0;
      padding-right: 1rem;
    }
  }
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
  align-items: center;

  .post-detail-user-card {
    > :first-child {
      flex-shrink: 0;
    }
  }
`;

export const StyledEditTime = styled.div``;

export const StyledPostContent = styled.div`
  padding-left: 4rem;
  padding-right: 1rem;
`;

export const StyledCommentHistory = styled.div`
  padding: 1rem 0;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  flex-direction: column;
`;

export const StyledComment = styled.div`
  display: flex;

  .post-detail-user-card {
    > :first-child {
      flex-shrink: 0;
    }
  }
`;

export const StyledText = styled.div`
  padding: 0.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const StyledLikeCommentChat = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 30%;

  padding: 0.5rem 1rem;

  .post-detail-user-card {
    padding-right: 0;
  }

  .like-extra-text {
    padding-left: 0.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.backgroundGrey};
    }
  }
`;

export const StyledButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  height: 3rem;
  gap: 1rem;
  padding: 0.5rem 1rem;

  .post-detail-modal-heart-btn {
    &.material-icons {
      color: ${({ theme }) => theme.colors.alert};
    }

    &.material-symbols-outlined:hover {
      color: ${({ theme }) => theme.colors.alert};
    }
  }

  .post-detail-modal-btn {
    &:hover {
      color: ${({ theme }) => theme.colors.backgroundGrey};
    }
  }
`;

export const StledLikeContainer = styled.div`
  display: flex;
  align-items: center;

  .post-detail-user-card {
    padding-right: 0;

    > :first-child {
      flex-shrink: 0;
    }
  }

  .like-extra-text {
    padding-left: 0.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.backgroundGrey};
    }
  }
`;

export const StyledLikeText = styled.div``;

export const StyledCommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  & > :first-child {
    width: 80%;
  }

  .post-detail-comment-input {
    border: 0;
    outline: 0;
  }
`;

export const postCommentBtnStyle = {
  padding: '1rem 1.5rem',
};
