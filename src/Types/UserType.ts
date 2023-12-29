import { LikeType } from './LikeType';
import { MessageType } from './MessageType';
import { PostType } from './PostType';
import { NotificationType } from './NotificationType';

export interface UserType {
  coverImage?: string;
  image?: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: PostType[];
  likes: LikeType[];
  comments: string[];
  followers: [];
  following: FollowingType[];
  notifications: NotificationType[];
  messages: MessageType[];
  _id: string;
  fullName: string;
  email: string;
  createdA: string;
  updatedAt: string;
  jwt?: string;
}

export interface FollowingType {
  _id: string;
  user: string;
  follower: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
