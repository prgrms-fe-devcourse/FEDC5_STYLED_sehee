import styled from 'styled-components';

export const StyledWrapper = styled.section`
  width: 25rem;
  height: 100%;
  padding: 1rem 0.1rem 0 0;
  /* background-color: ${({ theme }) => theme.colors.background}; */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: all 1s ease-in-out;
  /* gap: 1rem; */

  @media ${({ theme }) => theme.device.laptop} {
    display: fixed;
    transform: translateX(150%);
    opacity: 0;
    width: 0;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
export const StyledTitle = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  user-select: none;
`;
