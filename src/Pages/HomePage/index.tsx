/* eslint no-underscore-dangle: 0 */
// _id 파라미터 사용시 eslint 에러 발생 방지
import { useTheme } from 'styled-components';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  StyledCategoryList,
  StyledCategoryTitle,
  StyledCategoryTitleContainer,
  StyledHeaderContainer,
  StyledLeftContainer,
  StyledMainContentContainer,
  StyledRightContainer,
  StyledUserCardWrapper,
  StyledUserInfoContainer,
  StyledUserList,
  StyledUserName,
  StyledWrapper,
} from './style';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import { getChannels } from '@/Services/Channel';
import { ChannelType } from '@/Types/ChannelType';
import channels from '@/Constants/Channels';
import { getUsers } from '@/Services/User';
import { UserType } from '@/Types/UserType';
import SearchBar from '@/Components/Common/SearchBar';
import Avatar from '@/Components/Base/Avatar';
import Badge from '@/Components/Base/Badge';

const HomePage = () => {
  const { colors, size } = useTheme();

  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  const [userList, setUserList] = useState<UserType[]>([]);
  const [currentChannelId, setCurrentChannelId] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchedUserList, setSearchedUserList] = useState<UserType[]>([]);

  /**
   *
   * @param e 채널 버튼 클릭 이벤트
   * @returns eslint 에러때문에 반환, channelId 상태 업데이트
   */
  const handleClickChannel = (e: MouseEvent<HTMLButtonElement>) => {
    const channelId = e.currentTarget.dataset.id;

    return channelId && setCurrentChannelId(channelId);
  };

  const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputKeyword = e.target.value;
    setSearchKeyword(inputKeyword);
  }, []);

  /**
   * 모든 채널을 fetch하는 함수
   * @return setChannelList 함수 실행 void
   */
  const fetchChannelList = async () => {
    const channelData = await getChannels();

    return channelData && setChannelList(channelData);
  };

  /**
   * 모든 유저 리스트를 fetch하는 함수
   * @returns 관리자 계정 제외한 유저 리스트 setUserList로 업데이트
   */
  const fetchUserList = async () => {
    const userData = await getUsers();

    // 관리자 계정 제외 필터링
    const filteredUserList = userData?.filter(
      (user) => user.role !== 'SuperAdmin',
    );

    return filteredUserList && setUserList(filteredUserList);
  };

  const matchUserList = useCallback(
    (users: UserType[], searchQuery: string) => {
      if (!searchQuery) setSearchedUserList([]);

      const result = users.filter((user) => {
        const { fullName } = user;

        return (
          fullName.includes(searchQuery) ||
          fullName.toLowerCase().includes(searchQuery)
        );
      });

      if (result) setSearchedUserList(result);

      return result;
    },
    [],
  );

  useEffect(() => {
    if (channelList.length === 0) fetchChannelList();
    if (userList.length === 0) fetchUserList();

    matchUserList(userList, searchKeyword);
  }, [
    channelList.length,
    userList.length,
    matchUserList,
    searchKeyword,
    userList,
  ]);

  return (
    <>
      {/* Header 컴포넌트 있다고 가정 */}
      <StyledHeaderContainer />

      <StyledWrapper>
        <StyledLeftContainer>
          <StyledCategoryTitleContainer>
            <StyledCategoryTitle>카테고리</StyledCategoryTitle>
            {/* 카테고리 채널 추가 버튼 */}
            <Button
              width={size.large}
              height={size.large}
              borderRadius="0.5rem"
              textSize={size.medium}
              backgroundColor={colors.background}
              hoverBackgroundColor={colors.backgroundGrey}
            >
              <Icon
                name="add"
                style={{ color: `grey`, fontSize: `${size.large}` }}
              />
            </Button>
          </StyledCategoryTitleContainer>
          {/* 채널 버튼 리스트 */}
          <StyledCategoryList>
            <Button
              data-id="all"
              width="80%"
              height={size.doubleLarge}
              borderRadius="1rem"
              textSize={size.medium}
              backgroundColor={
                currentChannelId === 'all'
                  ? colors.backgroundGrey
                  : colors.background
              }
              hoverBackgroundColor={
                currentChannelId === 'all'
                  ? colors.backgroundGrey
                  : colors.focusHover
              }
              textColor={colors.text}
              onClick={handleClickChannel}
            >
              전체
            </Button>
            {channelList.map((channel) => {
              return (
                <Button
                  key={channel._id}
                  data-id={channel._id}
                  width="80%"
                  height={size.doubleLarge}
                  borderRadius="1rem"
                  textSize={size.medium}
                  backgroundColor={
                    currentChannelId === channel._id
                      ? colors.backgroundGrey
                      : colors.background
                  }
                  hoverBackgroundColor={
                    currentChannelId === channel._id
                      ? colors.backgroundGrey
                      : colors.focusHover
                  }
                  textColor={colors.text}
                  onClick={handleClickChannel}
                >
                  {channels[channel.name]}
                </Button>
              );
            })}
          </StyledCategoryList>
        </StyledLeftContainer>
        <StyledMainContentContainer />
        <StyledRightContainer>
          <SearchBar
            onChangehandler={handleChangeSearch}
            className="user-search"
          />
          <StyledUserList>
            {(searchKeyword || searchedUserList.length !== 0
              ? searchedUserList
              : userList
            ).map((user) => {
              return (
                <StyledUserCardWrapper key={user._id}>
                  <Avatar
                    src={user.coverImage || ''}
                    className="user-avatar"
                    size={30}
                  >
                    {!user.isOnline && (
                      <Badge
                        position="rightBottom"
                        backgroundColor={colors.online}
                        style={{ border: `1px solid ${colors.background}` }}
                      />
                    )}
                  </Avatar>
                  <StyledUserInfoContainer>
                    <StyledUserName>{user.fullName}</StyledUserName>
                  </StyledUserInfoContainer>
                </StyledUserCardWrapper>
              );
            })}
          </StyledUserList>
        </StyledRightContainer>
      </StyledWrapper>
    </>
  );
};

export default HomePage;
