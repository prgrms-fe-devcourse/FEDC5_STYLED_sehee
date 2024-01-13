import styled from 'styled-components';

export const StyledContainer = styled.div<{
  $width: string;
  $height: string;
  $borderRadius: string;
}>`
  position: relative;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  margin: 1rem;
  box-shadow: 0 0.1rem 0.1rem ${({ theme }) => theme.colors.backgroundGrey};
  border: 1px solid ${({ theme }) => theme.colors.backgroundGrey};
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const StyledInfoContainer = styled.div<{ $borderRadius: string }>`
  width: 100%;
  height: 100%;
  visibility: hidden;
  padding: 0 2rem 0 2rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.colors.focusHover};
  border-radius: ${({ $borderRadius }) => $borderRadius};

  &:hover {
    visibility: visible;
  }
`;

export const StyledImg = styled.img`
  padding: 1rem;
  &:hover ~ .imgInfo {
    visibility: visible;
  }
`;

export const StyledHoverInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledHoverInfoText = styled.div<{ $fontSize: number }>`
  font-size: ${({ $fontSize }) => $fontSize}rem;
  padding: 0.7rem 1.2rem;
`;
