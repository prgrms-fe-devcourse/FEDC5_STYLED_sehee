import { useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import useAuthUserStore from '@/Stores/AuthUser';
import useClickAway from '@/Hooks/UseClickAway';

const NotificationModal = ({ onClose }: Props) => {
  const queryClient = useQueryClient();
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
  const [isMounted, setIsMounted] = useState(false);
  const {
    user: { _id: authId },
  } = useAuthUserStore();
  const ref = useClickAway(() => setIsMounted(true));

  const { data: notificationList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotifications,
    select: (notifications) =>
      filterNotificationList(notifications || [], authId || null),
  });

  const { mutate: postReadNotifications } = useMutation({
    mutationFn: readNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
      });
    },
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        onClose();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isMounted, onClose]);

  useEffect(() => {
    return () => postReadNotifications();
  }, [postReadNotifications]);

  return (
    <StyledWrapper
      ref={ref}
      $isMounted={isMounted}
    >
      <NotificationHeader onClose={() => setIsMounted(true)} />
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
          onClose={() => setIsMounted(true)}
        />
      )}
    </StyledWrapper>
  );
};

export default NotificationModal;
