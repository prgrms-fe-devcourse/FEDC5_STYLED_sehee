import { CommentType } from '@/Types/CommentType';
import { FollowType } from '@/Types/FollowType';
import { UserType } from '@/Types/UserType';

export interface Props {
  onClose: () => void;
}

export interface NotificationListType {
  text: string;
  date: string;
  type: string;
  typeId: string;
  seen: boolean;
  _id: string;
  author: UserType;
  user: string | UserType;
  post: string | null;
  follow?: FollowType | undefined;
  comment?: CommentType | undefined;
  message?: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export type CategoryType = '전체' | '메세지' | '댓글' | '팔로우' | '좋아요';

export interface PostSendNotificationsType {
  messageId: string;
  receiverId: string;
}
