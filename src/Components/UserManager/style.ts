import styled from 'styled-components';

const StyledWrapper = styled.section`
  width: 30rem;
  height: 100%;
  padding: 0 0.1rem 0 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
`;

export default StyledWrapper;
