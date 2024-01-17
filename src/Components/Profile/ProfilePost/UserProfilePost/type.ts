import { PostType } from '@/Types/PostType';

export interface PostProps {
  posts: PostType[];
  isLoading: boolean;
}
