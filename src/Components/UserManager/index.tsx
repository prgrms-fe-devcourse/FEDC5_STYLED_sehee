import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import UserList from './UserList';
// import UserSearchForm from './UserSearchForm';
import StyledWrapper from './style';
import { getOnlineUsers, getUsers } from '@/Services/User';
import { UserType } from '@/Types/UserType';
import QUERY_KEYS from '@/Constants/queryKeys';
// import Skeleton from '../Base/Skeleton';

const UserManager = () => {
  const [offset, setOffset] = useState(0);
  const [allUserList, setAllUserList] = useState<UserType[]>([]);
  const limit = 10;
  const refetchTime = 2000;

  const {
    data: userList,
    isLoading: userListIsLoading,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_LIST, offset, limit],
    queryFn: () => getUsers({ offset, limit }),
  });

  const { data: onlineUserList, isLoading: onlineUserListIsLoading } = useQuery(
    {
      queryKey: [QUERY_KEYS.ONLINE_USER_LIST],
      queryFn: getOnlineUsers,
      refetchInterval: refetchTime,
    },
  );

  const loadMoreUsers = useCallback(() => {
    if (!userList || userList.length === 0 || !isSuccess) {
      return;
    }

    setOffset((prevOffset) => prevOffset + limit);
  }, [isSuccess, userList]);

  useEffect(() => {
    if (!userList || userList.length === 0 || !isSuccess) {
      return;
    }

    setAllUserList((prevList) => {
      const prevListIds = new Set(prevList.map(({ _id }) => _id));
      const newAllUsers = userList.filter(({ _id }) => !prevListIds.has(_id));

      return [...prevList, ...newAllUsers];
    });
  }, [isSuccess, userList]);

  return (
    <StyledWrapper>
      {/* <UserSearchForm /> */}
      {/* {userListIsLoading ||
        (onlineUserListIsLoading && (
          <SkeletonList
            length={9}
            style={{ flexGrow: 1 }}
          >
            <Skeleton.Circle size="5rem" />
            <Skeleton.Paragraph
              line={2}
              style={{ width: '100%' }}
            />
          </SkeletonList>
        ))} */}
      {!userListIsLoading && !onlineUserListIsLoading && (
        <UserList
          userList={allUserList}
          onlineUserList={onlineUserList || []}
          loadMoreUsers={loadMoreUsers}
        />
      )}
    </StyledWrapper>
  );
};

export default UserManager;
