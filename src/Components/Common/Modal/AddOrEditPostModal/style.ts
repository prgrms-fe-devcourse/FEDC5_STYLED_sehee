import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;
export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  border-right: 0.1rem solid lightgray;
  overflow-y: auto;
`;
export const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: white;
  overflow-y: auto;
`;
export const StyledMainHeader = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem 0rem;
  display: flex;
  /* flex-grow: 1; */
  justify-content: center;

  cursor: default;
  user-select: none;

  font-size: ${({ theme }) => theme.size.extraLarge};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text};
`;
