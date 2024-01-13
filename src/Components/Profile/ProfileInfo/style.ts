import { styled } from 'styled-components';
import Avatar from '@/Components/Base/Avatar';

export const StyledProfileInfoContainer = styled.div`
  display: flex;
  justify-content: left;
  text-align: center;
  padding: 5rem 13rem 4rem 26%;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  margin-top: 4rem;
`;

export const StyledName = styled.div`
  font-size: 2.7rem;
  padding: 0 6rem 0 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StyledAvatar = styled(Avatar)`
  &:hover ~ .changeImage {
    visibility: visible;
  }
`;

export const StyledHover = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.colors.focusHover};
  visibility: hidden;

  &:hover {
    visibility: visible;
  }
`;
