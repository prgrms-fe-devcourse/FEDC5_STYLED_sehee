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
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;

export const StyledAuthorInfo = styled.div`
  display: flex;
  padding: 1rem;
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 50%;
  padding: 2rem;

  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  overflow-y: auto;
  flex-grow: 1;
`;

export const StyledPostMainTopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.black};

  .post-detail-user-card {
    > :first-child {
      flex-shrink: 0;
    }
  }
`;

export const StyledEditTime = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.size.small};
`;

export const StyledPostContent = styled.div`
  font-size: ${({ theme }) => theme.size.medium};
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledCommentHistory = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.size.medium};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledComment = styled.div`
  display: flex;
  height: fit-content;
  align-items: flex-start;
  justify-content: space-between;

  .post-detail-user-card {
    > :first-child {
      flex-shrink: 0;
    }
  }
`;

export const StyledTextContainer = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  margin-top: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  justify-content: space-between;
  text-overflow: ellipsis;
  white-space: normal;

  &:hover .material-icons {
    color: ${({ theme }) => theme.colors.alert};
  }

  .material-icons {
    font-size: ${({ theme }) => theme.size.medium};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const StyledText = styled.div`
  width: 90%;
  word-wrap: break-word;

  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    overflow: visible;
    display: block;
  } */
`;

export const StyledLikeCommentChat = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 1rem;
  max-height: 30%;

  padding: 1rem 1rem;
  padding-bottom: 3rem;

  .post-detail-user-card {
    padding-right: 0;
  }

  .like-extra-text {
    padding-left: 0.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export const StyledButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  height: 3rem;
  gap: 1.5rem;
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
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export const StyledLikeContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.size.medium};

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
