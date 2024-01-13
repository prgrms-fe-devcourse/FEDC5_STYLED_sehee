import { useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import NotificationHeader from './NotificationHeader';
import { CategoryType, Props } from './type';
import CategoryList from './CategoryList';
import { getNotifications, readNotifications } from '@/Services/Notification';
import StyledWrapper from './style';
import NotificationList from './NotificationList';
import {
  filterNotificationList,
  filterNotificationsByCategory,
} from './filterNotification';
import Skeleton from '../Base/Skeleton';
import SkeletonList from '../Common/SkeletonList';
import QUERY_KEYS from '@/Constants/queryKeys';

const NotificationModal = ({ onClose }: Props) => {
  const categoryList: CategoryType[] = [
    '전체',
    '메세지',
    '댓글',
    '팔로우',
    '좋아요',
  ];
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    categoryList[0],
  );

  const { data: notificationList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotifications,
    select: (notifications) => filterNotificationList(notifications || []),
  });

  const { mutate: postReadNotifications } = useMutation({
    mutationFn: readNotifications,
  });

  const setCategory = (category: CategoryType) => setSelectedCategory(category);

  const list = useMemo(() => {
    const filteredList = filterNotificationsByCategory(
      notificationList || [],
      selectedCategory,
    );

    return filteredList.length > 100
      ? filteredList.slice(0, 100)
      : filteredList;
  }, [notificationList, selectedCategory]);

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
          list={list}
          onClose={onClose}
        />
      )}
    </StyledWrapper>
  );
};

export default NotificationModal;
