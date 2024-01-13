import styled from 'styled-components';

export const StyledAddChannelModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  > :not(:last-child) {
    width: 70%;
  }

  .add-channel-checkbox {
    width: fit-content;
  }

  .add-channel-dropdown {
    width: 70%;
    height: 2.5rem;

    button {
      height: 100%;
    }
  }
`;

export const StlyedDropDownContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;

  > :nth-child(2) {
    width: 100%;
  }
`;

export const StyledDropdownLabel = styled.label`
  font-size: ${({ theme }) => theme.size.medium};
`;
