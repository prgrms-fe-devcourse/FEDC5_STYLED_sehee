import React from 'react';
import Props from './type';

const SearchResultList = ({ searchResultData }: Props) => {
  return (
    <StyledWrapper>
      {searchResultData.map(() => (
        <SearchResultItem></SearchResultItem>
        // 아이템은 유저 / 포스트 배열
        // 빈 배열 올 수도 있음 -> 예외처리 필요
        // 유저 오면 유저 아바타랑 닉네임, 뿌려주고 클릭하면 해당 유저 상세 페이지로 이동
        // 포스트 오면 기존 Postcard 쓸지? 어떤 채널인지 표시할지..
      ))}
    </StyledWrapper>
  );
};

export default SearchResultList;
