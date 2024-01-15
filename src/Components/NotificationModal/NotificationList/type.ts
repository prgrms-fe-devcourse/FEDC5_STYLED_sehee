import { NotificationListType } from '../type';

export interface Props {
  list: NotificationListType[];
  onClose: () => void;
}
