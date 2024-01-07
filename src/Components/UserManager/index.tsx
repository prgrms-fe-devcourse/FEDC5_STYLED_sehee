import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import UserList from './UserList';
// import UserSearchForm from './UserSearchForm';
import StyledWrapper from './style';
import { getOnlineUsers, getUsers } from '@/Services/User';
import { UserType } from '@/Types/UserType';
import QUERY_KEYS from '@/Constants/queryKeys';

const UserManager = () => {
  const [usersOption, setUsersOption] = useState({ offset: 0, limit: 10 });
  const [allUserList, setAllUserList] = useState<UserType[]>([]);

  /**
   * 전체 사용자 목록을 불러오는 API 요청을 수행하는 useQuery 훅
   * @const
   * @type {Object}
   * @property {UserType[]} data.userList - 불러온 사용자 목록
   * @property {boolean} isLoading - 데이터 로딩 상태
   */
  const { data: userList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_LIST, usersOption.offset, usersOption.limit],
    queryFn: () => getUsers(usersOption),
  });

  /**
   * 현재 접속중인 사용자 목록을 불러오는 API 요청을 수행하는 useQuery 훅
   * @const
   * @type {Object}
   * @property {UserType[]} data.onlineUserList - 현재 접속 중인 사용자 목록
   * @options {refetchInterval} - 2초마다 API를 재요청하여 데이터를 최신 상태로 유지
   */
  const { data: onlineUserList } = useQuery({
    queryKey: [QUERY_KEYS.ONLINE_USER_LIST],
    queryFn: getOnlineUsers,
    refetchInterval: 2000,
  });

  /**
   * 더 많은 유저를 불러오기 위해 offset과 limit을 증가시키는 함수
   * 만약 받아온 유저목록이 undefined거나 빈 배열일 경우 offset과 limit를 증가시키지 않음
   * @function loadMoreUsers
   * @returns {void} 반환값 없음
   */
  const loadMoreUsers = useCallback(() => {
    if (!userList || userList.length === 0) {
      return setUsersOption((prevOptions) => ({
        offset: prevOptions.offset,
        limit: prevOptions.limit,
      }));
    }

    return setUsersOption((prevOptions) => ({
      offset: prevOptions.offset + 10,
      limit: prevOptions.limit + 10,
    }));
  }, [userList]);

  useEffect(() => {
    if (userList && userList.length !== 0) {
      setAllUserList((prevList) => [...prevList, ...userList]);
    }
  }, [userList]);

  return (
    <StyledWrapper>
      {/* <UserSearchForm /> */}
      <UserList
        isLoading={isLoading}
        isEnd={userList?.length === 0}
        userList={allUserList}
        onlineUserList={onlineUserList || []}
        loadMoreUsers={loadMoreUsers}
      />
    </StyledWrapper>
  );
};

export default UserManager;
