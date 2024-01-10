import styled from 'styled-components';

const StyledWrapper = styled.article`
  width: 50rem;
  height: calc(100vh - 9.4rem);
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.size.small};
  display: flex;
  flex-direction: column;
`;

export default StyledWrapper;
