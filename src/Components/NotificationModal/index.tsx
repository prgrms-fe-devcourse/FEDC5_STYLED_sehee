import { useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import NotificationHeader from './NotificationHeader';
import { CategoryType, Props } from './type';
import CategoryList from './CategoryList';
import { getNotifications, readNotifications } from '@/Services/Notification';
import StyledWrapper from './style';
import NotificationList from './NotificationList';
import {
  addNotificationsData,
  filterNotificationsByCategory,
} from './filterNotification';
import Skeleton from '../Base/Skeleton';
import SkeletonList from '../Common/SkeletonList';
import QUERY_KEYS from '@/Constants/queryKeys';

const NotificationModal = ({ onClose }: Props) => {
  const categoryList: CategoryType[] = ['전체', '댓글', '팔로우', '좋아요'];
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    categoryList[0],
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotifications,
    select: (notifications) => addNotificationsData(notifications || []),
  });

  const { mutate } = useMutation({
    mutationFn: readNotifications,
    onSuccess: onClose,
  });

  const setCategory = (category: CategoryType) => setSelectedCategory(category);

  const notificationList = useMemo(
    () => filterNotificationsByCategory(data || [], selectedCategory),
    [data, selectedCategory],
  );

  useEffect(() => {
    return () => mutate();
  }, [mutate]);

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
          list={notificationList || []}
          onClose={onClose}
        />
      )}
    </StyledWrapper>
  );
};

export default NotificationModal;
