import { useTheme } from 'styled-components';
import Modal from '@/Components/Common/Modal';
import {
  PostDotModalProps,
  dotModalButtonStyle,
  notFirstDotModalButtonStyle,
} from './style';
import Button from '@/Components/Base/Button';
import buttonInfo from './postDotModalConst';

const PostDotModal = ({
  onChangeOpen,
  onCloseDotModal,
  onCancelFollow,
}: PostDotModalProps) => {
  const { colors } = useTheme();

  // TODO: 포스트 수정, 삭제, 팔로우 취소 api 연결
  const handleDeletePost = () => {};

  const handleEditPost = () => {};

  const handleCancelFollow = () => {
    onCancelFollow(false);
    onCloseDotModal(false);
  };

  const handleCloseDotModal = () => {
    onCloseDotModal(false);
  };

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
      {buttonInfo.map((title, index) => (
        <Button
          key={title}
          width="100%"
          height="25%"
          borderRadius={index > 0 ? '0' : '0.5rem'}
          style={index > 0 ? notFirstDotModalButtonStyle : dotModalButtonStyle}
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
      ))}
    </Modal>
  );
};

export default PostDotModal;
