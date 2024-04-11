/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from 'react-router-dom';
import ImageCard from '@/Components/Common/ImageCard';
import { PostType } from '@/Types/PostType';
import Skeleton from '@/Components/Base/Skeleton';
import useResize from '@/Hooks/useResize';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import { PostProps } from './type';
import { StyledGridPost, StyledProfilePostContainer } from '../style';
import StyledHr from './style';

const UserProfilePost = ({ posts, isLoading }: PostProps) => {
  const { userId } = useParams() || '';
  const navigate = useNavigate();
  const { isMobileSize } = useResize();

  return (
    <>
      <StyledHr />
      <StyledProfilePostContainer>
        <StyledGridPost>
          {isLoading ? (
            <Skeleton.Box
              width="90%"
              height="22.5rem"
            />
          ) : (
            !isLoading &&
            posts.map((post: PostType) => (
              <ImageCard
                key={post._id}
                src={post.image || logoBlack}
                comment={post.comments.length}
                width="90%"
                height={isMobileSize ? '15rem' : '22.5rem'}
                heart={post.likes.length}
                onDetail={() =>
                  navigate(`/profile/${userId}/modal-detail/${post._id}`)
                }
              />
            ))
          )}
        </StyledGridPost>
      </StyledProfilePostContainer>
    </>
  );
};

export default UserProfilePost;
