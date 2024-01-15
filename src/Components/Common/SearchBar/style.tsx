import styled from 'styled-components';

export const StyledContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
`;

export const StyledInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primayDark};
  transition: border-bottom 0.3s ease;
  padding: 1rem 0rem;
  width: 15rem;

  &:focus {
    outline: none;
    border-bottom: 3px solid ${({ theme }) => theme.colors.backgroundReverse};
  }

  margin-bottom: 1rem;
`;

// export default StyledContainer;
