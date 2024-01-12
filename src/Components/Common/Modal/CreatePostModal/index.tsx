import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Alert from '../../Alert';
import AsideHeader from './AsideHeader';
import ImageUpload from '../../ImageUpload';
import Modal from '..';
import Spinner from '@/Components/Base/Spinner';
import TitleEditor from './TitleEditor';

import { createPost } from '@/Services/Post';
import { getChannel } from '@/Services/Channel';

import { StyledAside, StyledHeader, StyledMain, StyledWrapper } from './style';

import { ImageFileType } from '../../ImageUpload/type';
import { PostCreatePostRequestType } from '@/Types/Request';
import { Props } from './type';

// * 하위 컴포넌트로부터 갱신된 데이터를 통합적으로 관리

// DONE: 컴포넌트 설계
// DONE: Props 설정, 타입 지정
// DONE: 대략적인 스타일링
// DONE: 컴포넌트 구현
// DONE: 해당 컴포넌트로 데이터를 모아 쿼리 통신 구현
// TODO: 기타 에러 핸들링
// TODO: 게시글 수정 모달로 확장 (post 있는 상태면 해당 값으로 초기화, 아니면 빈 값으로)

const CreatePostModal = ({ post, onChangeOpen }: Props) => {
  const navigate = useNavigate();
  const isAuthUser = !!sessionStorage.getItem('AUTH_TOKEN');
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<ImageFileType | null>(null);

  const { mutate: mutatePost, status: postStatus } = useMutation({
    mutationFn: (postFormData: PostCreatePostRequestType) =>
      createPost(postFormData),
    onSuccess: (res) => res && navigate('/'),
  });

  const { mutate: mutateChannel, status: channelStatus } = useMutation({
    mutationFn: (channelName: string) => getChannel(channelName),
    onSuccess: (res) => {
      // eslint-disable-next-line no-underscore-dangle
      if (res && image)
        mutatePost({ title, image: image.file, channelId: res._id });
    },
  });

  const handleSubmit = () => {
    if (title.length > 0 && category && image) {
      mutateChannel(category);
    } else {
      // 에러
    }
  };

  return isAuthUser ? (
    <>
      {(postStatus === 'pending' || channelStatus === 'pending') && (
        <Spinner
          isBackground
          isFixedCenter
        />
      )}
      <Modal onChangeOpen={onChangeOpen}>
        <StyledWrapper>
          <StyledMain>
            <StyledHeader>새로운 포스트</StyledHeader>
            <ImageUpload
              width="100%"
              height="70%"
              onUpload={setImage}
            />
          </StyledMain>
          <StyledAside>
            <AsideHeader
              onSubmit={handleSubmit}
              onSelectChannel={setCategory}
            />
            <TitleEditor onEditing={setTitle} />
          </StyledAside>
        </StyledWrapper>
      </Modal>
    </>
  ) : (
    <Alert
      message="로그인 후 이용해주세요"
      onChangeOpen={onChangeOpen}
    />
  );
};

export default CreatePostModal;
