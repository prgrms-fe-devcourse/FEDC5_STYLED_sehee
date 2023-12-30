import axiosInstance from '@/Api/axiosInstance';
import { DOMAIN } from '@/Constants/Api';
import { NotificationType } from '@/Types/NotificationType';
import { PostNotificationRequestType } from '@/Types/Request';

/**
 * @brief 나의 알림 목록을 불러옵니다.
 * @return 실패할 경우, 빈 배열을 반환합니다.
 */
export const getNotifications = async () => {
  try {
    const res = await axiosInstance.get<NotificationType[]>(
      DOMAIN.NOTIFICATIONS,
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

/**
 * @brief 나에게 온 알림을 읽음처리 합니다.
 * @return 리턴값은 별도로 존재하지 않습니다.
 */
export const readNotifications = async () => {
  try {
    await axiosInstance.put(DOMAIN.READ_NOTIFICATION);
  } catch (e) {
    console.error(e);
  }
};

/**
 * @brief 상대방에게 알림을 보냅니다.
 * @param notificationType 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE'
 * @details {} 중괄호 내부에 반드시 notificationType, notificationTypeId, userId, postId, 설정해야 합니다.
 * notificationTypeId는 type에 해당하는 객체의 id를 넣어주세요.
 * ex) COMMENT: 댓글 id | FOLLOW: 팔로우 id | LIKE: 좋아요 id | MESSAGE: 메시지 id
 * @exception type이 FOLLOW일 경우엔 postId는 null로 보내주세요.
 * @return 실패할 경우, null을 반환합니다.
 */
export const sendNotifications = async ({
  notificationType,
  notificationTypeId,
  userId,
  postId,
}: PostNotificationRequestType) => {
  try {
    const res = await axiosInstance.post<NotificationType>(
      DOMAIN.CREATE_NOTIFICATION,
      {
        params: {
          notificationType,
          notificationTypeId,
          userId,
          postId,
        },
      },
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
