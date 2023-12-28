// eslint-disable-next-line import/no-cycle
import { User } from './User';

export interface Comment {
  _id: string;
  comment: string;
  author: User;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface CommentRequest {
  comment: string;
  postId: string;
}
