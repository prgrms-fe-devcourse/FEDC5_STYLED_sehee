import ImageCard from '@/Components/Common/ImageCard';
import { PostType } from '@/Types/PostType';
import { UserType } from '@/Types/UserType';

const ProfilePost = ({ userData }: UserType) => {
  return (
    <div
      style={{
        padding: '3rem 0 15rem 0',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyItems: 'center',
          width: '65%',
        }}
      >
        {userData.posts.map((post: PostType) => (
          <ImageCard
            // eslint-disable-next-line no-underscore-dangle
            key={post._id}
            src={post.image}
            comment={post.comments.length}
            size="90%"
            heart={post.likes.length}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePost;
