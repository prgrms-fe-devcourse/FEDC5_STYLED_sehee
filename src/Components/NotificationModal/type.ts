import { NotificationType } from '@/Types/NotificationType';

export interface Props {
  onClose: () => void;
}

export interface NotificationListType extends NotificationType {
  text: string;
  date: string;
  type: string;
  typeId: string;
}

export type CategoryType = '전체' | '메세지' | '댓글' | '팔로우' | '좋아요';
