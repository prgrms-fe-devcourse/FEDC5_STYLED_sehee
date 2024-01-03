import styled from 'styled-components';

const StyledHeaderContainer = styled.div`
  height: 9.4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  display: grid;
  grid-template-columns: 1fr 3fr 1.3fr;
  position: fixed;
`;

export const StyledContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export default StyledHeaderContainer;
