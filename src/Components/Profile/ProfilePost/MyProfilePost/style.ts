import styled from 'styled-components';

const StyledHeadContainer = styled.div`
  justify-content: center;
  display: flex;
  height: 6rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  width: 75%;
  margin-left: 12.5%;
`;
export default StyledHeadContainer;
