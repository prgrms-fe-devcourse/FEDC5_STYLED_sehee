import { useState } from 'react';
import { useTheme } from 'styled-components';
import Modal from '@/Components/Common/Modal';
import { Props } from './type';
import {
  StyledBody,
  StyledHeader,
  StyledHeaderTab,
  StyledHeaderTitle,
  StyledWrapper,
} from './style';
import SearchBar from './SearchBar';
import Button from '../Base/Button';
import { UserType } from '@/Types/UserType';
import { PostType } from '@/Types/PostType';
import SearchUserList from './SearchUserList';
import SearchPostList from './SearchPostList';

// * Sudo-logic
// 1. 폼 입력하고 쿼리 제출
// 2. SeachAll(query) 전송, 배열로 받음
// 3. 앞엔 사용자, 뒤엔 포스트
// 4. 언제 끊기는지 인덱스를 찾아야 함, 인덱스 찾았으면 해당 인덱스 기준으로 앞 뒤 잘라서 State에 넣어놔
// 5. 탭 만들어서 사용자, 포스트 분리해
// 6. 만약 비어있으면 따로 메시지 띄워
// 7. 사용자 클릭하면 사용자 상세페이지, 포스트 클릭하면 포스트 상세페이지로 이동
// 8. 각각 State 초기값은 비어있고, suvmmit할 때마다 갱신
// 9. ${Query} 검색 결과입니다 정도는 띄워도 될 듯

// DONE: 컴포넌트 설계
// DONE: Props 설정, 타입 지정
// DONE: 대략적인 스타일링
// TODO: 컴포넌트 구현
// TODO: 해당 컴포넌트로 데이터를 모아 쿼리 통신 구현
// TODO: 기타 에러 핸들링

// TODO: SearchPostList, SearchUserList refactor

const SearchModal = ({ onChangeOpen }: Props) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<'USER' | 'POST'>('USER');
  const [userResult, setUserResult] = useState<UserType[] | null>(null);
  const [postResult, setPostResult] = useState<PostType[] | null>(null);

  const handleSubmit = (query: string) => {
    setSearchQuery(query);

    // query 담아서 searchAll 요청 mutateSearch
    // 성공하면 data 한 번 쭉 돌고, 나뉘는 인덱스 찾음
    // 해당 인덱스 기준으로 잘라서 userReuslt, postResult에 넣음
  };

  const tabStyle = {
    fontSize: theme.size.medium,
    width: '18rem',
    height: '3rem',
    borderRadius: '1rem',
  };

  return (
    <Modal
      width={40}
      onChangeOpen={onChangeOpen}
    >
      <StyledWrapper>
        <StyledHeader>
          <StyledHeaderTitle>
            {searchQuery ? `"${searchQuery}" 검색 결과` : '검색'}
          </StyledHeaderTitle>
          <SearchBar onSubmit={handleSubmit} />

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
  );
};

export default SearchModal;
