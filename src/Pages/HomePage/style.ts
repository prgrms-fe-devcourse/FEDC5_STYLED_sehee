import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  height: 9.4rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  height: calc(100vh - 9.4rem);
  border-top: 0.1rem solid #ddd;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: 30rem;
  align-items: center;
  border-right: 0.1rem solid #ddd;
  gap: 1rem;
`;

export const StyledCategoryTitleContainer = styled.div`
  padding: 0 1rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

export const StyledCategoryList = styled.div`
  padding: 0 1rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledCategoryTitle = styled.div`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  user-select: none;
`;

export const StyledMainContentContainer = styled.div`
  height: 100%;
  flex-grow: 1;
`;

export const StyledRightContainer = styled.div`
  display: flex;
  padding: 1rem;
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
