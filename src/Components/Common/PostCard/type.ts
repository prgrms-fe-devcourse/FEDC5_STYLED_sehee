import { HTMLAttributes } from 'react';

export interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  postId: string;
  imageUrl: string;
  content: string;
  authorName: string;
  authorThumbnail: string;
  isFollower: boolean;
  isLike: boolean;
  myLikeId?: string;
  width?: string;
  fontSize?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  onImageClick?: () => void;
  onUserNameClick?: () => void;
  onUserAvatarClick?: () => void;
  onFollowBtnClick?: () => void;
  onLikeIconClick?: (postId: string, nextLikeState: boolean) => void;
}
