import { ChannelType } from './ChannelType';
import { CommentType } from './CommentType';
import { LikeType } from './LikeType';
import { UserType } from './UserType';

export interface PostType {
  likes: LikeType[];
  comments: CommentType[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelType;
  author: UserType;
  createdAt: string;
  updatedAt: string;
}
