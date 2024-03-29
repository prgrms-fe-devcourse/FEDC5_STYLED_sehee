export interface PostLoginRequestType {
  email: string;
  password: string;
}

export interface PostSignUpRequestType {
  email: string;
  fullName: string;
  password: string;
}

export interface GetUserListRequestType {
  offset?: number;
  limit?: number;
}

export interface PostProfileImageRequestType {
  isCover: false;
  image: File;
}

export interface PutUpdateUserRequestType {
  fullName: string;
  username: string;
}

export interface PutUpdatePasswordRequestType {
  password: string;
}

export interface GetChannelPostRequestType {
  offset?: number;
  limit?: number;
}

export interface PostCreatePostRequestType {
  title: string;
  image: File | null;
  channelId: string;
}

export interface PutUpdatePostRequestType {
  postId: string;
  title: string;
  image: File | null;
  channelId: string;
}

export interface PostCommentRequestType {
  comment: string;
  postId: string;
}

export type NotificationTypeList = 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE';
export interface PostNotificationRequestType {
  notificationType: NotificationTypeList;
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

export interface PostCreateMessageRequestType {
  message: string;
  receiver: string; // 사용자 id
}

export interface PostChannelCreateRequestType {
  authRequired: boolean; // 채널 내용을 로그인한 사람만 볼 수 있는지 여부
  description: string; // 채널 설명
  name: string; // 채널 이름
}
