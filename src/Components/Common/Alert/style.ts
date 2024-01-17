import styled from 'styled-components';

export const StyledAlertWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

export const StyledButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const StyledMessage = styled.div<{ $fontSize: number }>`
  font-size: ${(props) => props.$fontSize}rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
`;
