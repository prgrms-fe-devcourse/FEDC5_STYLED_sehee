import { NotificationType } from '@/Types/NotificationType';

export interface Props {
  list: (NotificationType & {
    text: string;
    date: string;
    type: string;
    typeId: string;
  })[];
  onClose: () => void;
}
