import { NotificationType } from '@/Types/NotificationType';

export type NotificationCategory = 'comment' | 'follow' | 'post';

export interface Props {
  list: (NotificationType & {
    text: string;
    date: string;
    type: string;
    typeId: string;
  })[];
  onClose: () => void;
}
