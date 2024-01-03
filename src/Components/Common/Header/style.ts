import styled from 'styled-components';

const StyledHeaderContainer = styled.div`
  height: 9.4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  display: grid;
  grid-template-columns: 1fr 3fr 1.3fr;
  position: sticky;
`;

export default StyledHeaderContainer;
