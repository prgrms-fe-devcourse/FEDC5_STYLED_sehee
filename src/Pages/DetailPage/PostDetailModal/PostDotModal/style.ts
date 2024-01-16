import styled from 'styled-components';

const StyledDotModalBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .dot-modal-btn {
    padding: ${({ theme }) => theme.size.large};
    height: ${({ theme }) => theme.size.large};

    &:first-child {
      border-radius: 0.5rem 0.5rem 0 0;
    }

    &:not(:first-child) {
      border-top: 1px solid ${({ theme }) => theme.colors.modalBorder};
    }
  }
`;

export default StyledDotModalBtnContainer;

// export const dotModalButtonStyle = {
//   padding: '1.5rem',
// };

// export const notFirstDotModalButtonStyle = {
//   padding: '1.5rem',
//   borderTop: '1px solid #CCCCCC',
// };
