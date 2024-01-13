import { NotificationType } from '@/Types/NotificationType';
import calculateDays from '@/Utils/calculateDays';
import { NotificationListType } from './type';

export const filterNotificationsByCategory = (
  notifications: (NotificationType & {
    text: string;
    date: string;
    type: string;
    typeId: string;
  })[],
  selectedCategory: string,
) => {
  return notifications.filter(({ comment, follow, post }) => {
    switch (selectedCategory) {
      case '댓글':
        return !!comment;
      case '팔로우':
        return !!follow;
      case '좋아요':
        return !!post;
      default:
        return false;
    }
  });
};

export const filterNotificationList = (notifications: NotificationType[]) => {
  return notifications.reduce<NotificationListType>(
    (acc, notification) => {
      const { createdAt, comment, follow, post, author, message, seen } =
        notification;

      const result = {
        ...notification,
        text: '',
        date: String(calculateDays(createdAt)),
        type: '',
        typeId: '',
      };

      if (message) {
        if (!seen) {
          acc.messageList.push(message);
        }
        return acc;
      }

      if (comment) {
        result.text = `${author.fullName}님이 게시글에 댓글을 추가했습니다: ${comment.comment}`;
        result.type = 'comment';
        result.typeId = comment.post;
      }
      if (follow) {
        result.text = `${author.fullName}님이 팔로우를 보냈습니다.`;
        result.type = 'follow';
        result.typeId = follow;
      }
      if (post) {
        result.text = `${author.fullName}님이 게시글 좋아요를 눌렀습니다.`;
        result.type = 'post';
        result.typeId = post;
      }

      acc.notificationList.push(result);
      return acc;
    },
    {
      notificationList: [],
      messageList: [],
    },
  );
};
