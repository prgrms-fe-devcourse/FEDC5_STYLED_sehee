import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import UserList from './UserList';
import UserSearchForm from './UserSearchForm';
import StyledWrapper from './style';
import { getOnlineUsers, getUsers } from '@/Services/User';
import QUERY_KEYS from '@/Constants/queryKeys';
import { UserType } from '@/Types/UserType';
import SkeletonList from '../Common/SkeletonList';
import Skeleton from '../Base/Skeleton';

const UserManager = () => {
  const limit = 10;
  const refetchTime = 2000;

  const { data: onlineUserList } = useQuery({
    queryKey: [QUERY_KEYS.ONLINE_USER_LIST],
    queryFn: getOnlineUsers,
    refetchInterval: refetchTime,
  });

  const {
    data: userList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['ONLINE_USER_LIST'],
    queryFn: ({ pageParam }) => getUsers({ offset: pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length !== 0) {
        return allPages.length * limit;
      }
      return null;
    },
    select: (response) => {
      const filteredData = response.pages
        .map((page) => page?.filter(({ role }) => role !== 'SuperAdmin'))
        .flat();

      return { ...response, pages: filteredData };
    },
  });

  const loadMoreUsers = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <StyledWrapper>
      <UserSearchForm />
      {!isFetching ||
        (!userList && (
          <SkeletonList
            length={6}
            style={{ flex: '1 0 90%' }}
          >
            <Skeleton.Circle size="5rem" />
            <Skeleton.Paragraph
              line={1}
              style={{ width: '100%' }}
            />
          </SkeletonList>
        ))}
      <UserList
        userList={
          userList?.pages?.filter(
            (user): user is UserType => user !== undefined,
          ) || []
        }
        onlineUserList={onlineUserList || []}
        loadMoreUsers={loadMoreUsers}
      />
    </StyledWrapper>
  );
};

export default UserManager;
