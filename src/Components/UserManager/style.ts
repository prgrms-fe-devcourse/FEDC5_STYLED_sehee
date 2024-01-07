import styled from 'styled-components';

const StyledWrapper = styled.section`
  width: 30rem;
  height: 100vh;
  background-color: pink;
  padding: ${({ theme }) => theme.size.small};
  border-left: 1px solid #ddd;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
`;

export default StyledWrapper;
