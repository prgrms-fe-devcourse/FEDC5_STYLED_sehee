import React from 'react';
import { Props } from './type';
import { StyledContainer, StyledWrapper } from './style';

const AsideHeader = ({ onSelectChannelId, onSubmit }: Props) => {
  // TODO: 유저 스토어에서 현재 유저 상태를 받아와야 함

  return (
    <StyledWrapper>
      <StyledContainer>카테고리 드롭다운, 공유하기 버튼</StyledContainer>
      <StyledContainer>프로필 사진과 유저 이름</StyledContainer>
    </StyledWrapper>
  );
};

export default AsideHeader;
