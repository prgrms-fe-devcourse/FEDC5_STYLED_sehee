import { UserType } from './UserType';
import { CommentType } from './CommentType';

export interface NotificationType {
  seen: boolean;
  _id: string;
  author: UserType;
  user: UserType | string;
  post: string | null; // 포스트 id
  follow?: string; // 사용자 id
  comment?: CommentType;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
}
