import { HTMLAttributes } from 'react';

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  coverImageUrl?: string;
  avatarSize?: number;
  badgeSize?: string;
  isOnline?: boolean;
  isRead?: boolean;
  userName?: string;
  userDetail?: string | null;
  userNameSize?: string;
  userNameWeight?: string;
  userDetailSize?: string;
}

export interface StyledWrapperProps {
  $width: string;
  $height: string;
}

export interface StyledUserNameProps {
  fontSize: string;
  fontWeight: string;
}

export interface StyledUserDetailProps {
  fontSize: string;
}
