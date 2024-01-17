import { LikeType } from '@/Types/LikeType';
import { PostType } from '@/Types/PostType';

export interface PostLikeProps {
  posts: PostType[];
  likes: LikeType[];
  isLoading: boolean;
}
