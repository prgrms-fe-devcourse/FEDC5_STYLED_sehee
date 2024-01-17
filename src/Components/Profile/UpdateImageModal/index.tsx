import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import ImageUpload from '@/Components/Common/ImageUpload';
import Modal from '@/Components/Common/Modal';
import { updateProfileImage } from '@/Services/User';
import { Props } from './type';
import { ImageFileType } from '@/Components/Common/ImageUpload/type';
import Spinner from '@/Components/Base/Spinner';
import StyledConatiner from './style';
import Alert from '@/Components/Common/Alert';
import useCheckAuth from '@/Hooks/Api/Auth';
import useFetchUser from '@/Hooks/Api/User';
import useResize from '@/Hooks/useResize';

const UpdateImageModal = ({ handleCloseModal }: Props) => {
  const [image, setImage] = useState<ImageFileType>();
  const { userId } = useParams() || '';
  const { loginUserRefetch } = useCheckAuth();
  const { userDataRefetch } = useFetchUser(userId || '');
  const [isError, setIsError] = useState(false);
  const { isMobileSize } = useResize();

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      if (image) await updateProfileImage(image.file);
    },
    onSuccess: () => {
      handleCloseModal(false);
      loginUserRefetch();
      userDataRefetch();
    },
    onError: () => {
      setIsError(true);
    },
  });

  const handleUpload = (imageFile: ImageFileType) => {
    setImage(imageFile);
  };

  return (
    <Modal
      height={50}
      width={isMobileSize ? 70 : 45}
      onChangeOpen={handleCloseModal}
    >
      <StyledConatiner>
        {status === 'pending' ? (
          <Spinner isFixedCenter />
        ) : (
          <>
            <ImageUpload
              width="100%"
              height="85%"
              onUpload={handleUpload}
            />
            <Button
              type="button"
              height="3rem"
              textSize="1.4rem"
              width="7rem"
              borderRadius="1rem"
              onClick={() => mutate()}
              style={{ float: 'right' }}
            >
              변경
            </Button>
          </>
        )}
        {isError && (
          <Alert
            message="프로필 사진 변경에 실패했습니다"
            onChangeOpen={() => {
              handleCloseModal(false);
            }}
          />
        )}
      </StyledConatiner>
    </Modal>
  );
};

export default UpdateImageModal;
