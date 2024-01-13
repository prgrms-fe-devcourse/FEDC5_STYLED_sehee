import { NotificationType } from '@/Types/NotificationType';

const filterNotificationLength = (notifications: NotificationType[]) => {
  return notifications?.reduce(
    (acc, notification) => {
      const { post, follow, comment, message, seen } = notification;

      if (seen) {
        return acc;
      }

      if (post) {
        acc.postLength += 1;
      }
      if (follow) {
        acc.followLength += 1;
      }
      if (comment) {
        acc.commentLength += 1;
      }
      if (message) {
        acc.messageLength += 1;
      }

      return acc;
    },
    {
      postLength: 0,
      followLength: 0,
      commentLength: 0,
      messageLength: 0,
    },
  );
};

export default filterNotificationLength;
