import { NotificationType } from '@/Types/NotificationType';

const filterNotificationLength = (notifications: NotificationType[]) => {
  return notifications?.reduce((acc, notification) => {
    const { post, follow, comment, message, seen } = notification;

    if (seen) {
      return acc;
    }

    return post || follow || comment || message ? acc + 1 : acc;
  }, 0);
};

export default filterNotificationLength;
