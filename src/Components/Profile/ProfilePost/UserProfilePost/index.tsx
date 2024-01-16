/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from 'react-router-dom';
import ImageCard from '@/Components/Common/ImageCard';
import { PostType } from '@/Types/PostType';
import { PostProps } from './type';
import { StyledGridPost, StyledProfilePostContainer } from '../style';
import StyledHr from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';

const UserProfilePost = ({ posts }: PostProps) => {
  const { userId } = useParams() || '';
  const navigate = useNavigate();

  const handleOpen = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <StyledHr />
      <StyledProfilePostContainer>
        <StyledGridPost>
          {posts.map((post: PostType) => (
            <ImageCard
              key={post._id}
              src={post.image || logoBlack}
              comment={post.comments.length}
              width="90%"
              height="22.5rem"
              heart={post.likes.length}
              onDetail={() =>
                handleOpen(`/profile/${userId}/modal-detail/${post._id}`)
              }
            />
          ))}
        </StyledGridPost>
      </StyledProfilePostContainer>
    </>
  );
};

export default UserProfilePost;
