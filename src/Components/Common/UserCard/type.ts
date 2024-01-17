import { HTMLAttributes } from 'react';

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  borderRadius?: string;
  mode?: 'follow' | 'chat' | 'alarm' | 'normal' | 'radio' | 'header';
  coverImageUrl?: string;
  avatarSize?: number;
  badgeSize?: string;
  isOnline?: boolean;
  isRead?: boolean;
  isFollow?: boolean;
  isButtonShow?: boolean;
  userName?: string;
  userDetail?: string | null;
  date?: string;
  userNameSize?: string;
  userNameWeight?: string;
  userDetailSize?: string;
  inputValue?: string;
  inputChecked?: boolean;
  inputOnChange?: () => void;
  onClickFollowBtn?: () => void;
  onClickUser?: () => void;
}

export interface StyledWrapperProps {
  $width: string;
  $height: string;
  $borderRadius: string;
  $mode?: 'follow' | 'chat' | 'alarm' | 'normal' | 'radio' | 'header';
}

export interface StyledUserNameProps {
  fontSize: string;
  fontWeight: string;
}

export interface StyledUserDetailProps {
  fontSize?: string;
  fontWeight?: string;
}
