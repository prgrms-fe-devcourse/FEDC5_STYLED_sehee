import styled from 'styled-components';

const StyledHeaderContainer = styled.div`
  height: 9.4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  display: grid;
  grid-template-columns: 1fr 4.3fr;
  position: fixed;
  z-index: 9;
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundGrey};
`;

export default StyledHeaderContainer;
