import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  /* background-color: blue; */
  height: 9.4rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  height: calc(100vh - 9.4rem);
  border-top: 0.1rem solid #ddd;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledLeftContainer = styled.div`
  padding-left: 1rem;
  height: 100%;
  /* background-color: red; */
  flex-basis: 30rem;
  border-right: 0.1rem solid #ddd;
  gap: 1rem;
`;

export const StyledCategoryTitleContainer = styled.div`
  width: 90%;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

export const StyledCategoryTitle = styled.div`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const catergoryButtonStyle = {};

export const StyledMainContentContainer = styled.div`
  height: 100%;
  /* background-color: yellow; */
  flex-grow: 1;
`;

export const StyledRightContainer = styled.div`
  height: 100%;
  /* background-color: green; */
  border-left: 0.1rem solid #ddd;
  flex-basis: 30rem;
`;
