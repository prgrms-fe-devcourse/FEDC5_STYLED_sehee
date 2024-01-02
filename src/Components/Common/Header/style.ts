import styled from 'styled-components';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import logoWhite from '@/Assets/Images/STYLED-logo-white.png';

export const StyledHeaderContainer = styled.div`
  height: 9.4rem;
  width: 100%;
  // background-color: ${({ theme }) => theme.colors.background};
  display: grid;
  grid-template-columns: 1fr 3fr 1.3fr;
  position: fixed;
`;

export const StyledLogoContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const StyledLogo = styled.img`
  content: url(${({ theme }) =>
    theme.colors.background === '#000000' ? logoWhite : logoBlack});
`;

export const StyledNavContainer = styled(StyledLogoContainer)`
  border-left: 1px solid gray;
  border-right: 1px solid gray;
`;

export const StyledUserContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 2rem;
`;
