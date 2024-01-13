import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router';
import Modal from '@/Components/Common/Modal';
import {
  PostDotModalProps,
  dotModalButtonStyle,
  notFirstDotModalButtonStyle,
} from './style';
import Button from '@/Components/Base/Button';
import buttonInfo from './postDotModalConst';
import useAuthUserStore from '@/Stores/AuthUser';
import USER_ROLE from '@/Constants/userRole';

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

  /**
   * 포스트 삭제 함수
   */
  // TODO: 포스트 수정, 삭제, 팔로우 취소 api 연결
  const handleDeletePost = () => {};

  /**
   * 포스트 수정 함수
   */
  const handleEditPost = () => {
    navigate(`/edit-post/${postId}`);
  };

  /**
   * 팔로우 취소 함수
   */
  const handleCancelFollow = () => {
    onCancelFollow(false);
    onCloseDotModal(false);
  };

  /**
   * PostDotModal 닫는 함수
   */
  const handleCloseDotModal = () => {
    onCloseDotModal(false);
  };

  // 핸들러 함수 리스트
  const handlerFuncList = [
    handleDeletePost,
    handleEditPost,
    handleCancelFollow,
    handleCloseDotModal,
  ];

  return (
    <Modal
      width={30}
      height={24}
      onChangeOpen={onChangeOpen}
      flexDirection="column"
    >
      {buttonInfo.map((title, index) => {
        const isAdmin = authUser.role === USER_ROLE.ADMIN_USER;
        // eslint-disable-next-line no-underscore-dangle
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
            style={
              index > 0 ? notFirstDotModalButtonStyle : dotModalButtonStyle
            }
            textColor={
              title === '게시물 삭제' || title === '팔로우 취소'
                ? colors.alert
                : colors.text
            }
            hoverTextColor={
              title === '게시물 삭제' || title === '팔로우 취소'
                ? colors.alert
                : colors.text
            }
            backgroundColor={colors.background}
            hoverBackgroundColor={colors.background}
            onClick={handlerFuncList[index]}
          >
            {title}
          </Button>
        );
      })}
    </Modal>
  );
};

export default PostDotModal;
