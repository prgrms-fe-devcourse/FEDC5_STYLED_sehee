import { useParams } from 'react-router-dom';
import PostDetailModal from './PostDetailModal';

const DetailPage = () => {
  const { postId } = useParams();

  console.log(postId);
  return <PostDetailModal postImageUrl="https://picsum.photos​/200" />;
};

export default DetailPage;
