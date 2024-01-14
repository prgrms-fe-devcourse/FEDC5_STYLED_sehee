import { HTMLAttributes } from 'react';

export interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  postId: string;
  imageUrl: string;
  content: string;
  authorId: string;
  authorName: string;
  authorThumbnail: string;
  isFollower: boolean | undefined;
  isLike: boolean;
  myLikeId?: string;
  width?: string;
  fontSize?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  onImageClick?: () => void;
  onUserNameClick?: () => void;
  onUserAvatarClick?: () => void;
  onFollowBtnClick?: (nextFollowState: boolean, userId: string) => void;
  onLikeIconClick?: (postId: string, nextLikeState: boolean) => void;
}
