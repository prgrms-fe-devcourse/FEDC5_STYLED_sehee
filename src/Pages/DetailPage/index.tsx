import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostDetailModal from './PostDetailModal';
import { getPostDetail } from '@/Services/Post';
import { PostType } from '@/Types/PostType';
import { getUser } from '@/Services/User';
import { UserType } from '@/Types/UserType';

const DetailPage = () => {
  const { postId } = useParams();
  // TODO: 경과시간 계산
  // const nowTime = new Date().toISOString();

  const [postDetail, setPostDetail] = useState<PostType | null>(null);
  const [postAuthorId, setPostAuthorId] = useState('');
  const [authorData, setAuthorData] = useState<UserType | null>(null);

  const updateTime =
    postDetail?.createdAt === postDetail?.updatedAt
      ? postDetail?.createdAt
      : `수정됨 ${postDetail?.updatedAt}`;

  const fetchPostDetail = async (id: string) => {
    const getPostDetailRes = await getPostDetail(id);
    if (getPostDetailRes) {
      // eslint-disable-next-line no-underscore-dangle
      setPostAuthorId(getPostDetailRes.author._id);
      setPostDetail(getPostDetailRes);
    }
  };

  const fetchPostAuthor = async (id: string) => {
    const getUserRes = await getUser(id);
    if (getUserRes) {
      setAuthorData(getUserRes);
    }
  };

  useEffect(() => {
    if (postId) fetchPostDetail(postId);
    if (postAuthorId) fetchPostAuthor(postAuthorId);
  }, [postId, postAuthorId]);

  console.log(postDetail);

  return (
    <PostDetailModal
      postComment={postDetail?.comments}
      postLike={postDetail?.likes}
      postContents={postDetail?.title || ''}
      postEditTime={updateTime || ''}
      postImageUrl={postDetail?.image || ''}
      postAuthor={postDetail?.author.fullName || ''}
      authorAvatar={authorData?.image || ''}
    />
  );
};

export default DetailPage;
