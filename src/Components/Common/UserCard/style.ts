import styled from 'styled-components';
import {
  StyledUserDetailProps,
  StyledUserNameProps,
  StyledWrapperProps,
} from './type';

export const StyledWrapper = styled.div<StyledWrapperProps>`
  padding: 1rem;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
  background-color: ${({ theme }) => theme.colors.background};
  color: black;

  .user-avatar {
    position: relative;
  }

  &:hover {
    background-color: ${({ $mode }) =>
      $mode === 'chat' && (({ theme }) => theme.colors.text)};
    color: ${({ $mode }) =>
      $mode === 'chat' && (({ theme }) => theme.colors.textReverse)};
  }

  cursor: ${({ $mode }) => $mode === 'header' && 'pointer'};
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

export const StyledUserDetail = styled.div<StyledUserDetailProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
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
