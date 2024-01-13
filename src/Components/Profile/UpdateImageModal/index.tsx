import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '@/Components/Base/Button';
import ImageUpload from '@/Components/Common/ImageUpload';
import Modal from '@/Components/Common/Modal';
import { updateProfileImage } from '@/Services/User';
import { Props } from './type';
import { ImageFileType } from '@/Components/Common/ImageUpload/type';
import Spinner from '@/Components/Base/Spinner';
import StyledConatiner from './style';

const UpdateImageModal = ({ handleCloseModal }: Props) => {
  const [image, setImage] = useState<ImageFileType | null | string>();

  const { mutate, status } = useMutation({
    mutationFn: () => updateProfileImage(image?.file),
    onSuccess: async (response) => {
      if (response) {
        handleCloseModal(false);
      }
    },
  });

  return (
    <Modal
      height={50}
      width={45}
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
              onUpload={setImage}
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
              완료
            </Button>
          </>
        )}
      </StyledConatiner>
    </Modal>
  );
};

export default UpdateImageModal;
