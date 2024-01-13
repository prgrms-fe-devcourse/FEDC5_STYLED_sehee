/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import ImageCard from '@/Components/Common/ImageCard';
import { PostType } from '@/Types/PostType';
import { PostLikeProps } from './type';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import { getPostByUser } from '@/Services/Post';
import { GetChannelPostRequestType } from '@/Types/Request';
import { StyledGridPost, StyledProfilePostContainer } from '../style';
import StyledHeadContainer from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';

const MyProfilePost = ({ posts, likes }: PostLikeProps) => {
  const [isLike, setIsLike] = useState(false);
  const { colors } = useTheme();
  const likePosts = [];
  /*
  const getLikePostById = async (
    userId: string,
    postId: string,
    { offset = 0, limit = 100 }: GetChannelPostRequestType = {},
  ): Promise<PostType | null> => {
    try {
      // 특정 사용자의 포스트 목록 가져오기
      const userPosts = await getPostByUser(userId, { offset, limit });

      if (!userPosts) {
        return null;
      }

      // 특정 아이디의 포스트 찾기
      const postIdPost = userPosts.find((post) => post._id === postId);

      if (!postIdPost) {
        if (limit >= userPosts.length) {
          return null;
        }

        // 포스트 더 많이 살펴보기
        const morePost = await getLikePostById(userId, postId, {
          offset: offset + limit,
          limit,
        });
        return morePost;
      }

      return postIdPost;
    } catch (e) {
      console.error('error to get like post');
      return null;
    }
  };

  // 좋아요한 포스트
  const [likePosts, setLikePosts] = useState([]);

  likes.forEach((like) => {
    const post = getLikePostById(like.user, like.post);
    if (!post) {
      setLikePosts([...likePosts, post]);
    }
  }); */

  return (
    <>
      <StyledHeadContainer>
        <Button
          backgroundColor="transparent"
          width="fit-content"
          height="1rem"
          type="button"
          hoverBackgroundColor="transparent"
          hoverTextColor={colors.primary}
          textColor={colors.primary}
          borderRadius="0"
          style={{
            margin: '0',
            height: '100%',
            borderTop: `2px solid ${
              isLike ? colors.background : colors.primary
            }`,
          }}
          onClick={() => setIsLike(false)}
        >
          <Icon
            name="widgets"
            isFill={false}
            style={{ padding: '1rem' }}
          />
          <span>포스트</span>
        </Button>
        <Button
          backgroundColor="transparent"
          width="fit-content"
          type="button"
          hoverBackgroundColor="transparent"
          hoverTextColor={colors.primary}
          textColor={colors.primary}
          borderRadius="0"
          style={{
            height: '100%',
            borderTop: `2px solid ${
              isLike ? colors.primary : colors.background
            }`,
          }}
          onClick={() => setIsLike(true)}
        >
          <Icon
            name="favorite"
            isFill={false}
            style={{ padding: '1rem' }}
          />
          좋아요한 포스트
        </Button>
      </StyledHeadContainer>
      <StyledProfilePostContainer>
        <StyledGridPost>
          {isLike ? (
            <>
              {likePosts.map((post: PostType) => (
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
            </>
          ) : (
            <>
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
            </>
          )}
        </StyledGridPost>
      </StyledProfilePostContainer>
    </>
  );
};

export default MyProfilePost;
