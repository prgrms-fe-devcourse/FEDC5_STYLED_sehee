import styled from 'styled-components';
import {
  StyledUserDetailProps,
  StyledUserNameProps,
  StyledWrapperProps,
} from './type';

export const StyledWrapper = styled.div<StyledWrapperProps>`
  padding: 0.5rem 0.5rem;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.extraSmall};
  background-color: ${({ theme }) => theme.colors.background};

  .user-avatar {
    position: relative;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.focusHover};
  }
`;

export const StyledUserInfoContainer = styled.div`
  width: 50%;
  flex-grow: 1;
`;

export const StyledUserName = styled.h1<StyledUserNameProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledUserDetail = styled.p<StyledUserDetailProps>`
  font-size: ${({ fontSize }) => fontSize};
  color: #9f9f9f;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledUserFollowContainer = styled.div`
  display: flex;

  .follow-button {
    padding: 1rem;
  }
`;

export const StyledUserReadContainer = styled.div<{ $badgeSize: string }>`
  width: 10%;
  position: relative;
  display: flex;
  margin-left: 1.3rem;
  margin-bottom: ${({ $badgeSize }) => $badgeSize};
`;
