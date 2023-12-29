import { UserType } from './UserType';

export interface CommentType {
  _id: string;
  comment: string;
  author: UserType;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}
