import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from 'styled-components';

import { UserType } from '@/Types/UserType';
import { PostType } from '@/Types/PostType';
import { searchAll } from '@/Services/Search';
import Modal from '@/Components/Common/Modal';
import Spinner from '../Base/Spinner';
import Button from '../Base/Button';
import SearchBar from './SearchBar';
import SearchUserList from './SearchUserList';
import SearchPostList from './SearchPostList';
import { Props } from './type';
import {
  StyledBody,
  StyledHeader,
  StyledHeaderTab,
  StyledHeaderTitle,
  StyledWrapper,
} from './style';

// TODO: SearchPostList, SearchUserList 컴포넌트 통합
// TODO: 검색 결과 상세화

const SearchModal = ({ onChangeOpen }: Props) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<'USER' | 'POST'>('USER');
  const [userResult, setUserResult] = useState<UserType[] | null>(null);
  const [postResult, setPostResult] = useState<PostType[] | null>(null);

  /**
   * @brief 사용자가 입력한 검색어를 담아 요청을 보냅니다. 응답 데이터는 유저와 포스트 결과를 담고 있는 배열 형태이며, 이를 순회하며 유저 데이터와 포스트 데이터를 분리합니다. 이후 분리한 데이터를 하위 컴포넌트에게 전달하여 검색 결과를 화면에 표시합니다.
   */
  const { mutate: mutateSearch, status: searchStatus } = useMutation({
    mutationFn: (query: string) => searchAll(query),
    onSuccess: (res) => {
      if (res) {
        const userData: UserType[] = [];
        const postData: PostType[] = [];

        res.forEach((item) => {
          if ('role' in item) {
            userData.push(item as UserType);
          } else {
            postData.push(item as PostType);
          }
        });

        if (userData.length > 0) {
          setUserResult(userData);
        }
        if (postData.length > 0) {
          setPostResult(postData);
        }
      }
    },
  });

  const handleSubmit = (query: string) => {
    setPostResult(null);
    setUserResult(null);
    setSearchQuery(query);
    mutateSearch(query);
  };

  const tabStyle = {
    fontSize: theme.size.medium,
    width: '18rem',
    height: '3rem',
    borderRadius: '1rem',
  };

  return (
    <>
      {searchStatus === 'pending' && (
        <Spinner
          isBackground
          isFixedCenter
        />
      )}
      <Modal
        width={40}
        height={80}
        onChangeOpen={onChangeOpen}
      >
        <StyledWrapper>
          <StyledHeader>
            <StyledHeaderTitle>
              {searchQuery ? `"${searchQuery}" 검색 결과` : '검색'}
            </StyledHeaderTitle>
            <SearchBar
              onSubmit={handleSubmit}
              onError={() => setSearchQuery('')}
            />

            <StyledHeaderTab>
              <Button
                isActive={currentTab === 'USER'}
                onClick={() => setCurrentTab('USER')}
                backgroundColor={theme.colors.background}
                hoverTextColor={theme.colors.buttonBackground}
                textColor={theme.colors.buttonBackground}
                style={tabStyle}
              >
                유저
              </Button>
              <Button
                isActive={currentTab === 'POST'}
                onClick={() => setCurrentTab('POST')}
                backgroundColor={theme.colors.background}
                hoverTextColor={theme.colors.buttonBackground}
                textColor={theme.colors.buttonBackground}
                style={tabStyle}
              >
                포스트
              </Button>
            </StyledHeaderTab>
          </StyledHeader>
          <StyledBody>
            {currentTab === 'USER' ? (
              <SearchUserList data={userResult} />
            ) : (
              <SearchPostList data={postResult} />
            )}
          </StyledBody>
        </StyledWrapper>
      </Modal>
    </>
  );
};

export default SearchModal;
