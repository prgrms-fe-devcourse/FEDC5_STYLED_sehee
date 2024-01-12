/* eslint-disable no-underscore-dangle */
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostDetailModal from './PostDetailModal';
import { getPostDetail } from '@/Services/Post';
import { getUser } from '@/Services/User';
import { calculateDate } from '@/Utils/UTCtoKST';
import QUERY_KEYS from '@/Constants/queryKeys';

const DetailPage = () => {
  const { postId } = useParams();

  /**
   * postId로 해당 포스트 정보를 얻는 useQuery 훅
   */
  const { data: postDetailData, isLoading: isPostDetailLoading } = useQuery({
    queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID, postId],
    queryFn: () => getPostDetail(postId || ''),
  });

  /**
   * 수정된 여부에 따라 시간 다르게 표시
   */
  const updateTime =
    postDetailData?.createdAt === postDetailData?.updatedAt
      ? postDetailData && calculateDate(postDetailData.updatedAt)
      : postDetailData && `수정됨 ${calculateDate(postDetailData.updatedAt)}`;

  /**
   * 포스트 author id로 해당 author 정보 얻는 useQuery 훅
   */
  const { data: postAuthor } = useQuery({
    queryKey: [QUERY_KEYS.USER_BY_AUTHOR_ID, postDetailData?.author._id],
    queryFn: () => getUser(postDetailData?.author._id || ''),
    enabled: !isPostDetailLoading,
  });

  return (
    <PostDetailModal
      postComment={postDetailData?.comments}
      postLike={postDetailData?.likes}
      postContents={postDetailData?.title || ''}
      postEditTime={updateTime || ''}
      postImageUrl={postDetailData?.image || ''}
      postAuthor={postDetailData?.author.fullName || ''}
      postAuthorId={postAuthor?._id || ''}
      authorAvatar={postAuthor?.image || ''}
    />
  );
};

export default DetailPage;
