import styled from 'styled-components';

export const StyledWrapper = styled.div<{
  $width: string;
  $height: string;
  $fontSize?: number;
}>`
  // 영역 표시 위해 남겨둠 필요 시 배경색 재설정
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  font-size: ${(props) => props.$fontSize}rem;
`;

export const StyledUploadForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const StyledText = styled.p`
  font-weight: 600;
  user-select: none;
`;

export const StyledButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.buttonText};
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  transition: background-color 50ms ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonClickHover};
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const StyledImage = styled.img`
  object-fit: contain;
  cursor: pointer;
`;

export const IconStyle = {
  cursor: 'pointer',
};
