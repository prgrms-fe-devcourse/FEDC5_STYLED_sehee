import styled from 'styled-components';

const StyledCategoryList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 2rem;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.device.laptop} {
    padding: 0;
  }
`;

export default StyledCategoryList;
