/* eslint-disable no-underscore-dangle */
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '@/Components/Common/Modal';
import StyledDotModalBtnContainer from './style';
import Button from '@/Components/Base/Button';
import buttonInfo from './postDotModalConst';
import useAuthUserStore from '@/Stores/AuthUser';
import USER_ROLE from '@/Constants/userRole';
import useDeletePost from '@/Hooks/Api/Post';
import Alert from '@/Components/Common/Alert';
import { PostDotModalProps } from './type';

const PostDotModal = ({
  postId,
  isFollow,
  postAuthorId,
  onChangeOpen,
  onCloseDotModal,
  onCancelFollow,
}: PostDotModalProps) => {
  const { colors } = useTheme();
  const { user: authUser } = useAuthUserStore();
  const navigate = useNavigate();

  const [isAlert, setIsAlert] = useState(false);
  const { deleteMyPost } = useDeletePost();

  // 포스트 삭제 api 요청 함수
  const handleDeletePost = () => {
    deleteMyPost(postId, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  // 삭제 확인 모달 open 함수
  const handleOpenAlert = () => {
    setIsAlert(true);
  };

  // 삭제 확인 모달 close 함수
  const handleCloseAlert = () => {
    setIsAlert(false);
  };

  // 포스트 수정 함수
  const handleEditPost = () => {
    navigate(`/edit-post/${postId}`);
  };

  // 팔로우 취소 함수
  const handleCancelFollow = () => {
    onCancelFollow(false);
    onCloseDotModal(false);
  };

  // PostDotModal 닫는 함수
  const handleCloseDotModal = () => {
    onCloseDotModal(false);
  };

  // 핸들러 함수 리스트
  const handlerFuncList = [
    handleOpenAlert,
    handleEditPost,
    handleCancelFollow,
    handleCloseDotModal,
  ];

  return (
    <Modal
      width={25}
      height={30}
      onChangeOpen={onChangeOpen}
      flexDirection="column"
      className="dot-modal"
      style={{ height: 'fit-content' }}
    >
      <StyledDotModalBtnContainer>
        {buttonInfo.map((title, index) => {
          const isAdmin = authUser.role === USER_ROLE.ADMIN_USER;
          const isMyPost = authUser._id === postAuthorId;
          const isAdvancedTitle =
            title === '게시물 삭제' || title === '게시물 수정';
          if (isAdvancedTitle && !(isAdmin || isMyPost)) return null;

          if (title === '팔로우 취소' && !isFollow) {
            return null;
          }

          return (
            <Button
              key={title}
              width="100%"
              height="25%"
              borderRadius={index > 0 ? '0' : '0.5rem'}
              textSize="1.2rem"
              textColor={
                title === '게시물 삭제' || title === '팔로우 취소'
                  ? colors.alert
                  : colors.text
              }
              hoverTextColor={
                title === '게시물 삭제' || title === '팔로우 취소'
                  ? colors.alert
                  : colors.textReverse
              }
              backgroundColor={colors.background}
              hoverBackgroundColor={colors.backgroundReverse}
              onClick={handlerFuncList[index]}
              className="dot-modal-btn"
            >
              {title}
            </Button>
          );
        })}
      </StyledDotModalBtnContainer>

      {/* 삭제 확인 모달창 */}
      {isAlert ? (
        <Alert
          mode="confirm"
          message="정말로 삭제하시겠습니까?"
          onChangeOpen={setIsAlert}
          onConfirm={handleDeletePost}
          onCancle={handleCloseAlert}
          confirmContent="확인"
          cancleContent="취소"
          className="dot-modal-delete-alert"
        />
      ) : null}
    </Modal>
  );
};

export default PostDotModal;
