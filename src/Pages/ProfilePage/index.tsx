import { useTheme } from 'styled-components';
import Avatar from '@/Components/Base/Avatar';
import Button from '@/Components/Base/Button';
import profile from '@/Assets/Images/STYLED-logo-black.png';
import ImageCard from '@/Components/Common/ImageCard';

const user = {
  image: profile,
  role: '?',
  emailVerified: true,
  banned: false,
  isOnline: true,
  posts: [
    {
      likes: [1, 2, 3, 4, 5, 6],
      comments: [1, 2, 3, 4, 5],
      _id: 'hi',
      image: profile,
    },
    {
      likes: [1, 2, 3, 4, 5, 6],
      comments: [1, 2, 3, 4, 5],
      _id: 'h',
      image: profile,
    },
    {
      likes: [1, 2, 3, 4, 5, 6],
      comments: [1, 2, 3, 4, 5],
      _id: 'i',
      image: profile,
    },
    {
      likes: [1, 2, 3, 4, 5, 6],
      comments: [1, 2, 3, 4, 5],
      _id: 'hie',
      image: profile,
    },
    {
      likes: [1, 2, 3, 4, 5, 6],
      comments: [1, 2, 3, 4, 5],
      _id: 'hwi',
      image: profile,
    },
  ],
  likes: [],
  followers: [],
  following: [],
  _id: '123',
  fullName: 'lee',
};

/**
 * 
 * likes: LikeType[];
  comments: CommentType[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelType;
  author: UserType;
  createdAt: string;
  updatedAt: string;
 */

const ProfilePage = () => {
  const { colors } = useTheme();
  return (
    <div
      style={{
        marginTop: '9.4rem',
        backgroundColor: colors.background,
        height: '100%',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          textAlign: 'center',
          padding: '5rem 13rem 4rem 26%',
        }}
      >
        <Avatar
          src={user.image}
          size={140}
        />
        <div>
          <div
            style={{
              display: 'flex',
              marginTop: '4rem',
            }}
          >
            <div
              style={{
                fontSize: '2.7rem',
                padding: '0 6rem 0 3rem',
              }}
            >
              {user.fullName}
            </div>
            <Button
              type="button"
              height="3rem"
              textSize="1.4rem"
              width="7rem"
              key="login"
              borderRadius="1rem"
              style={{ marginRight: '1rem', marginTop: '.5rem' }}
            >
              팔로우
            </Button>
            <Button
              type="button"
              height="3rem"
              textSize="1.4rem"
              width="10rem"
              key="login"
              borderRadius="1rem"
              style={{ marginRight: '1rem', marginTop: '.5rem' }}
            >
              메시지 보내기
            </Button>
          </div>
          <div style={{ float: 'left', padding: '2rem 3rem 0' }}>
            <span style={{ fontSize: '1.4rem', marginRight: '1rem' }}>
              게시물 {user.posts.length}
            </span>
            <button type="button">
              <span style={{ fontSize: '1.4rem', marginRight: '1rem' }}>
                팔로워 {user.followers.length}
              </span>
            </button>
            <button type="button">
              <span style={{ fontSize: '1.4rem', marginRight: '1rem' }}>
                팔로잉 {user.following.length}
              </span>
            </button>
          </div>
        </div>
      </div>
      <hr style={{ width: '75%' }} />
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
          {user.posts.map((post) => (
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
    </div>
  );
};

export default ProfilePage;
