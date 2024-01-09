import { useTheme } from 'styled-components';
import profile from '@/Assets/Images/STYLED-logo-black.png';
import ProfileInfo from './ProfileInfo';

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
      <ProfileInfo user={user} />
      <hr style={{ width: '75%' }} />
      <ProfilePage user={user} />
    </div>
  );
};

export default ProfilePage;
