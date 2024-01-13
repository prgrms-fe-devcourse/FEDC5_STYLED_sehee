import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;

  justify-content: start;
  align-items: center;
`;

export const StyledHeader = styled.header`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;

  cursor: default;
`;

export const StyledHeaderTitle = styled.h1`
  user-select: none;
  font-size: large;
`;

export const StyledHeaderTab = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
