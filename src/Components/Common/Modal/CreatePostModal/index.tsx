import React from 'react';

// * 하위 컴포넌트로부터 갱신된 데이터를 통합적으로 관리

// DONE: 컴포넌트 설계
// TODO: Props 설정, 타입 지정
// TODO: 컴포넌트 구현
// TODO: 해당 컴포넌트로 데이터를 모아 쿼리 통신 구현
// TODO: 기타 에러 핸들링
// TODO: 게시글 수정 모달로 확장

const CreatePostModal = () => {
  return (
    <wrapper>
      <main>
        <header></header>
        <imageupload></imageupload>
      </main>
      <aside>
        <asideHeader></asideHeader>
        <titleEditor></titleEditor>
      </aside>
    </wrapper>
  );
};

export default CreatePostModal;
