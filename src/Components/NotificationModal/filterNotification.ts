import { NotificationType } from '@/Types/NotificationType';
import calculateDays from '@/Utils/calculateTime';
import { NotificationListType } from './type';

export const filterNotificationsByCategory = (
  notifications: NotificationListType[],
  selectedCategory: string,
) => {
  return notifications.filter(({ comment, follow, post, message }) => {
    switch (selectedCategory) {
      case '댓글':
        return !!comment;
      case '팔로우':
        return !!follow;
      case '좋아요':
        return !!post;
      case '메세지':
        return !!message;
      default:
        return true;
    }
  });
};

export const filterNotificationList = (notifications: NotificationType[]) => {
  return notifications.reduce<NotificationListType[]>((acc, notification) => {
    const { createdAt, comment, follow, post, author, message } = notification;

    if (!message && !comment && !follow && !post) {
      return acc;
    }

    const result = {
      ...notification,
      text: '',
      date: String(calculateDays(createdAt)),
      type: '',
      typeId: '',
    };

    if (message) {
      result.text = `${author.fullName}님이 메세지를 보냈습니다.`;
      result.type = 'message';
      result.typeId = message;
    } else if (comment) {
      result.text = `${author.fullName}님이 게시글에 댓글을 추가했습니다: ${comment.comment}`;
      result.type = 'comment';
      result.typeId = comment.post;
    } else if (follow) {
      result.text = `${author.fullName}님이 팔로우를 요청했습니다.`;
      result.type = 'follow';
      result.typeId = follow.follower;
    } else if (post) {
      result.text = `${author.fullName}님이 게시글 좋아요를 눌렀습니다.`;
      result.type = 'post';
      result.typeId = post;
    }

    acc.push(result);

    return acc;
  }, []);
};
