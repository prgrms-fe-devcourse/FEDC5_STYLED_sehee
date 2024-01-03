import Avatar from '@/Components/Base/Avatar';
import Button from '@/Components/Base/Button';
import profile from '@/Assets/Images/dummy.png';

const user = {
  image: profile,
  role: '?',
  emailVerified: true,
  banned: false,
  isOnline: true,
  posts: [],
  likes: [],
  followers: [],
  following: [],
  _id: '123',
  fullName: 'lee',
};

const ProfilePage = () => {
  return (
    <div
      style={{
        marginTop: '9.4rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Avatar
          src={user.image}
          size={150}
        />
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              marginTop: '5rem',
            }}
          >
            <span style={{ fontSize: '2.4rem' }}>{user.fullName}</span>
            <Button>팔로우</Button>
            <Button>메시지 보내기</Button>
          </div>
          <span>게시물 {user.posts.length}</span>
          <span>팔로워 {user.followers.length}</span>
          <span>팔로잉 {user.following.length}</span>
        </div>
      </div>
      <hr style={{ width: '70%' }} />
      <div>
        <div>img</div>
      </div>
    </div>
  );
};

export default ProfilePage;
