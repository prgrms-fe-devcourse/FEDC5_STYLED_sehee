import { useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import NotificationHeader from './NotificationHeader';
import { CategoryType, PostSendNotificationsType, Props } from './type';
import CategoryList from './CategoryList';
import {
  getNotifications,
  readNotifications,
  sendNotifications,
} from '@/Services/Notification';
import StyledWrapper from './style';
import NotificationList from './NotificationList';
import {
  filterNotificationList,
  filterNotificationsByCategory,
} from './filterNotification';
import Skeleton from '../Base/Skeleton';
import SkeletonList from '../Common/SkeletonList';
import QUERY_KEYS from '@/Constants/queryKeys';
import useAuthUserStore from '@/Stores/AuthUser';

const NotificationModal = ({ onClose }: Props) => {
  const categoryList: CategoryType[] = ['전체', '댓글', '팔로우', '좋아요'];
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    categoryList[0],
  );
  const {
    user: { _id: userId },
  } = useAuthUserStore();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotifications,
    select: (notifications) => filterNotificationList(notifications || []),
  });

  const { mutateAsync: postSendNotifications } = useMutation({
    mutationFn: ({ messageId, receiverId }: PostSendNotificationsType) =>
      sendNotifications({
        notificationType: 'MESSAGE',
        notificationTypeId: messageId,
        userId: receiverId,
        postId: null,
      }),
  });

  const { mutate: postReadNotifications } = useMutation({
    mutationFn: readNotifications,
    onSuccess: () => {
      if (userId) {
        Promise.all(
          data?.messageList.map((message) =>
            postSendNotifications({
              messageId: message,
              receiverId: userId,
            }),
          ) || [],
        );
      }
    },
  });

  console.log(data);

  const setCategory = (category: CategoryType) => setSelectedCategory(category);

  const notificationList = useMemo(
    () =>
      filterNotificationsByCategory(
        data?.notificationList || [],
        selectedCategory,
      ),
    [data, selectedCategory],
  );

  useEffect(() => {
    return () => postReadNotifications();
  }, [postReadNotifications]);

  return (
    <StyledWrapper>
      <NotificationHeader onClose={onClose} />
      <CategoryList
        list={categoryList}
        selectedCategory={selectedCategory}
        setCategory={setCategory}
      />
      {isLoading && (
        <SkeletonList
          length={9}
          style={{ flexGrow: 1 }}
        >
          <Skeleton.Circle size="5rem" />
          <Skeleton.Paragraph
            line={2}
            style={{ width: '100%' }}
          />
          <Skeleton.Circle size="1rem" />
        </SkeletonList>
      )}
      {!isLoading && (
        <NotificationList
          list={notificationList}
          onClose={onClose}
        />
      )}
    </StyledWrapper>
  );
};

export default NotificationModal;
