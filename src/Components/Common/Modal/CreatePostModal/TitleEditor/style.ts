import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 2rem 2rem 2rem;
  flex-grow: 1;
`;
export const StyledTextArea = styled.textarea`
  border: none;
  resize: none;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &:focus {
    outline: none;
  }
`;
