/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { useTheme } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ImageCard from '@/Components/Common/ImageCard';
import { PostType } from '@/Types/PostType';
import { PostLikeProps } from './type';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import { getPostByChannel } from '@/Services/Post';
import { GetChannelPostRequestType } from '@/Types/Request';
import { StyledGridPost, StyledProfilePostContainer } from '../style';
import StyledHeadContainer from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import { getChannels } from '@/Services/Channel';
import Skeleton from '@/Components/Base/Skeleton';
import useResize from '@/Hooks/useResize';

const MyProfilePost = ({ posts, likes, isLoading }: PostLikeProps) => {
  const [isLike, setIsLike] = useState(false);
  const { colors } = useTheme();
  const { userId } = useParams() || '';
  const navigate = useNavigate();
  const { isMobileSize } = useResize();

  const getLikePostById = async (
    channelId: string,
    postId: string,
    { offset = 0, limit = 100 }: GetChannelPostRequestType = {},
  ): Promise<PostType | null> => {
    try {
      // 특정 채널의 포스트 목록 가져오기
      const channelPosts = await getPostByChannel(channelId, {
        offset,
        limit,
      });

      if (!channelPosts) {
        return null;
      }

      const postIdPost = channelPosts.find((post) => post._id === postId);

      if (!postIdPost) {
        return null;
      }

      return postIdPost;
    } catch (e) {
      console.error('error to get like post');
      return null;
    }
  };

  const fetchLikePosts = async () => {
    const channelLists = await getChannels();

    if (!channelLists) {
      return [];
    }

    const likePostList = await Promise.all(
      likes.map(async (like) => {
        const channelPosts = await Promise.all(
          channelLists.map(async (channel) => {
            return getLikePostById(channel._id, like.post);
          }),
        );

        return channelPosts.filter((post) => post !== null);
      }),
    );

    // 결과 배열 펼치기
    return likePostList.reverse().flat();
  };

  const setLikePosts = useQuery({
    queryKey: ['likePosts'],
    queryFn: fetchLikePosts,
  });

  const likePosts = setLikePosts.data || [];

  return (
    <>
      <StyledHeadContainer>
        <Button
          backgroundColor="transparent"
          width="fit-content"
          height="1rem"
          type="button"
          hoverBackgroundColor="transparent"
          hoverTextColor={colors.text}
          textColor={colors.text}
          borderRadius="0"
          style={{
            margin: '0',
            height: '100%',
            borderTop: `2px solid ${
              isLike ? colors.background : colors.border
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
          hoverTextColor={colors.text}
          textColor={colors.text}
          borderRadius="0"
          style={{
            height: '100%',
            borderTop: `2px solid ${
              isLike ? colors.border : colors.background
            }`,
          }}
          onClick={() => {
            setIsLike(true);
            setLikePosts.refetch();
          }}
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
              {setLikePosts.isLoading ? (
                <Skeleton.Box
                  width="90%"
                  height="22.5rem"
                />
              ) : (
                likePosts.map(
                  (post: PostType | null) =>
                    post && (
                      <ImageCard
                        key={post._id}
                        src={post.image || logoBlack}
                        comment={post.comments.length}
                        width="90%"
                        height={isMobileSize ? '20rem' : '22.5rem'}
                        heart={post.likes.length}
                        onDetail={() =>
                          navigate(
                            `/profile/${userId}/modal-detail/${post._id}`,
                          )
                        }
                      />
                    ),
                )
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <Skeleton.Box
                  width="90%"
                  height="22.5rem"
                />
              ) : (
                posts.map((post: PostType) => (
                  <ImageCard
                    key={post._id}
                    src={post.image || logoBlack}
                    comment={post.comments.length}
                    width="90%"
                    height={isMobileSize ? '20rem' : '22.5rem'}
                    heart={post.likes.length}
                    onDetail={() =>
                      navigate(`/profile/${userId}/modal-detail/${post._id}`)
                    }
                  />
                ))
              )}
            </>
          )}
        </StyledGridPost>
      </StyledProfilePostContainer>
    </>
  );
};

export default MyProfilePost;
