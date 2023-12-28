export interface PostLoginRequest {
  email: string;
  password: string;
}

export interface PostSignUpRequest {
  email: string;
  fullName: string;
  password: string;
}

export interface GetUserListRequest {
  offset?: number;
  limit?: number;
}

export interface PostProfileImageRequest {
  isCover: false;
  image: number;
}

export interface PutUpdateUserRequest {
  fullName: string;
  username: string;
}

export interface PutUpdatePasswordPequest {
  password: string;
}

export interface GetChannelPostRequest {
  offset?: number;
  limit?: number;
}

export interface PostCreatePostRequest {
  title: string;
  image: number | null;
  channelId: string;
}

export interface PostCommentRequest {
  comment: string;
  postId: string;
}

export interface PostNotificationRequest {
  notificationType: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE';
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

export interface PostCreateMessage {
  message: string;
  receiver: string; // 사용자 id
}

export interface PostChannelCreate {
  authRequired: boolean; // 채널 내용을 로그인한 사람만 볼 수 있는지 여부
  description: string; // 채널 설명
  name: string; // 채널 이름
}
