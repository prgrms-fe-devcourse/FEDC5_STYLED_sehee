/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom';
import ImageCard from '@/Components/Common/ImageCard';
import { PostType } from '@/Types/PostType';
import { PostProps } from './type';
import { StyledGridPost, StyledProfilePostContainer } from '../style';
import StyledHr from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';

const UserProfilePost = ({ posts }: PostProps) => {
  return (
    <>
      <StyledHr />
      <StyledProfilePostContainer>
        <StyledGridPost>
          {posts.map((post: PostType) => (
            <Link
              to={`/modal-detail/${post._id}`}
              key={post._id}
            >
              <ImageCard
                key={post._id}
                src={post.image || logoBlack}
                comment={post.comments.length}
                width="90%"
                height="22.5rem"
                heart={post.likes.length}
              />
            </Link>
          ))}
        </StyledGridPost>
      </StyledProfilePostContainer>
    </>
  );
};

export default UserProfilePost;
