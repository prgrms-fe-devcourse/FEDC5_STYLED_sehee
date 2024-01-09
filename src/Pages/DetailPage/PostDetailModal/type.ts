import { CommentType } from '@/Types/CommentType';
import { LikeType } from '@/Types/LikeType';

export interface PostDetailModalProps {
  postLike?: LikeType[];
  postComment?: CommentType[];
  postContents: string;
  postImageUrl: string;
  postAuthor: string;
  authorAvatar: string;
  postEditTime: string;
}
