import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  height: 9.4rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0rem 5rem;
  height: calc(100vh - 9.4rem);
  color: ${({ theme }) => theme.colors.text};
  gap: 2rem;
  .material-symbols-outlined,
  .material-icons {
    user-select: none;
  }

  @media ${({ theme }) => theme.device.tablet} {
    gap: 0;
  }

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
  }
`;

export const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 100%;
  flex-basis: 20rem;
  flex-shrink: 0;
  min-width: 13rem;
  align-items: center;
  gap: 1rem;
  padding-left: 1rem;
  transition: all 1s ease-in-out;
  background-color: ${({ theme }) => theme.colors.background};

  @media ${({ theme }) => theme.device.tablet} {
    position: fixed;
    width: 0;
    opacity: 0;
    transform: translateX(-150%);
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
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
`;

export const StyledPostCardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0rem 1rem;

  padding-bottom: 3rem;
`;

export const StyledObserver = styled.div`
  width: 100%;
  flex-basis: 1rem;
  flex-shrink: 0;
`;

export const StyledNoPost = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 6rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  user-select: none;
`;

export const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 2.5rem;
  height: 100%;

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
