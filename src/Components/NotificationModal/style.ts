import styled from 'styled-components';

const StyledWrapper = styled.article`
  width: 45rem;
  height: calc(80vh - 9.4rem);
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.size.small};
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 5rem;
  top: 9.5rem;
  z-index: 9;
`;

export default StyledWrapper;
