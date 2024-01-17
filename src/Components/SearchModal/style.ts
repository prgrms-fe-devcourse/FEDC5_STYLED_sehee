import styled from 'styled-components';
import Button from '../Base/Button';

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  position: relative;

  justify-content: start;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  top: 2rem;
  right: 3rem;
`;

export const StyledHeader = styled.header`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;

  cursor: default;

  @media ${({ theme }) => theme.device.tablet} {
    padding: 2rem;
  }
`;

export const StyledHeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.size.extraLarge};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
`;

export const StyledHeaderTab = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export const StyledBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
