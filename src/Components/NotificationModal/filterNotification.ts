import { NotificationType } from '@/Types/NotificationType';
import calculateDays from '@/Utils/calculateDays';

const filterNotificationsByCategory = (
  notifications: NotificationType[],
  selectedCategory: string,
) => {
  if (!notifications) return [];

  return notifications.filter(({ comment, follow, post, message }) => {
    switch (selectedCategory) {
      case '댓글':
        return !!comment;
      case '팔로우':
        return !!follow;
      case '좋아요':
        return !!post;
      default:
        return !message; // 전체인 경우 message가 없는 알림만 반환
    }
  });
};

const addNotificationsData = (notifications: NotificationType[]) => {
  return notifications.map((notification) => {
    const { createdAt, comment, follow, post, author } = notification;

    const result = {
      ...notification,
      text: '',
      date: '',
      type: '',
      typeId: '',
    };

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

    result.date = String(calculateDays(createdAt));

    return result;
  });
};

const filterNotification = (
  notifications: NotificationType[],
  selectedCategory: string,
) => {
  const filterList = filterNotificationsByCategory(
    notifications,
    selectedCategory,
  );
  const result = addNotificationsData(filterList);

  return result;
};

export default filterNotification;
