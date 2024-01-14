import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  height: 9.4rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  padding: 0rem 3rem;
  height: calc(100vh - 9.4rem);
  background-color: ${({ theme }) => theme.colors.primaryNormal};
  color: ${({ theme }) => theme.colors.text};
  gap: 2rem;
`;

export const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 100%;
  flex-basis: 20rem;
  flex-shrink: 1;
  align-items: center;
  gap: 1rem;

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

export const StyledCategoryTitleContainer = styled.div`
  width: 95%;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

export const StyledCategoryList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;

  .category-button {
    flex-shrink: 0;
  }
`;

export const StyledCategoryTitle = styled.div`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  user-select: none;
`;

export const StyledMainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: calc(100% - 50rem);
  height: 100%;
  flex-grow: 1;
`;

export const StyledPostCardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const StyledObserver = styled.div`
  width: 100%;
  flex-basis: 1rem;
  flex-shrink: 0;
`;

export const StyledNoPost = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
  font-size: ${({ theme }) => theme.size.large};
`;

export const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  border-left: 0.1rem solid #ddd;
  flex-basis: 30rem;
  align-items: center;
  gap: 1rem;

  .user-search {
    position: static;
    display: flex;
    gap: 1rem;
    top: 0;
  }

  form > button {
    height: 100%;
  }
`;

export const StyledUserList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// UserCard 컴포넌트
export const StyledUserCardWrapper = styled.div`
  padding: 0.5rem 0.5rem;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.extraSmall};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  cursor: pointer;

  .user-avatar {
    position: relative;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.focusHover};
  }
`;

export const StyledUserInfoContainer = styled.div`
  width: 50%;
  flex-grow: 1;
`;

export const StyledUserName = styled.h1`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
