import { HTMLAttributes } from 'react';
import { UserType } from '@/Types/UserType';

export interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  postId: string;
  authUser: UserType | null | undefined;
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
  onLikeIconClick?: (
    postId: string,
    authorId: string,
    nextLikeState: boolean,
  ) => void;
}
