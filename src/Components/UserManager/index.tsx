import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserList from './UserList';
import UserSearchForm from './UserSearchForm';
import StyledWrapper from './style';
import { getOnlineUsers, getUsers } from '@/Services/User';
import { UserType } from '@/Types/UserType';

const UserManager = () => {
  const [usersOption, setUsersOption] = useState({ offset: 0, limit: 10 });
  const [allUserList, setAllUserList] = useState<UserType[]>([]);

  const { data: userList } = useQuery({
    queryKey: ['USER_LIST', usersOption.offset, usersOption.limit],
    queryFn: () => getUsers(usersOption),
  });

  const { data: onlineUserList, isFetching } = useQuery({
    queryKey: ['ONLINE_USER_LIST'],
    queryFn: getOnlineUsers,
    refetchInterval: 2000,
  });

  const loadMoreUsers = () => {
    setUsersOption((prevOptions) => ({
      offset: prevOptions.offset + 10,
      limit: prevOptions.limit + 10,
    }));
  };

  console.log(userList);

  useEffect(() => {
    if (userList) {
      setAllUserList((prevList) => [...prevList, ...userList]);
    }
  }, [userList]);

  return (
    <StyledWrapper>
      <UserSearchForm />
      <UserList
        userList={allUserList}
        onlineUserLIst={onlineUserList || []}
      />
    </StyledWrapper>
  );
};

export default UserManager;
