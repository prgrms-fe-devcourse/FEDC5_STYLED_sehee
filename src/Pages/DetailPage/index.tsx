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
      postFollow={postDetailData?.author.followers}
      postContents={postDetailData?.title || ''}
      postEditTime={calculateDate(postDetailData?.createdAt || '')}
      postImageUrl={postDetailData?.image || ''}
      postAuthor={postDetailData?.author.fullName || ''}
      postAuthorId={postAuthor?._id || ''}
      authorAvatar={postAuthor?.image || ''}
    />
  );
};

export default DetailPage;
