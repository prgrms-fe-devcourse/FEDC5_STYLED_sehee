import Modal from '@/Components/Common/Modal';
import { Props } from './type';
import {
  StyledBody,
  StyledHeader,
  StyledHeaderTab,
  StyledHeaderTitle,
  StyledWrapper,
} from './style';
import SearchResultList from './SearchResultList';
import SearchSkeleton from './SearchSkeleton';

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
// TODO: 대략적인 스타일링
// TODO: 컴포넌트 구현
// TODO: 해당 컴포넌트로 데이터를 모아 쿼리 통신 구현
// TODO: 기타 에러 핸들링

const SearchModal = ({ onChangeOpen }: Props) => {
  return (
    <Modal
      width={40}
      onChangeOpen={onChangeOpen}
    >
      <StyledWrapper>
        <StyledHeader>
          <StyledHeaderTitle>
            {/* query:string */}
            {/* 검색, 쿼리 요청 시 ${query} 검색 결과 */}
            검색
          </StyledHeaderTitle>
          <StyledHeaderTab>
            {/* currentTab */}
            {/* 유저 탭과 포스트 탭, 디폴트는 유저 탭 */}
            tab
          </StyledHeaderTab>
        </StyledHeader>
        <StyledBody>
          {/* 검색결과 or 스켈레톤 */}
          <SearchResultList SearchResultData />
          <SearchSkeleton />
        </StyledBody>
      </StyledWrapper>
    </Modal>
  );
};

export default SearchModal;
