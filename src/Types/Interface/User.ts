/* eslint-disable import/no-cycle */
import { Like } from './Like';
import { Message } from './Message';
import { Post } from './Post';
import { Notification } from './Notification';

export interface User {
  coverImage: string;
  image: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: Post[];
  likes: Like[];
  comments: string[];
  followers: [];
  following: Following[];
  notifications: Notification[];
  messages: Message[];
  _id: string;
  fullName: string;
  email: string;
  createdA: string;
  updatedAt: string;
  jwt?: string;
}

export interface Following {
  _id: string;
  user: string;
  follower: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface UserListRequest {
  offset?: number;
  limit?: number;
}

export interface UserListResponse {
  user: User[];
}

export interface ProfileImageRequest {
  isCover: false;
  image: BinaryData;
}

export interface UpdateUserRequest {
  fullName: string;
  username: string;
}

export interface PasswordPequest {
  password: string;
}
