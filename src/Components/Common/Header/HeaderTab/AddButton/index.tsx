import { useState } from 'react';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import PostModal from '@/Components/Common/Modal/PostModal';

const AddButton = ({ ...props }) => {
  const [post, setPost] = useState(false);

  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      hoverBackgroundColor="transparent"
      hoverTextColor="transparent"
      borderRadius="0"
      onClick={() => setPost(true)}
    >
      <Icon
        name="add_circle"
        isFill={false}
        {...props}
      />

      {post && (
        <PostModal
          onChangeOpen={() => {
            setPost(false);
          }}
        />
      )}
    </Button>
  );
};

export default AddButton;
