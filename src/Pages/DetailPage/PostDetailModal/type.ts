import { CommentType } from '@/Types/CommentType';
import { FollowType } from '@/Types/FollowType';
import { LikeType } from '@/Types/LikeType';

export interface PostDetailModalProps {
  postLike?: LikeType[];
  postFollow?: FollowType[];
  postComment?: CommentType[];
  postContents: string;
  postImageUrl: string;
  postAuthor: string;
  postAuthorId: string;
  authorAvatar: string;
  postEditTime: string;
}
