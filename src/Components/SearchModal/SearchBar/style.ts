import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.2rem;
`;

export const StyledInput = styled.input`
  width: 32rem;
  border: none;
  border-bottom: 0.2rem ${({ theme }) => theme.colors.border} solid;
  transition: border 0.3s ease;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-bottom: 0.3rem ${({ theme }) => theme.colors.text} solid;
  }
`;
