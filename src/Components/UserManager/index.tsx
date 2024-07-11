import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { getOnlineUsers, getUsers } from '@/Services/User';
import QUERY_KEYS from '@/Constants/queryKeys';
import { useForm } from '@/Hooks';
import { searchUsers } from '@/Services/Search';
import { UserType } from '@/Types/UserType';
import useResize from '@/Hooks/useResize';
import UserList from './UserList';
import { StyledHeader, StyledTitle, StyledWrapper } from './style';
import SkeletonList from '../Common/SkeletonList';
import Skeleton from '../Base/Skeleton';
import SearchBar from '../Common/SearchBar';
import validateSearchUser from './validateSearchUser';

const UserManager = () => {
  const { isMobileSize } = useResize(1024);
  const limit = 10;
  const refetchTime = 2000;

  const { values, errors, handleOnChange, handleOnSubmit } = useForm({
    initialState: { userName: '' },
    callback: () => {},
    validate: validateSearchUser,
  });

  const { data: searchUserList, isLoading: searchIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_USER_LIST, values.userName],
    queryFn: () => searchUsers(values.userName),
    enabled:
      !!values.userName &&
      !errors.userName &&
      !isMobileSize &&
      /^[가-힣a-zA-Z0-9]+$/.test(values.userName),
    staleTime: 5 * 60 * 1000,
  });

  const { data: onlineUserList, isLoading: allUserIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.ONLINE_USER_LIST],
    queryFn: getOnlineUsers,
    refetchInterval: refetchTime,
    enabled: !isMobileSize,
  });

  const {
    data: userList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.USER_LIST],
    queryFn: ({ pageParam }) => getUsers({ offset: pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length ? allPages.length * limit : null,
    select: ({ pages }) =>
      pages.flatMap(
        (page) => page?.filter((user) => user?.role !== 'SuperAdmin') ?? [],
      ),
    enabled: !isMobileSize,
  });

  const handleSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e);
  }, 400);

  const loadMoreUsers = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const userListToShow = useMemo(() => {
    return (
      searchUserList ||
      userList?.filter((user): user is UserType => user !== undefined) ||
      []
    );
  }, [searchUserList, userList]);

  const renderHeader = () => (
    <StyledHeader>
      <StyledTitle>User</StyledTitle>
      <SearchBar
        onChangehandler={handleSearchChange}
        onSubmithandler={handleOnSubmit}
        inputProps={{
          name: 'userName',
          type: 'text',
          placeholder: '유저 검색',
        }}
      />
    </StyledHeader>
  );

  if (searchIsLoading || allUserIsLoading) {
    return (
      <StyledWrapper>
        {renderHeader()}
        <SkeletonList
          length={10}
          style={{ flex: '1 0 90%' }}
        >
          <Skeleton.Circle size="5rem" />
          <Skeleton.Paragraph
            line={1}
            style={{ width: '100%' }}
          />
        </SkeletonList>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      {renderHeader()}
      <UserList
        userList={userListToShow}
        onlineUserList={onlineUserList || []}
        loadMoreUsers={loadMoreUsers}
      />
    </StyledWrapper>
  );
};

export default UserManager;
