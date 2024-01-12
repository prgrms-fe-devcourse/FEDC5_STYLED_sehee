import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;
export const StyledMain = styled.main`
  width: 60%;
  height: 100%;
  border-right: 0.1rem solid lightgray;
`;
export const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  background-color: white;
`;
export const StyledHeader = styled.div`
  width: 100%;
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  font-size: large;
  cursor: default;
  user-select: none;
`;
