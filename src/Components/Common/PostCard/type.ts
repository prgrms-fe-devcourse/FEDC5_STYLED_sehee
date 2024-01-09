import { HTMLAttributes } from 'react';

export interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  content: string;
  authorName: string;
  authorThumbnail: string;
  isFollower: boolean;
  isLike: boolean;
  width?: string;
  fontSize?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  onImageClick?: () => void;
  onUserNameClick?: () => void;
  onUserAvatarClick?: () => void;
  onFollowBtnClick?: () => void;
  onLikeIconClick?: () => void;
}
